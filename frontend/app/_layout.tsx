import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { DataProvider } from "@/contexts/DataContext";
import "@/lib/fontawesome";
import ProfileHeader from "@/components/ProfileHeader";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#000000");
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <DataProvider>
            <Stack>
              <StatusBar style="auto" backgroundColor="#000000" />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="profile/profile"
                options={{
                  headerShown: true,
                  title: "Profile",
                  header: () => <ProfileHeader />,
                }}
              />
            </Stack>
          </DataProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
