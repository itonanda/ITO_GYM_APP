import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY_ANON) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file');
    throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
}

// Instance 1: Koneksi Key Anon
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY_ANON) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file');
    throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
}

export const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY_ANON, // SECRET_KEY!
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Instance 2: Koneksi Key Service Role
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY_SERVICE_ROLE) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file');
    throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
}

export const supabaseServiceRole = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY_SERVICE_ROLE, // SECRET_KEY!
  {
    auth: {
    //  storage: localStorage,
    //  autoRefreshToken: true,
    //  persistSession: true,
    //  detectSessionInUrl: false,
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Instance 3: Koneksi Key Publishable
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY_PUBLISHABLE) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file');
    throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
}

export const supabasePublishable = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY_PUBLISHABLE , // SECRET_KEY!
  {
    auth: {
    //  storage: localStorage,
    //  autoRefreshToken: true,
    //  persistSession: true,
    //  detectSessionInUrl: false,
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Instance 4: Koneksi Key Secret
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY_SECRET) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file');
    throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
}

export const supabaseSecret = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY_SECRET, // SECRET_KEY!
  {
    auth: {
    //  storage: localStorage,
    //  autoRefreshToken: true,
    //  persistSession: true,
    //  detectSessionInUrl: false,
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Tambahkan Interceptor (Optional tapi disarankan)
// apiMain.interceptors.request.use(async config => {
//   // Misal: Ambil token dari AsyncStorage
//   // const token = await AsyncStorage.getItem('token');
//   // if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });