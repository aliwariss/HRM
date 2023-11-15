const model = require("../models/payroll");
const services = require("../services/payroll");

exports.hourlyPayroll = async (payload) => {
    try {
        const totalPay = payload.totalPay || 0;
        const totalWorkedHours = payload.totalWorkedHours || 0;
        const totalOvertimeHours = payload.totalOvertimeHours || 0;
        const payrollData = {
            employeeId: payload.employeeId,
            month: payload.month,
            year: payload.year,
            hourlyRate: payload.hourlyRate,
            overTimeRate: payload.overTimeRate,
            totalPay: totalPay,
            totalWorkedHours: totalWorkedHours,
            totalOvertimeHours: totalOvertimeHours,
        };
        console.log("payroll: ",payrollData)
        const result = await model.create(payrollData);
        console.log("After model.create", result);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error calculating and saving payroll");
    }
};
