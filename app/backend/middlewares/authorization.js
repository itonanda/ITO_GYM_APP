import { supabaseAnon, supabaseServiceRole } from "../config/supabaseConfig.js";
import express from "express";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Missing token' });

  // Verify the token with Supabase
  const { data: { user }, error } = await supabaseServiceRole.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  // if (user) {
  // const { data: profiles } = await supabaseServiceRole
  //   .from('profiles')
  //   .select('*')
  //   .eq('id', user.id)
  //   .single();

  //   return profiles
  // }
  
  req.user = user; // Attach user to request
  // req.profiles = profiles; // Attach user profiles to request

  console.log(user);

  next();
};

const dataUser = async (req, res, next) => {
  const { data } = await supabaseAnon.auth.signInWithPassword({
    email: "admin@doms.com", 
    password: "12345", 
  });
  
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);

  if (!token) return res.status(401).json({ error: 'Missing token' });

  // Verify the token with Supabase
  const { data: { user }, error } = await supabaseServiceRole.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  if (user) {
  // const { data: profiles } = await supabase
  const { data: users } = await supabaseServiceRole
    // .from('profiles')
    .from('users')
    // .select('full_name')
    .select('fullname')
    .eq('id', user.id)
    .single();
    
  console.log(users.fullname);
  }

  req.user = user; // Attach user to request

  next();
};

const router = express.Router();

// Example protected route
router.get('/dashboard', dataUser, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}!` });
});

router.get('/profile', authenticate, (req, res) => {
  res.json({ 
    // message: `Welcome ${req.user.email}!`, 
    // message: 'Secure data accessed successfully!',
    id_user: req.user.id,
    email: req.user.email,
    // fullname: req.profiles.fullname
    // full_name: req.user.metadata.full_name,
    name: req.user.user_metadata.name,
    // display_name : req.user.display_name
  });
});

// Protected Route
// app.get('/api/secure-data', authenticateToken, (req, res) => {
//   res.json({ message: 'Access granted', user: req.user });
// });

export default router;