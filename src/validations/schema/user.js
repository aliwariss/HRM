const joi = require("joi");

exports.userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().unique(true),
    password: joi.string().required(),
    phone: joi.number().required().unique(true),
    designation: joi.string().required(),
    roles: joi.string().valid("Admin","User").default("User")
})