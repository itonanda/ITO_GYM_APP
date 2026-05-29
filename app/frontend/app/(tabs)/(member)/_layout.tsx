import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function MemberLayout() {
  // return <Stack />;
  return (
    <Stack>
      {/* <Stack.Screen name="(member)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="class_schedule" options={{ headerShown: false }} />
      <Stack.Screen name="class_detail" options={{ headerShown: false }} />
      <Stack.Screen name="class_detail_update" options={{ headerShown: false }} />
      <Stack.Screen name="booking_success" options={{ headerShown: false }} />
      <Stack.Screen name="booking_cancel" options={{ headerShown: false }} />
      <Stack.Screen name="booking_class" options={{ headerShown: false }} />
      <Stack.Screen name="membership" options={{ headerShown: false }} />
      <Stack.Screen name="membership_plan" options={{ headerShown: false }} />
      <Stack.Screen name="check_out" options={{ headerShown: false }} />
      <Stack.Screen name="check_out_payment_method" options={{ headerShown: false }} />
      <Stack.Screen name="check_out_qr" options={{ headerShown: false }} />
      <Stack.Screen name="check_out_gopay" options={{ headerShown: false }} />
      <Stack.Screen name="check_out_bca" options={{ headerShown: false }} />
      <Stack.Screen name="check_out_payment_success" options={{ headerShown: false }} />
      <Stack.Screen name="payment_history" options={{ headerShown: false }} />
      <Stack.Screen name="workout_of_the_day" options={{ headerShown: false }} />
      <Stack.Screen name="about_us" options={{ headerShown: false }} />
      <Stack.Screen name="leaderboard" options={{ headerShown: false }} />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="setting" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Stack>
    
  );
}
