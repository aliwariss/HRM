const mongoose = require("mongoose");

exports.bootstrap = async() => {
    try {
        mongoose.connect("mongodb://127.0.0.1/HRM")
        console.log("Connected!!!")
    } catch (error) {
        console.log("Error while connecting!!!")
    }
}