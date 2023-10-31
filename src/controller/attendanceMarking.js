const services = require("../services/attendanceMarking");

exports.attendanceMarking = async (req, res) => {
    try {
        const payload = {
            employeeId: req.body.employeeId,
            date: new Date(),
            status: req.body.status
        }
        const result = await services.attendanceMarking(payload);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log(error)
        res.status(400).json("Encountering some issue with marking attendance!!!");
    }
}

