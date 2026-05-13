import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function TabsLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="(guest)" options={{ headerShown: false }} />
      <Stack.Screen name="(member)" options={{ headerShown: false }} />
      {/* <StatusBar style="auto" /> */}
    </Stack>
    
  );
}
