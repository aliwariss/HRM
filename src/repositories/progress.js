const model = require("../models/progress");

exports.assignedTaskProgress = async(payload) =>{
    return await model.create(payload);
}