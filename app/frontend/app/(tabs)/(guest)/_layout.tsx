import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function GuestLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="class_schedule" options={{ headerShown: false }} />
      <Stack.Screen name="class_detail" options={{ headerShown: false }} />
      <Stack.Screen name="membership_plan" options={{ headerShown: false }} />
      <Stack.Screen name="workout_of_the_day" options={{ headerShown: false }} />
      {/* <StatusBar style="auto" /> */}
    </Stack>
    
  );
}
