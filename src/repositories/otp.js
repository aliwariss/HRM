const sid = "ACc9e26b65426e5f631497ff94b5e2b9a8"
const auth = "14e4246b3f8dbc0aed99151dc28c7f10"
const twilio = require("twilio")(sid,auth);
const {generateNumericOTP} = require("../services/otp");
const model = require("../models/otp");

exports.otp = async(to) => {
    try {
        const otp = generateNumericOTP(6);
        const msg = await twilio.messages.create({
            body: otp,
            from: "+16306264645",
            to: to
        })
        await model.create({phone: to, otp: otp})
        return otp;
    } catch (err) {
        throw err;
    }
}

exports.getOtp = async (id)=> {
    return model.findOne({_id: id});
}

exports.verifyOtp = async(payload) => {
    return model.updateOne(payload);
}