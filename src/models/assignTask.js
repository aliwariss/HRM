const mongoose = require("mongoose");

const assignTask = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    task: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    dayStartTime: {
        type: String,
        required: true
    },
    dayEndTime: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

const task = mongoose.model("task",assignTask);
module.exports = task;