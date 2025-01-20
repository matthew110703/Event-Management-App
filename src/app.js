import express from "express";
import morgan from "morgan";

const app = express(); // App

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRoutes); // Auth Routes
app.use("/api/events", eventRoutes); // Event Routes
app.use("/api/user", userRoutes); // User Routes

// Error Handler
import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler);

export default app;
