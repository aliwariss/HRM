const joi = require("joi");

exports.hourlyPayrollSchema = joi.object({
    employeeId: joi.objectId().required(),
    totalWorkedHours: joi.number().required(),
    totalOvertimeHours: joi.number().required(),
    totalPay: joi.number().required(),
    month: joi.number().required(),
    year: joi.number().required(),
    hourlyRate: joi.number().required(),
    overTimeRate: joi.number().required()
})