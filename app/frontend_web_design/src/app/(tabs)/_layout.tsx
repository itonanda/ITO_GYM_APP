import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="coaches" options={{ headerShown: false }} />
      <Stack.Screen name="members" options={{ headerShown: false }} />
      <Stack.Screen name="membership" options={{ headerShown: false }} />
      <Stack.Screen name="membership_plan" options={{ headerShown: false }} />
      <Stack.Screen name="membership_leave" options={{ headerShown: false }} />
      <Stack.Screen name="membership_quota" options={{ headerShown: false }} />
      <Stack.Screen name="membership_status" options={{ headerShown: false }} />
      <Stack.Screen name="membership_type" options={{ headerShown: false }} />
      <Stack.Screen name="class" options={{ headerShown: false }} />
      <Stack.Screen name="class_booking" options={{ headerShown: false }} />
      <Stack.Screen name="class_status" options={{ headerShown: false }} />
      <Stack.Screen name="class_name" options={{ headerShown: false }} />




      
      
      <Stack.Screen name="inventory" options={{ headerShown: false }} />
      <Stack.Screen name="news" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="promos" options={{ headerShown: false }} />
      <Stack.Screen name="report" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Stack>
  );
}
