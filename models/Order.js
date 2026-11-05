const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "Mijoz ismi majburiy"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Manzil majburiy"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Narx majburiy"],
        min: [0, "Narx manfiy bo'lmasin"]
    },
    status: {
        type: String,
        enum: ["pending", "on_the_way", "delivered", "cancelled"],
        default: "pending"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courier"
    }
});

module.exports = mongoose.model("Order", orderSchema);
