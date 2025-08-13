import {
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
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
import { useTranslation } from "react-i18next";
import { SwipeableCard } from "@/components/Swiper";

export default function Index() {
  const { data, setData, unSwipedJobs } = useData();
  const { t } = useTranslation();
  const [isExitModelOpen, setIsExitModelOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setIsExitModelOpen(true);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

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

  const addToChosen = () => {
    const job = unSwipedJobs[0];
    const jobsData = data.jobsData.filter((Job: any) => Job.id !== job.id);
    const ChosenData = [...data.ChosenData, job];
    setData((prev: any) => ({ ...prev, ChosenData, jobsData }));
  };

  const addToRefused = () => {
    const job = unSwipedJobs[0];
    const jobsData = data.jobsData.filter((Job: any) => Job.id !== job.id);
    const RefusedData = [...data.RefusedData, job];
    setData((prev: any) => ({ ...prev, RefusedData, jobsData }));
  };

  const visibleJobs = unSwipedJobs.slice(0, 3);

  if (visibleJobs.length === 0)
    return (
      <View className="items-center h-[83vh] px-1 justify-center">
        <Text className="text-xl">{t("noJobLeft")}</Text>
        <Text className="mt-4 mb-2 text-lg">{t("waitForJobs")}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-3 py-2 rounded-md flex-row gap-2 items-center"
          onPress={() => handleRefresh()}
        >
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <FontAwesomeIcon icon={faArrowLeftRotate} size={16} color="white" />
          </Animated.View>
          <Text className="text-white font-bold">{t("Refresh")}</Text>
        </TouchableOpacity>
      </View>
    );


  return (
    <View className="flex-1 bg-[#b1b1b1] z-0">
      <View className="w-full h-full z-10 relative bottom-3 flex justify-center items-center">
        {visibleJobs.map((job, index) => (
          <SwipeableCard
            key={job.id}
            onSwipeRight={addToChosen}
            onSwipeLeft={addToRefused}
            isTop={index === 0}
            zIndex={visibleJobs.length - index}
            style={{
                position: "absolute",
                width: "100%",
                height: 550,
                transform: [
                  { scale: 1 - index * 0.03 },
                  { translateY: index * 8 },
                ],}}
          >
            <JobCard Job={job} />
          </SwipeableCard>
        ))}
      </View>

      <View className="absolute top-0 left-0">
        <Modal
          animationType="fade"
          transparent={true}
          visible={isExitModelOpen}
          onRequestClose={() => setIsExitModelOpen(false)}
        >
          <View className="bg-black/30 h-screen justify-center items-center">
            <View className="bg-white p-3 rounded-lg min-w-60 gap-6">
              <Text className="text-lg font-bold">{t("exitApp")}</Text>
              <View className="flex-row justify-between gap-4 items-center">
                <TouchableOpacity
                  className="bg-blue-700 px-3 py-2 rounded-md"
                  onPress={() => setIsExitModelOpen(false)}
                >
                  <Text className="text-white">{t("Cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-700 px-3 py-2 rounded-md"
                  onPress={() => {
                    BackHandler.exitApp();
                    setIsExitModelOpen(false);
                  }}
                >
                  <Text className="text-white">{t("Exit")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
