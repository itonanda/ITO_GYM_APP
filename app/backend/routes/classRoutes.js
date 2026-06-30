import express from "express";
import {
  scheduleToday,
  scheduleTomorrow,
  fetchClassById,
  scheduleTodaySortByOrder,
  scheduleTomorrowSortByOrder,
  bookingClass,
  fetchBookingById
} from "../controllers/classController.js";

const router = express.Router();

router.get("/schedule_today", scheduleToday);
router.get("/schedule_tomorrow", scheduleTomorrow);
router.get("/schedule/:id_class_schedule", fetchClassById);
router.get("/schedule_today_list", scheduleTodaySortByOrder);
router.get("/schedule_tomorrow_list", scheduleTomorrowSortByOrder);
router.post("/booking_class", bookingClass);
router.get("/booking/:id_user", fetchBookingById);

export default router;