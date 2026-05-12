import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY_SERVICE_ROLE) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file');
    throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY_SERVICE_ROLE, // SECRET_KEY!
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default supabase;