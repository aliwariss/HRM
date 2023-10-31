const express = require("express");
const router = express.Router();

//controller
const attendanceController = require("../controller/attendanceMarking");

//route
router.post("/attendance/:id",attendanceController.attendanceMarking);

module.exports = router;