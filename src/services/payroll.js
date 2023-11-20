const Boom = require("@hapi/boom");
const joi = require("../validations/joi");
const hourlyPayrollJoiSchema = require("../validations/schema/hourlyPayroll");
const monthlyPayrollJoiSchema = require("../validations/schema/monthlyPayroll");

//attendanceRepo
const payrollRepo = require("../repositories/payroll");
const attendanceRepo = require("../repositories/attendanceMarking");

exports.hourlyPayroll = async (payload) => {
  try {
    joi.validate(payload,hourlyPayrollJoiSchema);
    const employeeId = payload.employeeId;
    const checkInRecords = await attendanceRepo.getAllEmployeesAttednances(employeeId);
    const checkOutRecords = await attendanceRepo.getAllCheckOuts(employeeId);
    let createPayload;

    if (checkInRecords && checkOutRecords) {
      let totalWorkedHours = 0;
      let totalOvertimeHours = 0;


      checkInRecords.forEach((checkInRecord, index) => {
        const checkInTime = checkInRecord.date;
        let checkOutTime;

        const checkOutRecord = checkOutRecords.find((coRecord) => {
          return coRecord.checkOut > checkInTime;
        });


        if (checkOutRecord) {
          checkOutTime = checkOutRecord.checkOut;
          const hoursWorkedOnDay = (checkOutTime - checkInTime) / (1000 * 60 * 60);

          totalWorkedHours += Math.max(hoursWorkedOnDay, 0);
          totalOvertimeHours += Math.max(hoursWorkedOnDay - 8, 0);

          console.log(`Check-In Record ${index + 1} Date: ${checkInTime}`);
          console.log(`Check-Out Record ${index + 1} Date: ${checkOutTime}`);
          console.log(`Hours Worked on Day ${index + 1}: ${hoursWorkedOnDay}`);
        } else {
          console.warn(`No checkout record found for Check-In Record ${index + 1}`);
        }
      });

      console.log(`Total Worked Hours: ${totalWorkedHours}`);
      console.log(`Total Overtime Hours: ${totalOvertimeHours}`);

      const hourlyRate = payload.hourlyRate;
      const overtimeRate = payload.overTimeRate;
      const totalPay = calculatePay(totalWorkedHours, totalOvertimeHours, hourlyRate, overtimeRate);

      console.log(`Total Pay: ${totalPay}`);
      createPayload = {
        employeeId: payload.employeeId,
        hourlyRate: payload.hourlyRate,
        overTimeRate: payload.overTimeRate,
        totalWorkedHours: totalWorkedHours,
        totalOvertimeHours: totalOvertimeHours,
        totalPay: totalPay,
        month: payload.month,
        year: payload.year
      }

      console.log(payload)
      payload.totalWorkedHours = totalWorkedHours;
      payload.totalOvertimeHours = totalOvertimeHours;
      payload.totalPay = totalPay;

    }

    function calculatePay(totalWorkedHours, totalOvertimeHours, hourlyRate, overtimeRate) {
      const regularPay = totalWorkedHours * hourlyRate;
      const overtimePay = totalOvertimeHours * overtimeRate;
      return regularPay + overtimePay;
    }
    const finalSalary = await payrollRepo.hourlyPayroll(createPayload);
    return finalSalary;


  } catch (error) {
    throw Boom.badRequest(error);
  }
}

exports.monthlyPayroll = async (payload) => {
  try {
    joi.validate(payload,monthlyPayrollJoiSchema);
    const createPayload = {
      employeeId: payload.employeeId,
      monthlySalary: payload.monthlySalary,
      month: payload.month,
      year: payload.year
    }

    const monthlyPayroll = await payrollRepo.monthlyPayroll(createPayload);
    return monthlyPayroll;
  } catch (error) {
    throw Boom.badRequest(error);
  }
}