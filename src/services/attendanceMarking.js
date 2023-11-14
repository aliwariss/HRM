const Boom = require("@hapi/boom");

const attendanceRepo = require("../repositories/attendanceMarking");
const assignTask  = require("../repositories/assignTask");

exports.attendanceMarking = async (payload) => {
    try {
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
        console.log("payload.date:", payload.date);
console.log("thresholdTime:", thresholdTime);
console.log("timeDifference:", timeDifference);
        const attendanceRecord = await attendanceRepo.attendanceMarking(payload);
        return attendanceRecord;
    } catch (error) {
        throw Boom.badRequest({error:"Can't mark attendance!!!"});
    }
}

exports.checkOut = async (payload) => {
    try{
        const createPayload = {
        employeeId: payload.employeeId,
        checkOut: payload.checkOut
    }
    const employeeCheckOut = await attendanceRepo.checkOut(createPayload);
    return employeeCheckOut;
}
catch(error){
    throw Boom.badRequest({error:"Can't checkOut!!!"});
}
}

exports.getAllEmployeesAttendances = async () =>{
    try {
        const attendance = await attendanceRepo.getAllEmployeesAttednances();
        return attendance;
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

exports.getAllCheckOuts = async ()=> {
    try {
        const getCheckOuts = await attendanceRepo.getAllCheckOuts();
        return getCheckOuts;
    } catch (error) {
        throw Boom.badRequest(error);
    }
}