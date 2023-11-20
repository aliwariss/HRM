const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

exports.signOutSchema = joi.object({
    employeeId: joi.objectId().required(),
    signOut: joi.date().required()
})