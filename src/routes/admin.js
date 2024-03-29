const express = require("express");
const router = express.Router();

//middleware
const { verifyToken } = require("../middleware/authentication");

//controller
const adminController = require("../controller/admin");

//route
router.get("/getAllActiveEmployees",verifyToken,adminController.getAllActiveEmployees);
router.put("/updateAttendance",verifyToken,adminController.attendanceTracking);
router.post("/assignTask",verifyToken,adminController.assignTask);
router.get("/getTaskDetails",verifyToken,adminController.getAssignedTaskDtails);
router.post("/hourlyPayroll",verifyToken,adminController.hourlyPayroll);
router.post("/monthlyPayroll",verifyToken,adminController.monthlyPayroll);

module.exports = router;