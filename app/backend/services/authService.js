import supabase from "../config/supabaseClient.js";
import bcrypt from 'bcryptjs';

export const signUp = async (userData) => {
  const { data, error } = await supabase
    .from("users")
    //.insert([userData])
    .insert({
      full_name:userData.fullname,
      email:userData.email,
      phone_number:userData.phone,
      date_of_birth:userData.dob,
      gender:userData.gender,
      password:bcrypt.hashSync(userData.password, 8)
    })
    .select();

  if (error) throw new Error(error.message);
  return data;
};