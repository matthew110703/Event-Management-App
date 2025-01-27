import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";

// Load Environment Variables
dotenv.config();

// Database Connection
dbConnect();

// HTTP Server Initialization
const httpServer = createServer(app);

// Socket.io Connection
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// WebSockets Event Updates
import { eventUpdates } from "./controllers/eventUpdateController.js";
eventUpdates(io);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
