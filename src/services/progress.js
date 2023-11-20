const Boom = require("@hapi/boom");
const joi = require("../validations/joi");
const progressJoiSchema = require("../validations/schema/progress");

//repo
const progressRepo = require("../repositories/progress");

exports.assignedTaskProgress = async(Payload) =>{
    try {
        joi.validate(Payload,progressJoiSchema);
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

exports.updateTaskProgress = async(payload) => {
    try {
        joi.validate(payload,progressJoiSchema);
        const updatableFields = {};
        if(payload.taskId){
            updatableFields.taskId = payload.taskId
        }
        if(payload.employeeId){
            updatableFields.employeeId = payload.employeeId
        }
        if(payload.status){
            updatableFields.status = payload.status
        }
        if(payload.comments){
            updatableFields.comments = payload.comments
        }
        if(Object.keys(updatableFields).length>0){
            await progressRepo.updateTaskProgress(payload.progressId,payload);
        }
    } catch (error) {
        throw Boom.badRequest(error);
    }
}