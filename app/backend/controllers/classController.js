import { 
  scheduleTodayService,
  scheduleTomorrowService,
  fetchClassByIdService,
  scheduleTodaySortByOrderService,
  scheduleTomorrowSortByOrderService,
  bookingClassService,
  fetchBookingByIdService,
  updateAvailableQuotaClassByIdService,
  cancelBookingClassService,
  updateCancelAvailableQuotaClassByIdService,
  fetchScheduleCoachByIdService,
  titleClassService,
  addClassService,
  editClassService,
  participantClassService,
  cancelScheduleClassService,
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

// export const bookingClass = async (req, res) => {
//   try {
//      const Data = req.body;
//     //  const { id_class_schedule,available_quota } = req.params;
//      const bookingClass = await bookingClassService(Data);
//     //  console.log(error);
//      // 3. Handle Supabase error
//     // if (error) {
//     //   // console.log(error);
//     //   return res.status(400).json({ error: error.message });
//     // }
//      res.status(200).json({ message: 'Booking Class created successfully', bookingClass});
    
//     //  const updateAvailableQuotaClass = await updateAvailableQuotaClassByIdService(Data);
//     //  console.log(error);
//     //  // 3. Handle Supabase error
//     // if (error) {
//     //   // console.log(error);
//     //   return res.status(400).json({ error: error.message });
//     // }
//     //  res.status(200).json({ message: 'Update Quota created successfully', updateAvailableQuotaClass});
//    } catch (error) {
//      res.status(500).json({ error: error.message });
//     //  console.log(error);
//     //  console.log(error.message);
//    }

//    try {
//      const UpdateData = req.body;
//     //  const { id_class_schedule,available_quota } = req.params;
//     //  const bookingClass = await bookingClassService(Data);
//     //  console.log(error);
//      // 3. Handle Supabase error
//     // if (error) {
//     //   // console.log(error);
//     //   return res.status(400).json({ error: error.message });
//     // }
//     //  res.status(201).json({ message: 'Booking Class created successfully', bookingClass});
    
//      const updateAvailableQuotaClass = await updateAvailableQuotaClassByIdService(UpdateData);
//     //  console.log(error);
//     //  // 3. Handle Supabase error
//     // if (error) {
//     //   // console.log(error);
//     //   return res.status(400).json({ error: error.message });
//     // }
//      return res.status(200).json({ message: 'Update Quota created successfully', updateAvailableQuotaClass});
//    } catch (error) {
//      res.status(500).json({ error: error.message });
//     //  console.log(error);
//     //  console.log(error.message);
//    }
// };

export const bookingClass = async (req, res) => {
  try {
     const Data = req.body;
    //  const { id_class_schedule,available_quota } = req.params;
     const bookingClass = await bookingClassService(Data);
     console.log(bookingClass);
    //  console.log(error);
     // 3. Handle Supabase error
    if (error) {
      // console.log(error);
      return res.status(400).json({ error: error.message });
    }
     return res.status(200).json({ message: 'Booking Class created successfully', bookingClass});
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

export const cancelBookingClass = async (req, res) => {
  try {
     const CancelData = req.body;
    //  console.log(CancelData);
     const bookingClass = await cancelBookingClassService(CancelData);
     console.log(bookingClass);
     // 3. Handle Supabase error
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      // else{
      //   // const updateAvailableQuotaClass = await updateCancelAvailableQuotaClassByIdService(CancelData);
      // // return res.status(200).json({ message: 'Update Quota cancel successfully', updateAvailableQuotaClass});
      // }
      // const updateAvailableQuotaClass = await updateCancelAvailableQuotaClassByIdService(CancelData);
      // console.log(updateAvailableQuotaClass);
      // res.setHeader('Content-Type', 'application/json');
      // res.setHeader('X-Custom-Header', '12345');
      // res.setHeader('', '12345');
      // res.status(200).send(JSON.stringify({ status: 'ok' }));
      // res.status(200).write(JSON.stringify({ status: 'ok' }));
      return res.status(200).json({ message: 'Cancel Booking Class successfully', bookingClass}); 
   } catch (error) {
     res.status(500).json({ error: error.message });
    //  console.log(error);
    //  console.log(error.message);
   }

  //  try {
  //    const CancelData = req.body;
  //    const updateAvailableQuotaClass = await updateCancelAvailableQuotaClassByIdService(CancelData);
  //    res.setHeader('Content-Type', 'application/json');
     
  //    res.status(200).end(JSON.stringify({ status: 'ok' }));
  //    return res.status(200).json({ message: 'Update Quota cancel successfully', updateAvailableQuotaClass});
  //  } catch (error) {
  //    res.status(500).json({ error: error.message });
  //   //  console.log(error);
  //   //  console.log(error.message);
  //  }
};

export const fetchScheduleCoachById = async (req, res) => {
 try {
     const { id_user } = req.params;
    //  console.log(id_user);
     const fetchScheduleCoachById = await fetchScheduleCoachByIdService(id_user);
     res.status(200).json(fetchScheduleCoachById);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const titleClass = async (req, res) => {
 try {
     const titleClass = await titleClassService();
     res.status(200).json(titleClass);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const addClass = async (req, res) => {
  try {
     const Data = req.body;
     console.log(Data);
     const addClass = await addClassService(Data);
     console.log(addClass);
    //  console.log(error);
     // 3. Handle Supabase error
    if (error) {
      // console.log(error);
      return res.status(400).json({ error: error.message });
    }
     return res.status(200).json({ message: 'Add Class successfully', addClass});
   } catch (error) {
     res.status(500).json({ error: error.message });
    //  console.log(error);
    //  console.log(error.message);
   }
};

export const editClass = async (req, res) => {
  try {
     const Data = req.body;
     const editClass = await editClassService(Data);
     console.log(editClass);
    //  console.log(error);
     // 3. Handle Supabase error
    if (error) {
      // console.log(error);
      return res.status(400).json({ error: error.message });
    }
     return res.status(200).json({ message: 'Edit Class successfully', editClass});
   } catch (error) {
     res.status(500).json({ error: error.message });
    //  console.log(error);
    //  console.log(error.message);
   }
};

export const participantClass = async (req, res) => {
  try {
    //  const Data = req.body;
     const { id_class_schedule } = req.params;
     console.log(id_class_schedule);
     const participantClass = await participantClassService(id_class_schedule);
     console.log(participantClass);
    //  console.log(error);
    //  console.log(error?.message);
     // 3. Handle Supabase error
    // if (error) {
    //   // console.log(error);
    //   return res.status(400).json({ error: error.message });
    // }
    //  return res.status(200).json({ message: 'Participant List successfully', participantClass});
    //  res.status(200).json({ message: 'Participant List successfully', participantClass});
    //  res.status(200).json({ participantClass});
     res.status(200).json(participantClass);
   } catch (error) {
     res.status(500).json({ error: error.message });
    //  console.log(error);
    //  console.log(error.message);
   }
};

export const cancelScheduleClass = async (req, res) => {
  try {
     const CancelData = req.body;
    //  console.log(CancelData);
     const scheduleClass = await cancelScheduleClassService(CancelData);
     console.log(scheduleClass);
     // 3. Handle Supabase error
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(200).json({ message: 'Cancel Schedule Class successfully', scheduleClass}); 
   } catch (error) {
     res.status(500).json({ error: error.message });
    //  console.log(error);
    //  console.log(error.message);
   }
};
