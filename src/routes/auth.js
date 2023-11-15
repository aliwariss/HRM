const express = require("express");
const router = express.Router();

//contollers
const authController = require("../controller/auth");

//routes
router.post("/signUp",authController.signup);
router.post("/signIn",authController.signin);
router.post("/signOut",authController.signOut);

module.exports = router;