import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="members" options={{ headerShown: false }} />
      <Stack.Screen name="members_plan" options={{ headerShown: false }} />
      <Stack.Screen name="members_leave" options={{ headerShown: false }} />
      <Stack.Screen name="members_quota" options={{ headerShown: false }} />
      <Stack.Screen name="members_status" options={{ headerShown: false }} />
      <Stack.Screen name="members_type" options={{ headerShown: false }} />
      <Stack.Screen name="coaches" options={{ headerShown: false }} />
      <Stack.Screen name="class" options={{ headerShown: false }} />
      <Stack.Screen name="class_booking" options={{ headerShown: false }} />
      <Stack.Screen name="class_schedule" options={{ headerShown: false }} />
      <Stack.Screen name="class_status" options={{ headerShown: false }} />
      <Stack.Screen name="class_title" options={{ headerShown: false }} />
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
