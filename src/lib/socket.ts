import { Server as HTTPServer } from "http";
import { Server } from "socket.io";

let io: Server | null = null;

export function initSocket(server: HTTPServer) {
  if (io) {
    console.warn("⚠️ Socket.IO already initialized");
    return io;
  }

  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("📡 New socket connection:", socket.id);

    socket.on("join", (userId: string) => {
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

export function getIO(): Server {
  if (!io) {
    throw new Error("❌ Socket.io not initialized");
  }
  return io;
}
