import express from "express";
import {
  membershipPlans,
  membershipPlansById
} from "../controllers/membershipController.js";

const router = express.Router();

router.get("/plans", membershipPlans);
router.get("/plans/:id_membership_plan", membershipPlansById);

export default router;