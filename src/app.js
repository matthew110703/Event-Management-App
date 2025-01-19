import express from "express";
import morgan from "morgan";

const app = express(); // App

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRoutes); // Auth Routes

// Error Handler
import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler);

export default app;
