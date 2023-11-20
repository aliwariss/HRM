const Boom = require("@hapi/boom");
const joi = require("../validations/joi");
const joiSchema = require("../validations/schema/assignTask");
//repo
const assignTaskRepo = require("../repositories/assignTask");

exports.assignTask = async (payload) => {
    try {
        joi.validate(payload,joiSchema.assignTaskSchema);
        const createPayload = {
            employeeId: payload.employeeId,
            task: payload.task,
            taskDescription: payload.taskDescription,
            startDate: payload.startDate,
            endDate: payload.endDate,
            dayStartTime: payload.dayStartTime,
            dayEndTime: payload.dayEndTime
        }
        const taskAssigned = await assignTaskRepo.assignTask(createPayload);
        return taskAssigned;
    } catch (error) {

        throw Boom.badRequest("Can't assign task!!!");
    }
}

exports.getAssignedTaskDetails = async () => {
    try {
        const taskDetails = await assignTaskRepo.getAssignedTaskDetails();
        return taskDetails;
    }
    catch (error) {
        throw Boom.badRequest(error)
    }
}

