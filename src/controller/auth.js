const services = require("../services/auth");
const secretKey = "topSecret";
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
    try {
        const password = req.body.password;
        if (!(
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[!@#$%^&*]/.test(password) &&
            password.length >= 8 &&
            password.length <= 20
        )) {
            return res.status(401).json({
                error: "Invalid password format. It must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be 8 to 20 characters long."
            })
        };
        const payload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: password,
            phone: req.body.phone,
            designation: req.body.designation,
            roles: req.body.roles
        }

        const result = await services.signup(payload);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Cannot signUp the new user!!!" });
    }
}

exports.signin = async (req, res) => {
    try {
        
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const result = await services.signin(payload);
            return res.status(200).json({ data: result });
        
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: "Api issue!!!" });
    }
}

