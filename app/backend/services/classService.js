import { supabaseAnon, supabaseServiceRole } from "../config/supabaseConfig.js";

export const scheduleTodayService = async () => {
 // Get today's date in 'YYYY-MM-DD' format
 const today = new Date().toISOString().split('T')[0];

 const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    // .select("*");
    .select(`
        id_class_schedule, 
        start_time,
        end_time,
        descriptions,
        list,
        quota,
        available_quota,
        profiles (
          id,
          full_name
        ),
        class_title (
          id_class_title,
          title
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule,
          updated_at,
          updated_by,
          status
        )
      `//);
      )
    .eq("date", `${today}`);
    // .single();
  if (error) throw new Error(error.message);
  return data;
};

export const scheduleTomorrowService = async () => {
// Get current date
 const today = new Date();
// Current date and add 1 day to get tomorrow
 const tomorrow = new Date(today);
 tomorrow.setDate(tomorrow.getDate() + 1);

// Format as YYYY-MM-DD using local time
 const yyyy = tomorrow.getFullYear();
 const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
 const dd = String(tomorrow.getDate()).padStart(2, '0');

// Combine into final YYYY-MM-DD format
 const tomorrowString = `${yyyy}-${mm}-${dd}`;

 const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    // .select("*");
    .select(`
        id_class_schedule, 
        start_time,
        end_time,
        descriptions,
        list,
        quota,
        available_quota,
        profiles (
          id,
          full_name
        ),
        class_title (
          id_class_title,
          title
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule
        )
      `//);
      )
    .eq("date", `${tomorrowString}`);
    // .single();
  if (error) throw new Error(error.message);
  return data;
};

