"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const JWT_SECRET = process.env.JWT_SECRET;
class AuthService {
    async register(data) {
        const existing = await prisma_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existing) {
            throw new Error("Email already registered");
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });
        // remove password before returning
        const { password, ...safeUser } = user;
        return safeUser;
    }
    async login(data) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isValid = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isValid) {
            throw new Error("Invalid email or password");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        const { password, ...safeUser } = user;
        return { user: safeUser, token };
    }
    async getProfile(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            throw new Error("User not found");
        const { password, ...safeUser } = user;
        return safeUser;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map