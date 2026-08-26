import { supabaseAnon, supabaseServiceRole } from "../config/supabaseConfig.js";

export const createUser = async (userData) => {
  //const hash = bcrypt.hashSync(userData.password, 8)
  const { data, error } = await supabase
    .from("users")
    //.insert([userData])
    .insert({
      full_name:userData.full_name,
      email:userData.email,
      password:bcrypt.hashSync(userData.password, 8)
      //password:hash
      //password:userData.password
    })
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getUserById = async (id_user) => {
  console.log(id_user);
  // const { data, error } = await supabaseAnon
  const { data, error } = await supabaseServiceRole
    .from("profiles")
    .select("*")
    .eq("id", id_user)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
};

export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteUser = async (id) => {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "User deleted successfully" };
};

export const searchUsers = async (query) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) throw new Error(error.message);
  return data;
};

export const getMembers = async () => {
  const { data, error } = await supabaseServiceRole
  .from("profiles")
  .select("*")
  // .select('id, email, user_metadata')
  // .eq('user_metadata->>role', 'member');
  .eq('role', 'member');

  if (error) throw new Error(error.message);
  return data;
  
  // // Fetch all users using the Admin API
  // const { data: { users }, error } = await supabaseServiceRole.auth.admin.listUsers()
  
  // if (error) throw error

  // // Filter the list by metadata role
  // const members = users.filter(user => user.user_metadata?.role === 'member')
  
  // return members
};

export const getCoaches = async () => {
  // const { data, error } = await supabaseServiceRole.from("users").select("*").eq("user.user_metadata.role", coach);

   const { data, error } = await supabaseServiceRole
  .from("profiles")
  .select("*")
  .eq('role', 'coach');

  if (error) throw new Error(error.message);
  return data;
};
