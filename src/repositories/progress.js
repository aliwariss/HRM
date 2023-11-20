const model = require("../models/progress");

exports.assignedTaskProgress = async(payload) =>{
    return await model.create(payload);
}

exports.updateTaskProgress = async(id, payload) => {
    return await model.updateOne({_id: id},payload);
}