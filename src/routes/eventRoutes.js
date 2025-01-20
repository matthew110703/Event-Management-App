import { Router } from "express";

// Controllers
import {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getUserEvents,
  getPastEvents,
  getJoinedEvents,
} from "../controllers/eventController.js";

// Middleware
import authenticate from "../middleware/authenticate.js";

const eventRoutes = Router();

// Routes
eventRoutes.get("/", getEvents);
eventRoutes.get("/upcoming", getUpcomingEvents);
eventRoutes.get("/past", getPastEvents);
eventRoutes.get("/user", authenticate, getUserEvents);
eventRoutes.get("/joined", authenticate, getJoinedEvents);
eventRoutes.post("/", authenticate, createEvent);

eventRoutes
  .route("/:id")
  .get(getEvent)
  .put(authenticate, updateEvent)
  .delete(authenticate, deleteEvent);

export default eventRoutes;
