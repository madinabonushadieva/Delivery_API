const { z } = require("zod");

const createOrderSchema = z.object({
    customerName: z.string("Mijoz ismi matn bo'lishi kerak")
        .trim()
        .min(2, "Mijoz ismi kamida 2 ta harf bo'lsin"),
    address: z.string("Manzil matn bo'lishi kerak")
        .trim()
        .min(3, "Manzil kamida 3 ta belgi bo'lsin"),
    price: z.number("Narx son bo'lishi kerak")
        .gt(0, "Narx 0 dan katta bo'lsin"),
    status: z.enum(
        ["pending", "on_the_way", "delivered", "cancelled"],
        "Status faqat pending, on_the_way, delivered yoki cancelled bo'lishi mumkin"
    ).optional(),
    isPaid: z.boolean("isPaid true yoki false bo'lsin").optional(),
    courier: z.string("Courier ID matn bo'lishi kerak")
        .regex(/^[0-9a-fA-F]{24}$/, "Courier ID noto'g'ri")
        .optional()
});

const updateOrderSchema = createOrderSchema.partial();

module.exports = { createOrderSchema, updateOrderSchema };
