import express from "express";
import {
  scheduleToday,
  scheduleTomorrow,
  fetchClassById,
  scheduleTodaySortByOrder,
  scheduleTomorrowSortByOrder,
  bookingClass,
  fetchBookingById,
  cancelBookingClass,
  fetchScheduleCoachById,
  titleClass,
  addClass,
  editClass,
  participantClass,
  cancelScheduleClass
} from "../controllers/classController.js";

const router = express.Router();

router.get("/schedule_today", scheduleToday);
router.get("/schedule_tomorrow", scheduleTomorrow);
router.get("/schedule/:id_class_schedule", fetchClassById);
router.get("/schedule_today_list", scheduleTodaySortByOrder);
router.get("/schedule_tomorrow_list", scheduleTomorrowSortByOrder);

router.post("/booking_class", bookingClass);
router.get("/booking/:id_user", fetchBookingById);
router.put("/booking_class/cancel", cancelBookingClass);

router.get("/schedule_coach/:id_user", fetchScheduleCoachById);
router.get("/title_class", titleClass);
router.post("/add_class", addClass);
router.post("/edit_class", editClass);
router.get("/participant/:id_class_schedule", participantClass);
router.put("/schedule_class/cancel", cancelScheduleClass);

export default router;