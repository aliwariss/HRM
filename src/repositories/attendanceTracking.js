const model = require("../models/attendanceMarking");
const employeesmodel = require("../models/user");


exports.markAbsent = async (employeeId, date) => {
    const absent = new model({
        employeeId,
        date,
        status: "absent"
    })
    return await absent.save();
}

exports.getAllActiveEmployees = async() => {
    return await employeesmodel.find();
}

exports.getAllAttendances = async(employeeId) => {
    return await model.find({employeeId});
}