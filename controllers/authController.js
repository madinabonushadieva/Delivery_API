const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { registerSchema, loginSchema } = require("../validators/authValidator");

exports.register = async (req, res) => {
    try {
        const validation = registerSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues
            });
        }

        const { fullname, password } = validation.data;
        const email = validation.data.email.trim().toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Bu email bilan ro'yxatdan o'tilgan"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Ro'yxatdan o'tildi",
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role,
                isVerified: newUser.isVerified
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server xatosi"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const validation = loginSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues
            });
        }

        const { password } = validation.data;
        const email = validation.data.email.trim().toLowerCase();

        const user = await User.findOne({ email });

        const isMatch = user ? await bcrypt.compare(password, user.password) : false;

        if (!isMatch) {
            return res.status(401).json({
                message: "Email yoki parol noto'g'ri"
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Muvaffaqiyatli kirildi",
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server xatosi"
        });
    }
};

exports.getProfile = (req, res) => {
    res.status(200).json(req.user);
};
