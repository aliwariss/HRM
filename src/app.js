const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json())

const authRoute = require("./routes/auth");
app.use("/",authRoute);

const userRoute = require("./routes/user");
app.use("/",userRoute);

const otpRoute = require("./routes/otp");
app.use("/",otpRoute);

const attendanceRoute = require("./routes/attendanceMarking");
app.use("/",attendanceRoute);

const adminRoute = require("./routes/admin");
app.use("/",adminRoute);

// const assignTaskRoute = require("./routes/assignTask");
// app.use("/",assignTaskRoute);

module.exports = app;