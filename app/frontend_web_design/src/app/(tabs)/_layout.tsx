import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="plan" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="inventory" options={{ headerShown: false }} />
      <Stack.Screen name="membership" options={{ headerShown: false }} />
      <Stack.Screen name="coaches" options={{ headerShown: false }} />
      <Stack.Screen name="report" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Stack>
  );
}
