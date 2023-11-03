const express = require("express");
const router = express.Router();

//controller
const OtpController = require("../controller/otp");


//routes
router.post("/otp",OtpController.otp);
router.post("/verifyOtp",OtpController.verifyOtp);
router.get("/getOtp/:id",OtpController.getOtp);

module.exports = router;