const express = require("express");
const router = express.Router();

//controller
const assignTaskController = require("../controller/assignTask");

//router
// router.post("/assignTask",assignTaskController.assignTask);
// router.get("/getTaskDetails",assignTaskController.getAssignedTaskDtails);

module.exports = router;