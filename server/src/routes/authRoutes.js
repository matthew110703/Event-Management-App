import { Router } from "express";

// Route Handlers
import { register, login } from "../controllers/authController.js";

const authRoutes = Router();

// Routes
authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
