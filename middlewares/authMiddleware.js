const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token topilmadi, avval tizimga kiring" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Token topilmadi, avval tizimga kiring" });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Token noto'g'ri yoki muddati tugagan" });
    }

    if (!mongoose.isValidObjectId(decoded.id)) {
        return res.status(401).json({ message: "Token noto'g'ri" });
    }

    try {
        const user = await User.findById(decoded.id).select("-password -otp -otpExpires");

        if (!user) {
            return res.status(401).json({ message: "Token noto'g'ri" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server xatosi" });
    }
};
