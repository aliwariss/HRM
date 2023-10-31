const express = require("express");
const router = express.Router();

//middleware
const authentication = require("../middleware/authentication");

//contollers
const authController = require("../controller/auth");

//routes
router.post("/signUp",authController.signup);
router.post("/signIn",authController.signin);
// router.post("/signOut",authentication,authController.signout);

module.exports = router;