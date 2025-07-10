import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import "./globals.css";

export default function RootLayout() {
  SystemUI.setBackgroundColorAsync('black');

  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>;
}
