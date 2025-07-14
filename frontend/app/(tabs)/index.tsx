import {
  View,
  BackHandler,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import "../globals.css";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useData } from "@/contexts/DataContext";
import JobCard from "@/components/JobCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Data from "@/data.json";

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

  const { data, setData } = useData();

  return (
    <View className="flex-1 bg-[#b1b1b1]">
      {" "}
      {data.jobsData.length > 0 ? (
        data.jobsData.map((job: any, index: number) => {
          return <JobCard key={index} index={index} Job={job} />;
        })
      ) : (
        <View className="items-center mt-16">
          <Text className="text-2xl">no value</Text>
          <Text className="mt-20 text-2xl">should be changed soon</Text>
          <TouchableOpacity
            className="bg-white p-2 rounded-lg"
            onPress={() => {
              AsyncStorage.setItem("myData", JSON.stringify(Data));
              setData(Data);
            }}
          >
            <Text>Restart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
