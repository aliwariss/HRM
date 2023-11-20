const joi = require("joi");
joi.objectId = require("joi-objectid")(joi)

exports.userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    phone: joi.number().required(),
    designation: joi.string().required(),
    roles: joi.string().valid("Admin","User").default("User")
})