import {
  View,
  BackHandler,
  Alert,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import "../globals.css";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { useData } from "@/contexts/DataContext";
import JobCard from "@/components/JobCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Data from "@/data.json";
import { faArrowLeftRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Swiper from "react-native-deck-swiper";

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
  const [allJobs] = useState<any[]>([...data.jobsData]);

  const rotate = useRef(new Animated.Value(0)).current;

  const handleRefresh = () => {
    const duration = 1500;
    Animated.timing(rotate, {
      toValue: -1080,
      duration: duration,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      AsyncStorage.setItem("myData", JSON.stringify(Data));
      setData(Data);

      rotate.setValue(0);
    }, duration);
  };

  const spin = rotate.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-1 bg-[#b1b1b1] z-0">
      {data.jobsData.length > 0 ? (
        <View className="w-full h-full z-10 bg-transparent">
          <Swiper
            cards={allJobs}
            renderCard={(job, index) => <JobCard Job={job} index={index} />}
            stackSize={3}
            stackSeparation={5}
            stackScale={5}
            verticalSwipe={false}
            cardStyle={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
            containerStyle={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            }}
            onSwiped={(index) => console.log("Swiped:", index)}
            onSwipedRight={(index) => {
              const job = allJobs[index];
              const jobsData = data.jobsData.filter(
                (Job: any) => Job.id !== job.id
              );
              const ChosenData = [...data.ChosenData, job];
              setData((prev: any) => {
                return { ...prev, ChosenData, jobsData };
              });
            }}
            onSwipedLeft={(index) => {
              const job = allJobs[index];
              const jobsData = data.jobsData.filter(
                (Job: any) => Job.id !== job.id
              );
              const RefusedData = [...data.RefusedData, job];
              setData((prev: any) => {
                return { ...prev, RefusedData, jobsData };
              });
            }}
            swipeAnimationDuration={250}
          />
        </View>
      ) : (
        <View className="items-center h-[83vh] px-1 justify-center">
          <Text className="text-xl">仕事が終わりました</Text>
          <Text className="mt-4 mb-2 text-lg">
            仕事が増えるまで、しばらくお待ちください
          </Text>
          <TouchableOpacity
            className="bg-blue-500 px-3 py-2 rounded-md flex-row gap-2 items-center"
            onPress={() => handleRefresh()}
          >
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <FontAwesomeIcon
                icon={faArrowLeftRotate}
                size={16}
                color="white"
              />
            </Animated.View>
            <Text className="text-white font-bold">リフレッシュ</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
