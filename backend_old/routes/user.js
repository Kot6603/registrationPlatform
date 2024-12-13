import express from "express";
import {
  loginUser,
  signupUser,
  getUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import requireAuth from "../middleware/requireAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);

// protected routes
router.use(requireAuth);
router.get("/:id", getUser);
router.patch("/:id", updateUser);

// admin routes
router.use(requireAdmin);
router.get("/", getUsers);

export default router;
