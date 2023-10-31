const model = require("../models/attendanceMarking");

exports.attendanceMarking = async (payload) => {
        return await model.create(payload);
}


    