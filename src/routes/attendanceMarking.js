const express = require("express");
const router = express.Router();

//controller
const attendanceController = require("../controller/attendanceMarking");

//route
router.post("/attendance",attendanceController.attendanceMarking);
router.post("/checkOut",attendanceController.checkOut);
router.get("/getAttendances",attendanceController.getAllEmployeesAttendances);
router.get("/getAllCheckOuts",attendanceController.getAllCheckOuts);

module.exports = router;