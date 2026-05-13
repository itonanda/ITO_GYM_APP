import { supabaseAnon, supabaseServiceRole } from "../config/supabaseConfig.js";

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Missing token' });

  // Verify the token with Supabase
  const { data: { user }, error } = await supabaseServiceRole.auth.getUser(token);

  if (error || !user) return res.status(401).json({ error: 'Invalid token' });

  req.user = user; // Attach user to request
  next();
};

// Example protected route
app.get('/dashboard', authenticateUser, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}!` });
});