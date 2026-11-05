const express = require("express");
const router = express.Router();
const courierController = require("../controllers/courierController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router.get("/couriers",
    authMiddleware,
    courierController.getCouriers
);

router.get("/couriers/:id",
    authMiddleware,
    courierController.getCourier
);

router.post("/couriers",
    authMiddleware,
    authorizeRoles("admin"),
    courierController.createCourier
);

router.put("/couriers/:id",
    authMiddleware,
    authorizeRoles("admin"),
    courierController.updateCourier
);

router.delete("/couriers/:id",
    authMiddleware,
    authorizeRoles("admin"),
    courierController.deleteCourier
);

module.exports = router;