export const fetchClassByIdService = async (id_class_schedule) => {
  const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    // .select("*");
    .select(`
        id_class_schedule, 
        date,
        start_time,
        end_time,
        descriptions,
        list,
        quota,
        available_quota,
        profiles (
          id,
          full_name
        ),
        class_title (
          id_class_title,
          title
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule
        )
      `//);
      )
    .eq("id_class_schedule", id_class_schedule)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const scheduleTodaySortByOrderService = async (sortBy,sortOrder) => {
 // Get today's date in 'YYYY-MM-DD' format
 const today = new Date().toISOString().split('T')[0];

 const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    // .select("*");
    .select(`
        id_class_schedule, 
        start_time,
        end_time,
        descriptions,
        list,
        quota,
        available_quota,
        profiles (
          id,
          full_name
        ),
        class_title (
          id_class_title,
          title
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule,
          updated_at,
          updated_by,
          status
        )
      `//);
      )
    .eq("date", `${today}`)
    .order(sortBy, { ascending: sortOrder });
    // .single();
  if (error) throw new Error(error.message);
  return data;
};

export const scheduleTomorrowSortByOrderService = async (sortBy,sortOrder) => {
 // Get current date
 const today = new Date();
// Current date and add 1 day to get tomorrow
 const tomorrow = new Date(today);
 tomorrow.setDate(tomorrow.getDate() + 1);

// Format as YYYY-MM-DD using local time
 const yyyy = tomorrow.getFullYear();
 const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
 const dd = String(tomorrow.getDate()).padStart(2, '0');

// Combine into final YYYY-MM-DD format
 const tomorrowString = `${yyyy}-${mm}-${dd}`;

 const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    // .select("*");
    .select(`
        id_class_schedule, 
        start_time,
        end_time,
        descriptions,
        list,
        quota,
        available_quota,
        profiles (
          id,
          full_name
        ),
        class_title (
          id_class_title,
          title
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule,
          updated_at,
          updated_by,
          status
        )
      `//);
      )
    .eq("date", `${tomorrowString}`)
    .order(sortBy, { ascending: sortOrder });
    // .single();
  if (error) throw new Error(error.message);
  return data;
};

export const bookingClassService = async (Data) => {
  console.log(Data);
  const { data : class_booking_data, error : class_booking_error } = await supabaseServiceRole
  .from("class_booking")
  .insert({
  // .upsert({
    id_user:Data[0].id_user,
    id_class_schedule:Data[1].id_class_schedule,
    id_class_status:1

    // user_metadata: { role: userData.role, name: userData.fullName, date_of_birth: userData.birthDateJSON, gender: userData.gender, emergency_contact_phone: userData.emergencyContactNo, emergency_contact_name: userData.emergencyContactName }
  })
  // },{ onConflict: "id_user" })
  .select();
  if (class_booking_error) throw new Error(class_booking_error.message);
  // return data;

  const value = Data[1].available_quota-1;
  console.log(value);
  const { data : class_schedule_data, error : class_schedule_error } = await supabaseServiceRole
    .from("class_schedule")
    .update({
        available_quota: value
      })
    .eq("id_class_schedule", Data[1].id_class_schedule)
    .select();
  if (class_schedule_error) throw new Error(class_schedule_error.message);
  return { class_booking_data, class_schedule_data };
};

export const fetchBookingByIdService = async (id_user) => {
  const { data, error } = await supabaseServiceRole
    .from("class_booking")
    // .select("*");
    .select(`
        id_class_booking,
        id_user,
        updated_at,
        updated_by,
        class_status (
          id_class_status,
          title
        ),
        class_schedule (
          id_class_schedule,
          start_time,
          end_time,
          date,
          quota,
          available_quota,
          profiles (
            id,
            full_name
          ),
          class_title (
            id_class_title,
            title
          )
        )
      `//);
      )
    .eq("id_class_status", 1)
    .eq("id_user", id_user);
    // .eq("id_class_status", "1");
    // .single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateAvailableQuotaClassByIdService = async (UpdateData) => {
  const value = UpdateData[1].available_quota-1;
  // console.log(value);
  const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    .update({
        available_quota: value
      })
    .eq("id_class_schedule", UpdateData[1].id_class_schedule)
    .select();
  if (error) throw new Error(error.message);
  return data;
};


export const cancelBookingClassService = async (CancelData) => {
  console.log(CancelData);
  // const { data, error } = await supabaseServiceRole
  //   .from("class_booking")
  //   .update({
  //       id_class_status: 2
  //     })
  //   .eq("id_class_booking", CancelData.id_class_booking)
  //   .select();
  // if (error) throw new Error(error.message);

  const { data : class_booking_data, error : class_booking_error } = await supabaseServiceRole
    .from("class_booking")
    .update({
        id_class_status: 2
      })
    .eq("id_class_booking", CancelData.id_class_booking)
    .select();
  if (class_booking_error) throw new Error(class_booking_error.message);

  const value = CancelData.available_quota+1;
  console.log(value);
  const { data : class_schedule_data, error : class_schedule_error } = await supabaseServiceRole
    .from("class_schedule")
    .update({
        available_quota: value
      })
    .eq("id_class_schedule", CancelData.id_class_schedule)
    .select();
  if (class_schedule_error) throw new Error(class_schedule_error.message);

  return { class_booking_data, class_schedule_data };
};

export const updateCancelAvailableQuotaClassByIdService = async (CancelData) => {
  const value = CancelData.available_quota+1;
  console.log(value);
  const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    .update({
        available_quota: value
      })
    .eq("id_class_schedule", CancelData.id_class_schedule)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const fetchScheduleCoachByIdService = async (id_user) => {
  // console.log(id_user);
  const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    // .select("*");
    .select(`
          id_class_schedule,
          date,
          start_time,
          end_time,
          quota,
          available_quota,
          profiles (
            id,
            full_name
          ),
           class_title (
            id_class_title,
            title
          )
      `//);
      )
    .order("id_class_schedule")
    .eq("id_coach", id_user);
    // .eq("id_class_status", "1");
    // .single();
  if (error) throw new Error(error.message);
  return data;
};

export const titleClassService = async () => {
  const { data, error } = await supabaseServiceRole
    .from("class_title")
    // .select("*")
    .select(`
        id_class_title,
        title
      `//);
      )
    // .eq("id_class_status", 1)
    // .eq("id_user", id_user);
    // .eq("id_class_status", "1");
    // .single();
    .order("id_class_title");
  if (error) throw new Error(error.message);
  return data;
};

export const addClassService = async (Data) => {
  console.log(Data);
  const { data, error } = await supabaseServiceRole
  .from("class_schedule")
  .insert({
  // .upsert({
    id_coach:Data.id_user,
    id_class_title:Data.IdClassName,
    start_time:Data.startTimeJSON,
    end_time:Data.endTimeJSON,
    date:Data.classDateJSON,
    descriptions:Data.descriptions,
    list:Data.list,
    quota:Data.quota,
    available_quota:Data.quota
    // user_metadata: { role: userData.role, name: userData.fullName, date_of_birth: userData.birthDateJSON, gender: userData.gender, emergency_contact_phone: userData.emergencyContactNo, emergency_contact_name: userData.emergencyContactName }
  })
  // },{ onConflict: "id_user" })
  .select();
  if (error) throw new Error(error.message);
  return data;
};

export const editClassService = async (Data) => {
  console.log(Data);
  // const { data, error } = await supabaseServiceRole
  //   .from("class_schedule")
  //   .update({
  //       available_quota: value
  //     })
  //   .eq("id_class_schedule", CancelData.id_class_schedule)
  //   .select();
  const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    .update({
        id_class_title:Data.IdClassName,
        // start_time:Data.startTimeJSON,
        // end_time:Data.endTimeJSON,
        start_time:Data.fetchStartTime,
        end_time:Data.fetchEndTime,
        date:Data.classDateJSON,
        descriptions:Data.descriptions,
        list:Data.list,
        quota:Data.quota
      })
    .eq("id_class_schedule", Data.id_class_schedule)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const participantClassService = async (id_class_schedule) => {
  const { data, error } = await supabaseServiceRole
    .from("class_booking")
    // .select("*")
    .select(`
        id_class_booking,
        id_class_status,
        users:id_user ( 
        *
        ),
        updated_at,
        updated_by
      `//);
      )
    // .eq("id_class_status", 1)
    // .eq("id_user", id_user);
    // .eq("id_class_status", "1");
    // .single();
    .order("id_class_booking")
    .eq("id_class_schedule", id_class_schedule)
    .eq("id_class_status", 1);
  if (error) throw new Error(error.message);
  return data;
};

export const cancelScheduleClassService = async (CancelData) => {
  console.log(CancelData);
  const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    // .update({
    //     id_class_status: 2
    //   })
    .delete()
    .eq("id_class_schedule", CancelData.id_class_schedule);
    // .select();
  if (error) throw new Error(error.message);
  return data;
};
