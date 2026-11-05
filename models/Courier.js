const mongoose = require("mongoose");

const courierSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname majburiy"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email majburiy"],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, "Telefon majburiy"],
        trim: true
    },
    vehicle: {
        type: String,
        required: [true, "Transport turi majburiy"],
        trim: true
    }
});

module.exports = mongoose.model("Courier", courierSchema);
