import { View, BackHandler, Alert } from "react-native";
import "../globals.css";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useData } from "@/contexts/DataContext";
import JobCard from "@/components/JobCard";

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

  const { data } = useData();

  return (
    <View className="flex-1 bg-[#b1b1b1] ">
      {data.jobsData.map((job: any, index: number) => {
        return <JobCard key={index} index={index} Job={job} />;
      })}
    </View>
  );
}
