const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

exports.bootstrap = async() => {
    try {
        // mongoose.set("strictQuery",false);
    await mongoose.connect(process.env.MONGO)
        console.log("Connected!!!")
    } catch (error) {
        console.log("Error while connecting!!!")
    }
}