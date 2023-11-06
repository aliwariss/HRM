//services
const attendanceTrackingservices = require("../services/attendanceTracking");
const assignTaskservices = require("../services/assignTask");

exports.getAllActiveEmployees = async (req , res) => {
    try {
        const result = await attendanceTrackingservices.getAllActiveEmployees();
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "Can't get the Employees!!!"});
    }
}

exports.attendanceTracking = async (req , res) => {
    try {
        const result = await attendanceTrackingservices.attendanceTracking();
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Can't absent the employee!!!"});
    }
}


exports.assignTask = async (req , res) => {
    try {
        const payload = {
            employeeId: req.body.employeeId,
            task: req.body.task,
            taskDescription: req.body.taskDescription,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            dayStartTime: req.body.dayStartTime,
            dayEndTime: req.body.dayEndTime
        }
        if (!payload.dayStartTime) {
            return res.status(401).json({ error: "dayStartTime is missing in payload!" });
        }
        const result = await assignTaskservices.assignTask(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Unable to assign task!!! "})
    }
}

exports.getAssignedTaskDtails = async(req , res) => {
    try {
        const result = await assignTaskservices.getAssignedTaskDetails();
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Unable to fetch details!!!"})
    }
} 