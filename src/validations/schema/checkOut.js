const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

exports.checkOutSchema = joi.object({
    employeeId: joi.objectId().required(),
    checkOut: joi.date().required()
})