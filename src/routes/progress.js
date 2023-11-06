const express = require("express");
const router = express.Router();

//controllers
const progressController = require("../controller/progress");

//routes
router.post("/progress",progressController.assignedTaskProgress);

module.exports = router;