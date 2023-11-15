const mongoose = require("mongoose");

const signOutSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    signOut: {
        type: Date,
        required: true
    }
},
{timestamps: true});

const signOut = mongoose.model("signOut",signOutSchema);
module.exports = signOut;