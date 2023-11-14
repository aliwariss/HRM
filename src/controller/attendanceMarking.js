const services = require("../services/attendanceMarking");
const attendanceRepo = require("../repositories/attendanceTracking");
exports.attendanceMarking = async (req, res) => {
    try {
        const payload = {
            employeeId: req.body.employeeId,
            date: new Date(),
            status: req.body.status
        }
        const getEmployees = await attendanceRepo.getAllActiveEmployees();
        const user = getEmployees.find(employee => employee._id.toString() === payload.employeeId);
        if(!user){
            return res.status(400).json({error:"Invalid user!!!"});
        }else if(user.roles == "Admin"){
            return res.status(400).json({error:"Admins are not allowed to mark attendance!!!"});
        }
        const result = await services.attendanceMarking(payload);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log(error)
        res.status(400).json("Encountering some issue with marking attendance!!!");
    }
}

exports.checkOut = async(req , res) =>{
    try {
        const payload = {
            employeeId: req.body.employeeId,
            checkOut: new Date()
        }
        const result = await services.checkOut(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Unable to checkOut!!!"});
    }
}

exports.getAllEmployeesAttendances = async (req , res) => {
    try {
        const result = await services.getAllEmployeesAttendances();
        return res.status(200).json({data : result});
    } catch (error) {
        res.status(400).json({error:"Unable to get attendances!!!"});
    }
}

exports.getAllCheckOuts = async (req , res) => {
    try {
        const result = await services.getAllCheckOuts();
        return res.status(200).json({data : result});
    } catch (error) {
        res.status(400).json({error:"Unable to get checkOuts!!!"});
    }
}
