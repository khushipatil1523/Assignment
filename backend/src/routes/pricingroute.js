const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth_middleware");

const pricingController = require("../controllers/pricing_controller");

router.get("/:id", authMiddleware, pricingController.calculatePrice);

module.exports = router;