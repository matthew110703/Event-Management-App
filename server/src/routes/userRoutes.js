import { Router } from "express";

// Controllers
import { getUser, joinEvent } from "../controllers/userController.js";

// Middlewares
import authenticate from "../middleware/authenticate.js";

const userRoutes = Router();

userRoutes.use(authenticate);

// Routes
userRoutes.get("/", getUser);
userRoutes.post("/join", joinEvent);

export default userRoutes;
