const mongoose = require("mongoose");

const monthlyPayrollSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    monthlySalary: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
},
{timestamps: true});

const monthlyPayroll = mongoose.model("monthlyPayroll",monthlyPayrollSchema);
module.exports = monthlyPayroll;