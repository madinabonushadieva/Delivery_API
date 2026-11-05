const mongoose = require("mongoose");
const Order = require("../models/Order");
const Courier = require("../models/Courier");
const { createOrderSchema, updateOrderSchema } = require("../validators/orderValidator");

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("courier", "fullname phone");
        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.getStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json(stats);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.getOrder = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Noto'g'ri ID" });
        }

        const order = await Order.findById(req.params.id).populate("courier", "fullname phone");

        if (!order) {
            return res.status(404).json({ message: "Buyurtma topilmadi" });
        }

        res.status(200).json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const validation = createOrderSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues
            });
        }

        if (validation.data.courier) {
            const courier = await Courier.findById(validation.data.courier);

            if (!courier) {
                return res.status(404).json({ message: "Kuryer topilmadi" });
            }
        }

        const order = await Order.create(validation.data);
        res.status(201).json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Noto'g'ri ID" });
        }

        const validation = updateOrderSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues
            });
        }

        if (validation.data.courier) {
            const courier = await Courier.findById(validation.data.courier);

            if (!courier) {
                return res.status(404).json({ message: "Kuryer topilmadi" });
            }
        }

        const order = await Order.findByIdAndUpdate(req.params.id, validation.data, {
            new: true,
            runValidators: true
        });

        if (!order) {
            return res.status(404).json({ message: "Buyurtma topilmadi" });
        }

        res.status(200).json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Noto'g'ri ID" });
        }

        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Buyurtma topilmadi" });
        }

        res.status(200).json({ message: "Buyurtma o'chirildi" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};
