import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

// import * as SecureStore from 'expo-secure-store';

// Custom storage adapter untuk Expo SecureStore
// const ExpoSecureStoreAdapter = {
//   getItem: async (key: string) => {
//     return SecureStore.getItemAsync(key);
//   },
//   setItem: async (key: string, value: string) => {
//     return SecureStore.setItemAsync(key, value);
//   },
//   removeItem: async (key: string) => {
//     return SecureStore.deleteItemAsync(key);
//   },
// };

// const supabaseUrl = 'http://192.168.20.68:8001'; // e.g., http://192.168.1.x:8000
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzcwNzQyODAwLCJleHAiOjE5Mjg1MDkyMDB9.Y-nR9R9OSNYOZoUkNJxOKK7_NHIwAqUuoofnnGYz0Lo';

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_KEY_ANON;

const supabaseUrl = 'https://cmmhktsoucnypyzeaoka.supabase.co';
const supabaseAnonKey = 'sb_publishable_ruZT8Qy1P_3tos4ZA0cRNg_xwmzNOxz';

// Buat custom adapter yang memastikan token ter-stringified dengan benar
const customAsyncStorageAdapter = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value;
  },
  setItem: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // storage: ExpoSecureStoreAdapter,
    // storage: AsyncStorage,
    // autoRefreshToken: true,
    // persistSession: true,
    // detectSessionInUrl: false,
    // storage: AsyncStorage as any, // Menggunakan AsyncStorage untuk menyimpan sesi
    storage: customAsyncStorageAdapter,
    autoRefreshToken: true,        // Memperbarui token kedaluwarsa secara otomatis
    persistSession: true,          // Memastikan sesi tetap disimpan saat aplikasi diclose
    detectSessionInUrl: false,
  },
});

// Tambahkan listener ini di akhir file lib/supabase.ts agar siklus token sinkron dengan OS ponsel
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
  });