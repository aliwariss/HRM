const otpRepo = require("../repositories/otp");
const services = require("../services/otp");

exports.otp = async(req , res) => {
    try {
        const {to} = req.body;
        const otp = await otpRepo.otp(to);
        console.log("message sent")
        return res.status(200).json({otp});
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}

exports.verifyOtp = async(req , res) => {
    try {
        const payload = {
            otp: req.body.otp
        }
        const result = await services.verifyOtp(payload);
        return res.status(200).json({data : "otp verified",result}); 
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Can't verify Otp!!!"});
    }
}