import { 
  scheduleTodayService,
  scheduleTomorrowService,
  fetchClassByIdService,
  scheduleTodaySortByOrderService,
  scheduleTomorrowSortByOrderService,
  bookingClassService,
  fetchBookingByIdService,
  updateAvailableQuotaClassByIdService
} from "../services/classService.js";

export const scheduleToday = async (req, res) => {
 try {
     const scheduleToday = await scheduleTodayService();
     res.status(200).json(scheduleToday);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const scheduleTomorrow = async (req, res) => {
 try {
     const scheduleTommorrow = await scheduleTomorrowService();
     res.status(200).json(scheduleTommorrow);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const fetchClassById = async (req, res) => {
 try {
     const { id_class_schedule } = req.params;
     const fetchClassById = await fetchClassByIdService(id_class_schedule);
     if (!fetchClassById) {
      return res.status(404).json({ error: "Class Schedule not found" });
    }
     res.status(200).json(fetchClassById);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const scheduleTodaySortByOrder = async (req, res) => {
  try {
    // Extract sort parameters from the query string (e.g., ?sortBy=created_at&order=desc)
    const sortBy = req.query.sortBy || 'start_time';
    const sortOrder = req.query.order === 'asc' ? true : false;
     const scheduleTodayDashboard = await scheduleTodaySortByOrderService(sortBy,sortOrder);
     res.status(200).json(scheduleTodayDashboard);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const scheduleTomorrowSortByOrder = async (req, res) => {
  try {
    // Extract sort parameters from the query string (e.g., ?sortBy=created_at&order=desc)
    const sortBy = req.query.sortBy || 'start_time';
    const sortOrder = req.query.order === 'asc' ? true : false;
     const scheduleTodayDashboard = await scheduleTomorrowSortByOrderService(sortBy,sortOrder);
     res.status(200).json(scheduleTodayDashboard);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const bookingClass = async (req, res) => {
  try {
     const Data = req.body;
    //  const { id_class_schedule,available_quota } = req.params;
     const bookingClass = await bookingClassService(Data);
    //  console.log(error);
     // 3. Handle Supabase error
    // if (error) {
    //   // console.log(error);
    //   return res.status(400).json({ error: error.message });
    // }
     res.status(200).json({ message: 'Booking Class created successfully', bookingClass});
    
    //  const updateAvailableQuotaClass = await updateAvailableQuotaClassByIdService(Data);
    //  console.log(error);
    //  // 3. Handle Supabase error
    // if (error) {
    //   // console.log(error);
    //   return res.status(400).json({ error: error.message });
    // }
    //  res.status(200).json({ message: 'Update Quota created successfully', updateAvailableQuotaClass});
   } catch (error) {
     res.status(500).json({ error: error.message });
    //  console.log(error);
    //  console.log(error.message);
   }

   try {
     const UpdateData = req.body;
    //  const { id_class_schedule,available_quota } = req.params;
    //  const bookingClass = await bookingClassService(Data);
    //  console.log(error);
     // 3. Handle Supabase error
    // if (error) {
    //   // console.log(error);
    //   return res.status(400).json({ error: error.message });
    // }
    //  res.status(201).json({ message: 'Booking Class created successfully', bookingClass});
    
     const updateAvailableQuotaClass = await updateAvailableQuotaClassByIdService(UpdateData);
    //  console.log(error);
    //  // 3. Handle Supabase error
    // if (error) {
    //   // console.log(error);
    //   return res.status(400).json({ error: error.message });
    // }
     return res.status(200).json({ message: 'Update Quota created successfully', updateAvailableQuotaClass});
   } catch (error) {
     res.status(500).json({ error: error.message });
    //  console.log(error);
    //  console.log(error.message);
   }
};

export const fetchBookingById = async (req, res) => {
 try {
     const { id_user } = req.params;
     const fetchBookingById = await fetchBookingByIdService(id_user);
     if (!fetchBookingById) {
      return res.status(404).json({ error: "Class Schedule not found" });
    }
     res.status(200).json(fetchBookingById);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};