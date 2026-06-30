import express from "express";
import {
  signUp,
  signIn,
  signInData,
  signOut
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/sign-in", signInData);
router.post("/signout", signOut);

// Protected Route
// router.get("/secure-data", secureData);
// router.get("/session", session);
// router.get("/user-data", userData);

export default router;