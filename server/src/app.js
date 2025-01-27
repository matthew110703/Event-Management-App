import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express(); // App

// Middlewares
// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
import { categories } from "./models/eventModel.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
app.get("/api", (req, res) => {
  res.send("Welcome to Event Management API");
});
app.get("/api/meta-data", (req, res) => {
  res.json({
    title: "Event Management API",
    description: "API for managing events",
    version: "1.0.0",
    event: {
      categories,
      types: ["public", "private"],
    },
  });
});
app.use("/api/auth", authRoutes); // Auth Routes
app.use("/api/events", eventRoutes); // Event Routes
app.use("/api/user", userRoutes); // User Routes

// Error Handler
import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler);

export default app;
