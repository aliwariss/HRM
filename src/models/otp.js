const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    }
})

const otp = mongoose.model("otp",otpSchema);
module.exports = otp;