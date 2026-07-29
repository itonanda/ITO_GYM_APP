import express from "express";
import {
  paymentMethodByName,
  paymentCheckOut,
  paymentHistoryByIdUser
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/method/:paymentMethodName", paymentMethodByName);
router.post("/checkout", paymentCheckOut);
router.get("/history/:id_user", paymentHistoryByIdUser);

export default router;