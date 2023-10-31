const Boom = require("@hapi/boom");

//repository
const attendanceTrackingRepo = require("../repositories/attendanceTracking");

exports.getAllActiveEmployees = async (id) => {
    try {
        const activeEmployees = await attendanceTrackingRepo.getAllActiveEmployees(id);
        return activeEmployees;
    } catch (error) {
        throw Boom.badRequest(error)

    }
}

exports.attendanceTracking = async () => {
    try {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const workingDays = [1, 2, 3, 4, 5];

        if (workingDays.includes(dayOfWeek)) {
            const employees = await attendanceTrackingRepo.getAllActiveEmployees();
            for (const employee of employees) {
                const employeeId = employee._id;
                const attendances = await attendanceTrackingRepo.getAllAttendances(employeeId)
                if (attendances.length === 0) {
                    await attendanceTrackingRepo.markAbsent(employeeId, today);
                    console.log(`Marking absent for Employee ID ${employee._id}`);
                }
            }
        }

    } catch (error) {
        throw Boom.badRequest(error);
    }
}
