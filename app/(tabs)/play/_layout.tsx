import { Stack } from "expo-router";

export default function PlayLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[practiceTool]" options={{ headerShown: false }} />
    </Stack>
  );
}

