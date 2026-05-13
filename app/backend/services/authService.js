// import supabaseAdmin from "../config/supabaseAdmin.js";
// import supabase from "../config/supabaseClient.js";

import { supabaseAnon, supabaseServiceRole } from "../config/supabaseConfig.js";

// import bcrypt from 'bcryptjs';

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

// const { data, error } = await supabase.auth.admin.createUser({
const { data, error } = await supabaseServiceRole.auth.admin.createUser({
// const { data, error } = await supabaseServiceRole.auth.admin.inviteUserByEmail(
    // userData.email
    // );
    email:userData.email,
    phone:userData.phone,
    password:userData.password,
    email_confirm: false, // Automatically confirm email if (true)
    user_metadata: { name: userData.fullname }
  });
  
  if (error) throw new Error(error.message);
  return data;
};

export const sendbyEmailService = async (userData) => {
const { data, error } = await supabaseServiceRole.auth.resend({
  type: 'signup',
  email: userData.email,
  options: {
    emailRedirectTo: 'http://192.168.20.68:8001'
  }
})
if (error) throw new Error(error.message);
  return data;
};

export const generateLinkService = async (userData) => {
const { data, error } = await supabaseServiceRole.auth.admin.generateLink({
  type: 'signup',
  email: userData.email,
  options: { redirectTo: 'http://192.168.20.68:8001' }
});

 if (error) throw new Error(error.message);
  return data;
};

export const inviteByEmailService = async (userData) => {
const { data, error } = await supabaseServiceRole.auth.admin.inviteUserByEmail(
    userData.email
    );

  if (error) throw new Error(error.message);
  return data;
};

export const signInService = async (userData) => {
// const { email, password } = req.body;
const { data, error } = await supabaseAnon.auth.signInWithPassword({ 
    email:userData.email, 
    password:userData.password, 
    });

    // if (error) console.error('Error logging in:', error.message)
    // else {
    //     // Access the token from the session
    //     const accessToken = data.session.access_token
    //     console.log('Access Token:', accessToken)
    // }

    // Session data includes access_token and refresh_token
    // const { session, user } = data;
    
  if (error) throw new Error(error.message);
  return data;
};

export const signOutService = async (token) => {
    // const { error } = await supabase.auth.signOut();
    // const { error } = await supabase.auth.signOut({ scope: 'local' });
    // const { error } = await supabase.auth.signOut({ scope: 'others' });
    // console.log(token);
    // 2. Sign out with Supabase using the user's token
    const { error } = await supabaseServiceRole.auth.admin.signOut(token); // Use admin/API signOut for server-side
    // console.log(error);
    // if (error) throw error;
    if (error) throw new Error(error.message);

    // 3. Clear any session cookies if applicable
    // res.clearCookie('sb-access-token');
   return ;
};