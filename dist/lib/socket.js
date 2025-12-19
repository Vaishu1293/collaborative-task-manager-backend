"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
exports.getIO = getIO;
const socket_io_1 = require("socket.io");
let io = null;
function initSocket(server) {
    if (io) {
        console.warn("⚠️ Socket.IO already initialized");
        return io;
    }
    io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("📡 New socket connection:", socket.id);
        socket.on("join", (userId) => {
            socket.join(userId);
        });
        socket.on("join:tasks", () => {
            socket.join("tasks");
        });
        socket.on("disconnect", () => {
            console.log("🛑 Socket disconnected:", socket.id);
        });
    });
    return io;
}
function getIO() {
    if (!io) {
        throw new Error("❌ Socket.io not initialized");
    }
    return io;
}
//# sourceMappingURL=socket.js.map