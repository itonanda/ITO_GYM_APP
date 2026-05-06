import supabaseAdmin from "../config/supabaseAdmin.js";
import supabase from "../config/supabaseClient.js";
// import {createAuthUser} from "";
// import {} from "";
import bcrypt from 'bcryptjs';

// export const signUpService = async (userData) => {
//   const { data, error } = await supabase
//     .from("users")
//     //.insert([userData])
//     .insert({
//       full_name:userData.fullname,
//       email:userData.email,
//       phone_number:userData.phone,
//       date_of_birth:userData.dob,
//       gender:userData.gender,
//       password:bcrypt.hashSync(userData.password, 8)
//     })
//     .select();

//   if (error) throw new Error(error.message);
//   return data;
// };

export const signUpService = async (userData) => {
//   const { data, error } = await supabase.auth.signUp({
//     email:userData.email, password:userData.password, 
//     });

// const { data, error } = await supabase
const { data, error } = await supabaseAdmin.auth.admin.createUser({
    // .from("auth.users")
    // .insert({
    email:userData.email,
    phone:userData.phone,
    password:userData.password,
    email_confirm: false, // Automatically confirm email
    user_metadata: { name: userData.fullname }
  });
//   .select();

  if (error) throw new Error(error.message);
  return data;
};

export const signInService = async (userData) => {
//   const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ 
    email:userData.email, 
    password:userData.password, 
    });
//     const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("email", userData.email)
//     .single();

//   if (error && error.code !== 'PGRST116') throw new Error(error.message);

  if (error) throw new Error(error.message);
  return data;
};