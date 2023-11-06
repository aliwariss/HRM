const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    attendanceMarked: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const attendanceMarking = mongoose.model("attendanceMarking",attendanceSchema);
module.exports = attendanceMarking; 