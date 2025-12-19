import http from "http";
import app from "./app";
import { initSocket } from "./lib/socket";

const PORT = process.env.PORT || 5001;

// 🔹 Create ONE http server
const server = http.createServer(app);

// 🔹 Initialize socket.io ONCE
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
