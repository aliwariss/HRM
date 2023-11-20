const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

const joi = require("../validations/joi");
const joiSchema = require("../validations/schema/user");
const signOutJoiSchema = require("../validations/schema/signOutSchema");

//repo
const authRepo = require("../repositories/user");

exports.signup = async (payload) => {
    try {
        joi.validate(payload,joiSchema.userSchema);
        const passwordHash = await bcrypt.hash(payload.password, 6);
        const createPayload = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: passwordHash,
            phone: payload.phone,
            designation: payload.designation,
            roles: payload.roles || "User"
        }
        const addUser = await authRepo.signUp(createPayload)
        const tokenBody = {
            id: addUser._id,
            roles: addUser.roles
        }
        const secretKey = "topSecret";
        return {
            token: jwt.sign(tokenBody, secretKey, {expiresIn:"99y"}),
            addUser
        };
    } catch (error) {
        throw Boom.badRequest("Error while adding user!!!")
    }
}

exports.signin = async (payload) => {
    try {
        joi.validate(payload,joiSchema.userSchema);
        if (payload.email && payload.password) {
            const findUser = await authRepo.findOne(payload);
            if (findUser) {
                const passwordMatch = await bcrypt.compare(payload.password, findUser.password)
                const tokenBody = {
                    id: findUser._id,
                    roles: findUser.roles
                }
                const secretKey = "topSecret";
                if (passwordMatch) {
                    return {
                        token: jwt.sign(tokenBody,secretKey,{ expiresIn: "99y"}),
                        findUser};
                }
            } else {
                return ({ result: "No User Found" })
            }
        }
        
    } catch (err) {
        throw Boom.badRequest("Account doesn't exsit!!!")
    }
}

exports.signOut = async(paylaod) => {
    try {
        joi.validate(paylaod,signOutJoiSchema.signOutSchema);
        const createPayload = {
            employeeId: paylaod.employeeId,
            signOut: paylaod.signOut
        }
        const signedOut = await authRepo.signOut(createPayload);
        return signedOut;
    } catch (error) {
        throw Boom.badRequest(error);
    }
}
