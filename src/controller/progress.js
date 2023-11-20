const services = require("../services/progress");

exports.assignedTaskProgress = async(req , res) =>{
    try {
        const payload = {
            taskId: req.body.taskId,
            employeeId: req.body.employeeId,
            status: req.body.status,
            comments: req.body.comments
        }
        const result = await services.assignedTaskProgress(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Unable to post the progress report!!!"});
    }
}

exports.updateTask = async (req , res) => {
    try {
        const progressId = req.params.id;
        const payload = {
            progressId: progressId,
            taskId: req.body.taskId,
            employeeId: req.body.employeeId,
            status: req.body.status,
            comments: req.body.comments
        }
        const result = await services.updateTaskProgress(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        res.status(400).json({error: "Unable to update the task!!!"});
    }
}