const services = require("../services/assignTask");

exports.assignTask = async (req , res) => {
    try {
        const payload = {
            employeeId: req.body.employeeId,
            task: req.body.task,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            dayStartTime: req.body.dayStartTime,
            dayEndTime: req.body.dayEndTime
        }
        if (!payload.dayStartTime) {
            return res.status(401).json({ error: "dayStartTime is missing in payload!" });
        }
        const result = await services.assignTask(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Unable to assign task!!! "})
    }
}

exports.getAssignedTaskDtails = async(req , res) => {
    try {
        const result = await services.getAssignedTaskDetails();
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Unable to fetch details!!!"})
    }
} 