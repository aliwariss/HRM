//services
const attendanceTrackingservices = require("../services/attendanceTracking");
const assignTaskservices = require("../services/assignTask");
const payrollServices = require("../services/payroll");

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


exports.hourlyPayroll = async(req , res) => {
    try {
        const payload = {
            employeeId: req.body.employeeId,
            hourlyRate: req.body.hourlyRate,
            overTimeRate: req.body.overTimeRate,
            month: req.body.month,
            year: req.body.year
            }
        const result = await payrollServices.hourlyPayroll(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Unable to calculate payroll!!!"});
    }
}

exports.monthlyPayroll = async (req , res) => {
    try {
        const payload = {
            employeeId: req.body.employeeId,
            monthlySalary: req.body.monthlySalary,
            month: req.body.month,
            year: req.body.year
        }

        const result = await payrollServices.monthlyPayroll(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        res.status(400).json({error: "Unable to generate payroll!!!"});
    }
}