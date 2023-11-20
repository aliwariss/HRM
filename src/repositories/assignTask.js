const model = require("../models/assignTask");

exports.assignTask = async(payload) => {
    return model.create(payload);
}

exports.getAssignedTaskDetails = async() =>{
    return await model.find();
}

