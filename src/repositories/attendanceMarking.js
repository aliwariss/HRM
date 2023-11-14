const model = require("../models/attendanceMarking");
const checkOutModel = require("../models/checkOut");

exports.attendanceMarking = async (payload) => {
        return await model.create(payload);
}

exports.checkOut = async (payload) => {
        return await checkOutModel.create({employeeId:payload.employeeId, checkOut:payload.checkOut});
}

exports.getAllEmployeesAttednances = async() => {
        return await model.find();
    }

exports.getAllCheckOuts = async () => {
        return await checkOutModel.find();
}
