const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ["Admin","User"],
        default: "User"
    }
},{
    timestamps: true
});

const User = mongoose.model("User",userSchema);
module.exports = User;