const mongoose = require("mongoose");
const checkOutSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    }
});

const checkOut = mongoose.model("checkOut",checkOutSchema);
module.exports = checkOut;