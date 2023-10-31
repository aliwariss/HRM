const express = require("express");
const router = express.Router();

//controller
const OtpController = require("../controller/otp");


//routes
router.post("/otp",OtpController.otp);
router.put("/verifyOtp",OtpController.verifyOtp);

module.exports = router;