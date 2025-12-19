"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = exports.RegisterDto = void 0;
const zod_1 = require("zod");
exports.RegisterDto = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name is too short"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
exports.LoginDto = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
//# sourceMappingURL=auth.dto.js.map