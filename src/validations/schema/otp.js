const joi = require("joi");

exports.otpSchema = joi.object({
    phone: joi.number().required(),
    otp: joi.number().required()
})