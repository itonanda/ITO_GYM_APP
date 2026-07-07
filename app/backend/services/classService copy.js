import { supabaseAnon, supabaseServiceRole } from "../config/supabaseConfig.js";

export const scheduleTodayService = async () => {
 // Get today's date in 'YYYY-MM-DD' format
 const today = new Date().toISOString().split('T')[0];

 const { data, error } = await supabaseServiceRole
    .from("class_schedule")
    // .select("*");
    .select(`
        id_class_schedule, 
        start_time_class,
        end_time_class,
        available_quota_class,
        quota_class,
        descriptions_class,
        list_class,
        coach (
          id,
          fullname
        ),
        class (
          id_class,
          name_class
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule
        )
      `//);
      )
    .eq("schedule_date_class", `${today}`);
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
        start_time_class,
        end_time_class,
        available_quota_class,
        quota_class,
        descriptions_class,
        list_class,
        coach (
          id,
          fullname
        ),
        class (
          id_class,
          name_class
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule
        )
      `//);
      )
    .eq("schedule_date_class", `${tomorrowString}`);
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
        start_time_class,
        end_time_class,
        available_quota_class,
        quota_class,
        descriptions_class,
        list_class,
        coach (
          id,
          fullname
        ),
        class (
          id_class,
          name_class
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
        start_time_class,
        end_time_class,
        available_quota_class,
        quota_class,
        descriptions_class,
        list_class,
        coach (
          id,
          fullname
        ),
        class (
          id_class,
          name_class
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule
        )
      `//);
      )
    .eq("schedule_date_class", `${today}`)
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
        start_time_class,
        end_time_class,
        available_quota_class,
        quota_class,
        descriptions_class,
        list_class,
        coach (
          id,
          fullname
        ),
        class (
          id_class,
          name_class
        ),
        class_booking (
          id_class_booking,
          id_user,
          id_class_schedule
        )
      `//);
      )
    .eq("schedule_date_class", `${tomorrowString}`)
    .order(sortBy, { ascending: sortOrder });
    // .single();
  if (error) throw new Error(error.message);
  return data;
};

export const bookingClassService = async (Data) => {
  const { data, error } = await supabaseServiceRole
  .from("class_booking")
  .insert({
    id_user:Data[0].userId,
    id_class_schedule:Data[1].id_class_schedule,
    // user_metadata: { role: userData.role, name: userData.fullName, date_of_birth: userData.birthDateJSON, gender: userData.gender, emergency_contact_phone: userData.emergencyContactNo, emergency_contact_name: userData.emergencyContactName }
  })
  .select();
  if (error) throw new Error(error.message);
  return data;
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
        status,
        class_schedule (
          id_class_schedule,
          start_time_class,
          end_time_class,
          schedule_date_class,
          coach (
            id,
            fullname
          ),
          class (
            id_class,
            name_class
          )
        )
      `//);
      )
    .eq("id_user", id_user)
    // .single();
  if (error) throw new Error(error.message);
  return data;
};
