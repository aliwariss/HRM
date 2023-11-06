const express = require("express");
const router = express.Router();

//controller
const attendanceController = require("../controller/attendanceMarking");

//route
router.post("/attendance",attendanceController.attendanceMarking);
router.post("/checkOut",attendanceController.checkOut);

module.exports = router;