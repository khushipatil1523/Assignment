const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth_middleware");

const quotationController = require("../controllers/quotation_controller");

router.post("/", authMiddleware, quotationController.createQuotation);

router.get("/", authMiddleware, quotationController.getAllQuotations);

router.get("/:id", authMiddleware, quotationController.getQuotationById);

module.exports = router;