const express = require("express");
const router = express.Router();

//middleware
const { verifyToken } = require("../middleware/authentication");

//controller
const attendanceTrackingController = require("../controller/admin");
const assignTaskController = require("../controller/assignTask");

//route
router.get("/getAllActiveEmployees",verifyToken,attendanceTrackingController.getAllActiveEmployees);
router.put("/updateAttendance",verifyToken,attendanceTrackingController.attendanceTracking);
router.post("/assignTask",verifyToken,assignTaskController.assignTask);
router.get("/getTaskDetails",verifyToken,assignTaskController.getAssignedTaskDtails);

module.exports = router;