import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="forgot_password" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Stack>
    
  );
}
