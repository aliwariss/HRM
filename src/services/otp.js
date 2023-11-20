const Boom = require("@hapi/boom");

//Repo
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

exports.getOtp = async (id) =>{
        try {
            const otp = await otpRepo.getOtp(id);
            return otp;
        } catch (error) {
            throw Boom.badRequest("Can't get the otp!!!");
        }
}

exports.verifyOtp = async(payload) => {
    try {
        // console.log(payload)
        const otp = payload.otp;
        const databaseOtp = await otpRepo.getOtp();
        if(!/^\d{6}$/.test(otp)){
            throw new Error("Invalid Otp!!!")
        }
        else if(otp == databaseOtp){
            const verifyOtp = await otpRepo.verifyOtp(payload);
            return verifyOtp;
    }
        } catch (error) {
        throw Boom.badRequest("Can't verify the otp!!!");
    }
}