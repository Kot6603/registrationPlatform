import express from "express";
import {
  getEvents,
  getEvent,
  registerUser,
  createEvent,
} from "../controllers/eventController.js";
import requireAuth from "../middleware/requireAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// public routes
router.get("/", getEvents);
router.get("/:id", getEvent);

// protected routes
router.use(requireAuth);
router.post("/:id/users", registerUser);

// admin routes
router.use(requireAdmin);
router.post("/", createEvent);

export default router;
