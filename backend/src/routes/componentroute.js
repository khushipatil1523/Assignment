const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth_middleware");
const componentController = require("../controllers/component_controller");


router.post("/", authMiddleware, componentController.createComponent);


router.get("/", authMiddleware, componentController.getAllComponents);


router.get("/:id", authMiddleware, componentController.getComponentById);


router.put("/:id", authMiddleware, componentController.updateComponent);


router.delete("/:id", authMiddleware, componentController.deleteComponent);

module.exports = router;