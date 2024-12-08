import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
} from "../controllers/eventController.js";
import requireAuth from "../middleware/requireAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.use(requireAuth);
router.use(requireAdmin);
router.post("/", createEvent);

export default router;
