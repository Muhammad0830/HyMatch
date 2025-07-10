import { Text, View, BackHandler, Alert } from "react-native";
import "../globals.css";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Index() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Exit app or show confirmation
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // 👈 prevents default tab back navigation
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  return (
    <View className="flex-1 text-center bg-[#2b2a2a] items-center justify-center">
      <Text className="text-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
