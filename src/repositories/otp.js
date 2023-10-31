const sid = "ACdd0fcf3fa13c5dfd84da54229bda6848"
const auth = "8559a87d394e65aa6f67de902d9ad434"
const twilio = require("twilio")(sid,auth);
const {generateNumericOTP} = require("../services/otp");
const model = require("../models/otp");

exports.otp = async(to) => {
    try {
        const otp = generateNumericOTP(6);
        const msg = await twilio.messages.create({
            body: otp,
            from: "(304) 249-8357",
            to: to
        })
        await model.create({phone: to, otp: otp})
        return otp;
    } catch (err) {
        throw err;
    }
}

exports.verifyOtp = async(payload) => {
    return model.updateOne(payload);
}