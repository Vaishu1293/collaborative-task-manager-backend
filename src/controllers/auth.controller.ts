import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDto, LoginDto } from "../dtos/auth.dto";

const service = new AuthService();

const isProd = process.env.NODE_ENV === "production";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data = RegisterDto.parse(req.body);
      const user = await service.register(data);

      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (err: any) {
      res.status(400).json({
        message: err?.message ?? "Registration failed",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = LoginDto.parse(req.body);
      const { user, token } = await service.login(data);

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: isProd,              // ✅ HTTPS only in prod
          sameSite: isProd ? "none" : "lax", // ✅ REQUIRED for Vercel ↔ Render
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200)
        .json({
          message: "Login successful",
          user,
        });
    } catch (err: any) {
      res.status(401).json({
        message: err?.message ?? "Login failed",
      });
    }
  }

  async me(req: any, res: Response) {
    try {
      if (!req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await service.getProfile(req.user.id);
      res.status(200).json({ user });
    } catch {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  async logout(_req: Request, res: Response) {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  }
}
