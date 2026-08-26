// import { Stack } from "expo-router";
// import { StatusBar } from 'expo-status-bar';

// export default function RootLayout() {
//   // return <Stack />;
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       <StatusBar style="auto" />
//     </Stack>
    
//   );
// }

import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments, usePathname } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase'; // Sesuaikan dengan path file konfigurasi Supabase Anda

// export default function RootLayout() {
//   const [session, setSession] = useState<Session | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const segments = useSegments();
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     // Fungsi untuk mengambil role dari user metadata atau table profile
//     const checkUserRole = async (currentSession: Session | null) => {
//       if (!currentSession) {
//         setRole(null);
//         setLoading(false);
//         return;
//       }

//       // Opsi 1: Mengambil dari user_metadata (jika Anda menyimpannya saat signup)
//       const userRole = currentSession.user?.user_metadata?.role || 'member';
      
//       /* 
//       // Opsi 2: Jika role disimpan di tabel database 'profiles', gunakan ini:
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('role')
//         .eq('id', currentSession.user.id)
//         .single();
//       const userRole = data?.role || 'member';
//       */

//       setRole(userRole);
//       setLoading(false);
//     };

//     // 1. Cek sesi saat aplikasi pertama kali dibuka
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       checkUserRole(session);
//     });

//     // 2. Pantau perubahan status auth (login/logout)
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       setSession(session);
//       await checkUserRole(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // useEffect(() => {
//   //   if (loading) return;

//   //   const inAuthGroup = segments[0] === '(auth)';
//   //   const inMemberGroup = segments[1] === '(member)';
//   //   const inAdminGroup = segments[1] === '(coach)';

//   //   if (!session) {
//   //     // Jika belum login dan tidak di folder auth, lempar ke login
//   //     if (!inAuthGroup) {
//   //       router.replace('/(auth)/signin');
//   //     }
//   //   } else {
//   //     // Jika sudah login, arahkan berdasarkan role
//   //     if (role === 'admin') {
//   //       // Jika admin berada di tempat salah, paksa ke dashboard admin
//   //       if (inAuthGroup || inMemberGroup || segments.length === 0 || segments[0] === 'index') {
//   //         router.replace('/(tabs)/(coach)/dashboard');
//   //       }
//   //     } else {
//   //       // Jika member (atau default) berada di tempat salah, paksa ke dashboard member
//   //       if (inAuthGroup || inAdminGroup || segments.length === 0 || segments[0] === 'index') {
//   //         router.replace('/(tabs)/(member)/dashboard');
//   //       }
//   //     }
//   //   }
//   // }, [session, role, loading, segments]);

//   useEffect(() => {
//     if (loading) return;

//     // Memeriksa segmen pertama secara aman dari array segments
//     const firstSegment = segments[0];
//     const inAuthGroup = firstSegment === '(auth)';
//     const inTabsGroup = firstSegment === '(tabs)';
    
//     // Memeriksa apakah user berada di root index '/'
//     const isAtRootIndex = pathname === '/' || pathname === '/index';

//     if (!session) {
//       // Jika belum login dan tidak di folder auth, paksa ke halaman login
//       // if (!inAuthGroup) {
//       //   router.replace('/(auth)/signin');
//       // }
//      // 1. KONDISI BELUM LOGIN
//       // Pengguna boleh di halaman index atau di folder auth. 
//       // Jika mencoba masuk ke area terproteksi (tabs), paksa kembali ke index atau login.
//       if (inTabsGroup) {
//         router.replace('/');
//       }
//     } else {
//       // 2. KONDISI SUDAH LOGIN
//       // Jika user sukses login dan masih berada di dalam folder auth, kembalikan ke halaman index
//       if (inAuthGroup) {
//         router.replace('/');
//       }
//       // Proteksi silang antar-role di dalam folder tabs
//       if (role === 'coach' && inTabsGroup && segments[1] === '(member)') {
//         router.replace('/(tabs)/(coach)/dashboard');
//       } else if (role === 'member' && inTabsGroup && segments[1] === '(coach)') {
//         router.replace('/(tabs)/(member)/dashboard');
//       }

