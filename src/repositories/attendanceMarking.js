const model = require("../models/attendanceMarking");
const checkOutModel = require("../models/checkOut");

exports.attendanceMarking = async (payload) => {
        return await model.create(payload);
}

exports.checkOut = async (payload) => {
        return await checkOutModel.create(payload);
}

    