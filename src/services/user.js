const Boom = require("@hapi/boom");

//repo
const userRepo = require("../repositories/user");

exports.updatedUser = async(payload) => {
    try{
        const updatableFields = {};
    if(payload.firstName){
        updatableFields.firstName = payload.firstName;
    }
    if(payload.lastName){
        updatableFields.lastName = payload.lastName;
    }
    if(payload.email){
        updatableFields.email = payload.email;
    }
    if(payload.password){
        const passwordHash = await bcrypt.hash(payload.password, Number(bcryptSalt));
        updatableFields.passwordhash = passwordHash;
    }
    if(payload.phone){
        updatableFields.phone = payload.phone;
    }
    if(payload.address){
        updatableFields.address = payload.address;
    }
    if(Object.keys(updatableFields).length > 0){
        await userRepo.updateById(payload.userId, updatableFields);
    }
    return payload;}
    catch(error){
        throw Boom.badRequest("Can't update!!!!");
    }
}