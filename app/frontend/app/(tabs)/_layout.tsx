import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="DashboardScreen" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Stack>
    
  );
}
