// const otp = require("../models/otp");
const otpRepo = require("../repositories/otp");

exports.generateNumericOTP =  (length) => {
    {
       const characters = '0123456789';
       let OTP = '';
       for (let i = 0; i < length; i++) {
           const index = Math.floor(Math.random() * characters.length);
           OTP += characters[index];
       }
       return OTP;
   }
}

exports.verifyOtp = async(payload) => {
    try {
        // console.log(payload)
        const otp = payload.otp
        if(!/^\d{6}$/.test(otp)){
            throw new Error("Invalid Otp!!!")
        }else{
            const verifyOtp = await otpRepo.verifyOtp(payload);
            return verifyOtp;
        }
    } catch (error) {
        throw error;
    }
}