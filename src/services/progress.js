const Boom = require("@hapi/boom");
const progressRepo = require("../repositories/progress");

exports.assignedTaskProgress = async(Payload) =>{
    try {
        const createPayload = {
            taskId: Payload.taskId,
            employeeId: Payload.employeeId,
            status: Payload.status,
            comments: Payload.comments
        }
        const taskProgress = await progressRepo.assignedTaskProgress(createPayload);
        return taskProgress;
    } catch (error) {
        throw Boom.badRequest(error);
    }
}