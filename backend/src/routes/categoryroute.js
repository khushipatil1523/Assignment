const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth_middleware");

const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
} = require("../controllers/category_controller");

router.post("/", authMiddleware, createCategory);

router.get("/", authMiddleware, getAllCategories);

router.put("/:id", authMiddleware, updateCategory);

router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;