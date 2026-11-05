const mongoose = require("mongoose");
const Courier = require("../models/Courier");
const { createCourierSchema, updateCourierSchema } = require("../validators/courierValidator");

exports.getCouriers = async (req, res) => {
    try {
        const couriers = await Courier.find();
        res.status(200).json(couriers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.getCourier = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Noto'g'ri ID" });
        }

        const courier = await Courier.findById(req.params.id);

        if (!courier) {
            return res.status(404).json({ message: "Kuryer topilmadi" });
        }

        res.status(200).json(courier);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.createCourier = async (req, res) => {
    try {
        const validation = createCourierSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues
            });
        }

        const courier = await Courier.create(validation.data);
        res.status(201).json(courier);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.updateCourier = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Noto'g'ri ID" });
        }

        const validation = updateCourierSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues
            });
        }

        const courier = await Courier.findByIdAndUpdate(req.params.id, validation.data, {
            new: true,
            runValidators: true
        });

        if (!courier) {
            return res.status(404).json({ message: "Kuryer topilmadi" });
        }

        res.status(200).json(courier);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

exports.deleteCourier = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Noto'g'ri ID" });
        }

        const courier = await Courier.findByIdAndDelete(req.params.id);

        if (!courier) {
            return res.status(404).json({ message: "Kuryer topilmadi" });
        }

        res.status(200).json({ message: "Kuryer o'chirildi" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};
