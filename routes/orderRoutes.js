const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router.get("/orders",
    authMiddleware,
    orderController.getOrders
);

router.get("/orders/stats",
    authMiddleware,
    authorizeRoles("admin", "manager"),
    orderController.getStats
);

router.get("/orders/:id",
    authMiddleware,
    orderController.getOrder
);

router.post("/orders",
    authMiddleware,
    authorizeRoles("admin", "manager"),
    orderController.createOrder
);

router.put("/orders/:id",
    authMiddleware,
    authorizeRoles("admin", "manager"),
    orderController.updateOrder
);

router.delete("/orders/:id",
    authMiddleware,
    authorizeRoles("admin"),
    orderController.deleteOrder
);

module.exports = router;