//       // // Jika sudah login, arahkan berdasarkan role-nya
//       // if (role === 'admin') {
//       //   // Jika admin salah kamar (di auth atau di root index), lempar ke dashboard admin
//       //   if (inAuthGroup || isAtRootIndex || (inTabsGroup && segments[1] === '(member)')) {
//       //     router.replace('/(tabs)/(coach)/dashboard');
//       //   }
//       // } else {
//       //   // Jika member salah kamar (di auth, admin area, atau root index), lempar ke dashboard member
//       //   if (inAuthGroup || isAtRootIndex || (inTabsGroup && segments[1] === '(coach)')) {
//       //     router.replace('/(tabs)/(member)/dashboard');
//       //   }
//       // }
//     }
//   }, [session, role, loading, segments, pathname]);

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   const checkUserRole = async (currentSession: Session | null) => {
  //     if (!currentSession) {
  //       setRole(null);
  //       setLoading(false);
  //       return;
  //     }
  //     // Ambil role dari metadata, default ke 'member' jika kosong
  //     const userRole = currentSession.user?.user_metadata?.role || 'member';
  //     setRole(userRole);
  //     setLoading(false);
  //   };

  //   // 1. Ambil sesi awal
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //     checkUserRole(session);
  //   });

  //   // 2. Dengarkan perubahan auth
  //   const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
  //     setSession(session);
  //     await checkUserRole(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // useEffect(() => {
  //   if (loading) return;

  //   // Deteksi posisi halaman berdasarkan pathname string
  //   const isInsideAuth = pathname.startsWith('/(auth)');
  //   const isInsideTabs = pathname.startsWith('/(tabs)');
  //   const isInsideAdmin = pathname.includes('/(coach)');
  //   const isInsideMember = pathname.includes('/(member)');

  //   if (!session) {
  //     // KONDISI: BELUM LOGIN
  //     // Jika belum login dan nekat masuk ke area (tabs), tendang balik ke halaman utama '/'
  //     if (isInsideTabs) {
  //       router.replace('/');
  //     }
  //   } else {
  //     // KONDISI: SUDAH LOGIN
  //     // 1. Jika sudah login tapi masih di halaman login/register, kembalikan ke index '/'
  //     if (isInsideAuth) {
  //       router.replace('/');
  //     }

  //     // 2. Proteksi Silang Hak Akses (Role-Protection)
  //     if (role === 'coach') {
  //       // Jika admin salah kamar masuk ke area member, paksa ke dashboard admin
  //       if (isInsideMember) {
  //         router.replace('/(tabs)/(coach)/dashboard');
  //       }
  //     } else {
  //       // Jika member biasa mencoba masuk ke area admin, paksa ke dashboard member
  //       if (isInsideAdmin) {
  //         router.replace('/(tabs)/(member)/dashboard');
  //       }
  //     }
  //   }
  // }, [session, role, loading, pathname]);

  // 1. Ambil sesi secara mandiri saat aplikasi pertama kali dibuka
  useEffect(() => {
    async function loadStoredSession() {
      try {
        const { data: { session: storedSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.log("Error mengambil sesi simpanan:", error.message);
          setSession(null);
          setRole(null);
        } else if (storedSession) {
          console.log("mengambil sesi simpanan:", storedSession);
          console.log("mengambil sesi simpanan:", storedSession.user?.user_metadata?.role || 'member');
          setSession(storedSession);
          setRole(storedSession.user?.user_metadata?.role || 'member');
        }
      } catch (e) {
        console.error("Gagal total memuat AsyncStorage:", e);
      } finally {
        // HANYA matikan loading setelah pengecekan storage selesai sepenuhnya
        setLoading(false);
      }
    }

    loadStoredSession();

    // 2. Dengarkan perubahan status auth (HANYA UNTUK LOGIN & LOGOUT BARU)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        console.log("Session:", currentSession);
        console.log("mengambil sesi simpanan:", currentSession?.user?.user_metadata?.role || 'member');
        setSession(currentSession);
        setRole(currentSession?.user?.user_metadata?.role || 'member');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 3. Mengatur Arah Navigasi Berdasarkan Sesi Aktif
  useEffect(() => {
    if (loading) return;

    const isInsideAuth = pathname.startsWith('/(auth)');
    const isInsideTabs = pathname.startsWith('/(tabs)');
    const isInsideAdmin = pathname.includes('/(admin)');
    const isInsideMember = pathname.includes('/(member)');

    if (!session) {
      if (isInsideTabs) {
        console.log("Session:", isInsideTabs);
        router.replace('/');
      }
    } else {
      if (isInsideAuth) {
        console.log("Session:", isInsideAuth);
        router.replace('/');
      }

      // Proteksi Akses
      if (role === 'coach' && isInsideMember) {
        console.log("Session:", isInsideMember);
        router.replace('/(tabs)/(coach)/dashboard');
      } else if (role === 'member' && isInsideAdmin) {
        console.log("Session:", isInsideAdmin);
        router.replace('/(tabs)/(member)/dashboard');
      }
    }
  }, [session, role, loading, pathname]);

  if (loading) return null; // Bisa diganti dengan Splash Screen

  return <Slot />;
}