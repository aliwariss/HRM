const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

exports.assignTaskSchema = joi.object({
    employeeId: joi.objectId().required(),
    task: joi.string().required(),
    startDate: joi.string().required(),
    endDate: joi.string().required(),
    dayStartTime: joi.string().required(),
    dayEndTime: joi.string().required()
})