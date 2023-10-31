const services = require("../services/attendanceTracking");

exports.getAllActiveEmployees = async (req , res) => {
    try {
        const result = await services.getAllActiveEmployees();
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "Can't get the Employees!!!"});
    }
}

exports.attendanceTracking = async (req , res) => {
    try {
        const result = await services.attendanceTracking();
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Can't absent the employee!!!"});
    }
}