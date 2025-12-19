"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const controller = new task_controller_1.TaskController();
/**
 * TASK ROUTES
 */
// Create task
router.post("/", auth_middleware_1.authMiddleware, (req, res) => controller.create(req, res));
// List tasks with filters
router.get("/", auth_middleware_1.authMiddleware, (req, res) => controller.list(req, res));
// Dashboard
router.get("/dashboard", auth_middleware_1.authMiddleware, (req, res) => controller.dashboard(req, res));
// Update task
router.put("/:id", auth_middleware_1.authMiddleware, (req, res) => controller.update(req, res));
// Delete task
router.delete("/:id", auth_middleware_1.authMiddleware, (req, res) => controller.remove(req, res));
exports.default = router;
//# sourceMappingURL=task.routes.js.map