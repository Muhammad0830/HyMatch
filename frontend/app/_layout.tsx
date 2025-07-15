import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { DataProvider } from "@/contexts/DataContext";
import '@/lib/fontawesome'; // adjust path if needed

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#000000");
  }, []);

  return (
    <DataProvider>
      <Stack>
        <StatusBar style="auto" backgroundColor="#000000" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DataProvider>
  );
}
