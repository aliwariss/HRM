const mongoose = require("mongoose");

exports.bootstrap = async() => {
    try {
        mongoose.connect("mongodb+srv://alimaw:toratomushkilkrlo@cluster0.alljlgm.mongodb.net")
        console.log("Connected!!!")
    } catch (error) {
        console.log("Error while connecting!!!")
    }
}