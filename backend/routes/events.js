import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
} from "../controllers/eventController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.use(requireAuth);
router.post("/", createEvent);

export default router;
