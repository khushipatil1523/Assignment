const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth_middleware");

const {
    createConfiguration,
    getAllConfigurations,
    getConfigurationById,
    updateConfiguration,
    deleteConfiguration,
} = require("../controllers/configuration_controller");

router.post("/", authMiddleware, createConfiguration);

router.get("/", authMiddleware, getAllConfigurations);

router.get("/:id", authMiddleware, getConfigurationById);

router.put("/:id", authMiddleware, updateConfiguration);

router.delete("/:id", authMiddleware, deleteConfiguration);

module.exports = router;