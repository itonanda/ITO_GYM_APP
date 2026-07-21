import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function CoachLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="about_us" options={{ headerShown: false }} />
      <Stack.Screen name="setting" options={{ headerShown: false }} />
      <Stack.Screen name="edit_profile" options={{ headerShown: false }} />
      <Stack.Screen name="change_password" options={{ headerShown: false }} />
      {/* <StatusBar style="auto" /> */}
    </Stack>
    
  );
}
