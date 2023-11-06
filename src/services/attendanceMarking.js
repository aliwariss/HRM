const Boom = require("@hapi/boom");

const attendanceRepo = require("../repositories/attendanceMarking");
const assignTask  = require("../repositories/assignTask");

exports.attendanceMarking = async (payload) => {
    try {
        const utcTime = payload.date;
        const timezoneOffset = utcTime.getTimezoneOffset();
        const localTime = new Date(utcTime.getTime() - (timezoneOffset * 60 * 1000));
        payload.date = localTime;
        const task = await assignTask.getAssignedTaskDetails(payload.employeeId);
        // console.log("Task:", task);
        const employeeTask = task.find(employee => employee.employeeId.toString() === payload.employeeId);
        // console.log("Found employeeTask:", employeeTask);
        if(employeeTask && employeeTask.dayStartTime) {
            if (!payload.dayStartTime) {
                // console.log("Employee Task dayStartTime:", employeeTask.dayStartTime);

                payload.dayStartTime = employeeTask.dayStartTime;
            }
        } else {
            return Promise.reject("No task assigned to the employee or dayStartTime not defined in task!!!");
        }
        const dateParts = payload.date.toISOString().split('T')[0].split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);

        const timeParts = employeeTask.dayStartTime.split(/:| /);
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
        throw Boom.badRequest({error:"Can't mark attendance!!!"});
    }
}

exports.checkOut = async (payload) => {
    try{
        const utcTime = payload.checkOut;
        const timezoneOffset = utcTime.getTimezoneOffset();
        const localTime = new Date(utcTime.getTime() - (timezoneOffset * 60 * 1000));
        payload.checkOut = localTime;
        const createPayload = {
        employeeId: payload.employeeId,
        checkOut: localTime
    }
    const employeeCheckOut = await attendanceRepo.checkOut(createPayload);
    return employeeCheckOut;
}
catch(error){
    throw Boom.badRequest({error:"Can't checkOut!!!"});
}
}



