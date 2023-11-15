const joi = require("joi");

exports.signOutSchema = joi.object({
    employeeId: joi.objectId().required(),
    signOut: joi.date().required()
})