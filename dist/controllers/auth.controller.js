"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_dto_1 = require("../dtos/auth.dto");
const service = new auth_service_1.AuthService();
const isProd = process.env.NODE_ENV === "production";
class AuthController {
    async register(req, res) {
        try {
            const data = auth_dto_1.RegisterDto.parse(req.body);
            const user = await service.register(data);
            res.status(201).json({
                message: "User registered successfully",
                user,
            });
        }
        catch (err) {
            res.status(400).json({
                message: err?.message ?? "Registration failed",
            });
        }
    }
    async login(req, res) {
        try {
            const data = auth_dto_1.LoginDto.parse(req.body);
            const { user, token } = await service.login(data);
            res
                .cookie("token", token, {
                httpOnly: true,
                secure: isProd, // ✅ HTTPS only in prod
                sameSite: isProd ? "none" : "lax", // ✅ REQUIRED for Vercel ↔ Render
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
                .status(200)
                .json({
                message: "Login successful",
                user,
            });
        }
        catch (err) {
            res.status(401).json({
                message: err?.message ?? "Login failed",
            });
        }
    }
    async me(req, res) {
        try {
            if (!req.user.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const user = await service.getProfile(req.user.id);
            res.status(200).json({ user });
        }
        catch {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
    async logout(_req, res) {
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
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map