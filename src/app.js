import express from "express";
import morgan from "morgan";

const app = express(); // App

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
