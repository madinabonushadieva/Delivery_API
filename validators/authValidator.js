const { z } = require("zod");

const registerSchema = z.object({
    fullname: z.string("Fullname matn bo'lishi kerak")
        .trim()
        .min(1, "Fullname majburiy"),
    email: z.email("Email formati noto'g'ri"),
    password: z.string("Parol matn bo'lishi kerak")
        .min(6, "Parol kamida 6 ta belgi bo'lsin")
});

const loginSchema = z.object({
    email: z.email("Email formati noto'g'ri"),
    password: z.string("Parol matn bo'lishi kerak")
        .min(1, "Parol majburiy")
});

module.exports = { registerSchema, loginSchema };
