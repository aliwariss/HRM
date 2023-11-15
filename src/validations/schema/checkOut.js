const joi = require("joi");

exports.checkOutSchema = joi.object({
    employeeId: joi.objectId().required(),
    checkOut: joi.date().required()
})