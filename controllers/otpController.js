const transporter = require("../config/mail");
const User = require("../models/User");
const { sendOtpSchema, verifyOtpSchema } = require("../validators/otpValidator");

exports.sendOTP = async (req, res) => {
    try {
        const validation = sendOtpSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues
            });
        }

        const email = validation.data.email.trim().toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Foydalanuvchi topilmadi"
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Tasdiqlash kodi (OTP)",
            text: `Sizning tasdiqlash kodingiz: ${otp}. Kod 5 daqiqa amal qiladi.`
        });

        res.status(200).json({
            message: "OTP emailga yuborildi"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "OTP yuborib bo'lmadi, keyinroq urinib ko'ring"
        });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const validation = verifyOtpSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues
            });
        }

        const email = validation.data.email.trim().toLowerCase();
        const otp = validation.data.otp;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Foydalanuvchi topilmadi"
            });
        }

        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({
                message: "OTP noto'g'ri"
            });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({
                message: "OTP muddati tugagan, yangi OTP so'rang"
            });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({
            message: "Email tasdiqlandi"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server xatosi"
        });
    }
};
