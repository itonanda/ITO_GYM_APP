import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function CoachLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      {/* <StatusBar style="auto" /> */}
    </Stack>
    
  );
}
