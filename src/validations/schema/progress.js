const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

exports.progressSchema = joi.object({
    taskId: joi.objectId().required(),
    employeeId: joi.objectId().required(),
    status: joi.string().valid('Pending', 'In Progress', 'Completed').default('Pending'),
    comments: joi.string().required()
})