const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

exports.monthlyPayrollSchema = joi.object({
    employeeId: joi.objectId().required(),
    monthlySalary: joi.number().required(),
    month: joi.number().required(),
    year: joi.number().required()
})