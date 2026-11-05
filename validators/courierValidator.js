const { z } = require("zod");

const createCourierSchema = z.object({
    fullname: z.string("Fullname matn bo'lishi kerak")
        .trim()
        .min(2, "Fullname kamida 2 ta harf bo'lsin"),
    email: z.email("Email formati noto'g'ri"),
    phone: z.string("Telefon matn bo'lishi kerak")
        .trim()
        .min(7, "Telefon raqami noto'g'ri"),
    vehicle: z.string("Transport turi matn bo'lishi kerak")
        .trim()
        .min(2, "Transport turi kamida 2 ta harf bo'lsin")
});

const updateCourierSchema = createCourierSchema.partial();

module.exports = { createCourierSchema, updateCourierSchema };
