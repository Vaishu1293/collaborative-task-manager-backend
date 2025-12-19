"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./lib/socket");
const PORT = process.env.PORT || 5001;
// 🔹 Create ONE http server
const server = http_1.default.createServer(app_1.default);
// 🔹 Initialize socket.io ONCE
(0, socket_1.initSocket)(server);
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map