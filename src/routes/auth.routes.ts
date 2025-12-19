import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = new AuthController();

router.post("/register", (req, res) =>
  controller.register(req, res)
);

router.post("/login", (req, res) =>
  controller.login(req, res)
);

router.get("/me", authMiddleware, (req, res) =>
  controller.me(req as any, res)
);

router.post("/logout", (req, res) =>
  controller.logout(req, res)
);

export default router;
