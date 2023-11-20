const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

exports.attendanceMarkingSchema = joi.object({
    employeeId: joi.objectId().required(),
    date: joi.date().required(),
    status: joi.string().required(),
    attendanceMarked: joi.boolean().default(false) 
})