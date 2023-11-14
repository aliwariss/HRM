const mongoose = require("mongoose");

const hourlyPayrollSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalWorkedHours: {
        type: Number
    },
    totalOvertimeHours: {
        type: Number
    },
    totalPay: {
        type: Number
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    overTimeRate: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

const hourlyPayroll = mongoose.model("hourlyPayroll",hourlyPayrollSchema);
module.exports = hourlyPayroll;