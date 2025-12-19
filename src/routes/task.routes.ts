import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = new TaskController();

/**
 * TASK ROUTES
 */

// Create task
router.post(
  "/",
  authMiddleware,
  (req, res) => controller.create(req as any, res)
);

// List tasks with filters
router.get(
  "/",
  authMiddleware,
  (req, res) => controller.list(req as any, res)
);

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  (req, res) => controller.dashboard(req as any, res)
);

// Update task
router.put(
  "/:id",
  authMiddleware,
  (req, res) => controller.update(req as any, res)
);

// Delete task
router.delete(
  "/:id",
  authMiddleware,
  (req, res) => controller.remove(req as any, res)
);

export default router;
