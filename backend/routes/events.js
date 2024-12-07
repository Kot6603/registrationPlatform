import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", createEvent);

export default router;
