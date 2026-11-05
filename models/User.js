const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname majburiy"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email majburiy"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Parol majburiy"]
    },
    role: {
        type: String,
        enum: ["user", "manager", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
});

module.exports = mongoose.model("User", userSchema);
