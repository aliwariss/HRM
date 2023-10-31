const express = require("express");
const router = express.Router();

//controllers
const userController = require("../controller/user");

//routes
router.put("/updateUser/:id",userController.updateUser);

module.exports = router