const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courierRoutes = require("./routes/courierRoutes");
const orderRoutes = require("./routes/orderRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(courierRoutes);
app.use(orderRoutes);
app.use(otpRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server ${PORT}-portda`));
};

start();
