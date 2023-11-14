const express = require("express");
const router = express.Router();

//controller
const payrollController = require("../controller/payroll");

//route
router.post("/hourlyPayroll",payrollController.hourlyPayroll);

module.exports = router;