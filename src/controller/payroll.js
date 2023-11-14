const services = require("../services/payroll");

exports.hourlyPayroll = async(req , res) => {
    try {
        const payload = {
            employeeId: req.body.employeeId,
            hourlyRate: req.body.hourlyRate,
            overTimeRate: req.body.overTimeRate,
            month: req.body.month,
            year: req.body.year
            }
        const result = await services.hourlyPayroll(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Unable to calculate payroll!!!"});
    }
}