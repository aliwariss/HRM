const Boom = require("@hapi/boom");

//repo
const attendanceRepo = require("../repositories/attendanceMarking");
const assignTask  = require("../repositories/assignTask");

exports.attendanceMarking = async (payload) => {
    try {
        const task = await assignTask.getAssignedTaskDetails(payload.employeeId);
        // console.log("Task:", task);
        if(task){
            payload.dayStartTime = task[0].dayStartTime;
        }
        
        if (!task || !task[0].dayStartTime) {
            return Promise.reject("No task assigned to the employee or dayStartTime not defined in task!!!");
        }
        
        const dateParts = payload.date.toISOString().split('T')[0].split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);

        const timeParts = task[0].dayStartTime.split(/:| /);
        let hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);

        if (timeParts[2] === 'PM' && hours !== 12) {
            hours += 12;
        }

        const thresholdTime = new Date(year, month, day, hours, minutes);
       
        const timeDifference = payload.date - thresholdTime;

        if (timeDifference >= 0 && timeDifference <= 60000) {
            payload.status = "Present (On Time)";
        } else if (timeDifference > 60000) {
            payload.status = "Present(Late)";
        } 
        
        payload.attendanceMarked = true;
        // console.log("Payload:", payload);
        // console.log("Threshold Time:", thresholdTime);
        
        const attendanceRecord = await attendanceRepo.attendanceMarking(payload);
        return attendanceRecord;
    } catch (error) {
        throw error;
    }
}



