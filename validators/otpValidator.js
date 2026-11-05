const { z } = require("zod");

const sendOtpSchema = z.object({
    email: z.email("Email formati noto'g'ri")
});

const verifyOtpSchema = z.object({
    email: z.email("Email formati noto'g'ri"),
    otp: z.coerce.string()
        .trim()
        .regex(/^\d{6}$/, "OTP 6 xonali son bo'lishi kerak")
});

module.exports = { sendOtpSchema, verifyOtpSchema };
