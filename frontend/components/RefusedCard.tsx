import { Animated, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBellConcierge,
  faBroom,
  faChevronDown,
  faHotel,
  faIndustry,
  faTruck,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useData } from "@/contexts/DataContext";

export default function RefusedCard({ job, index }: any) {
  const typeIconMap: Record<string, any> = {
    utensils: faUtensils,
    bellConcierge: faBellConcierge,
    broom: faBroom,
    industry: faIndustry,
    truck: faTruck,
    hotel: faHotel,
  };

  const [expanded, setExpanded] = React.useState(false);
  const animation = React.useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();
  const { data, setData } = useData();

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 110],
  });

  const rotateInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const truthyCount = Object.values(job.workDay).filter(Boolean).length;
  const minLevel = job.japaneseLevel;

  return (
    <TouchableOpacity
      key={index}
      onPress={toggleExpand}
      activeOpacity={0.9}
      className="rounded-lg border border-[#c29c79] p-4 bg-white shadow-sm"
    >
      <View className="flex-row items-center">
        <View className="p-3 border border-[#c29c79] rounded-full justify-center items-center mr-3">
          <FontAwesomeIcon
            icon={typeIconMap[job.icon]}
            size={20}
            color="blue"
          />
        </View>

        <View className="flex-1">
          <Text className="font-bold text-base text-gray-800">{job.name}</Text>
          <Text className="text-sm text-gray-500">
            {t(`${job.nearStationName}`)}・{job.fromHome}
            {t("min")}
          </Text>
        </View>

        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <FontAwesomeIcon icon={faChevronDown} size={16} color="blue" />
        </Animated.View>
      </View>

      <Animated.View
        style={{
          overflow: "hidden",
          height: heightInterpolation,
        }}
      >
        <View className="flex-row justify-between items-center mb-2 px-1 pt-4">
          <Text className="text-sm text-gray-600">{t(`${job.type}`)}</Text>
          <Text className="text-sm text-gray-700 font-semibold">
            {job.payment}
          </Text>
        </View>

        <View className="flex-row justify-between items-center px-1">
          <Text className="text-sm text-gray-600">
            {t("Level")}: {minLevel}
          </Text>
          <Text className="text-sm text-gray-600">
            {t("days_per_week", { count: truthyCount })}
          </Text>
        </View>

        <View className="flex-row gap-2 mt-4">
          <TouchableOpacity
            className="flex-1 py-2 rounded-md border border-blue-500 items-center"
            onPress={() => {
              const RefusedData = data.RefusedData.filter(
                (Job: any) => Job.id !== job.id
              );
              const ChosenData = [...data.ChosenData, job];
              setData({ ...data, RefusedData, ChosenData });
            }}
          >
            <Text className="text-blue-500 font-medium">
              {t("ChooseAgain")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 py-2 rounded-md bg-red-500 items-center"
            onPress={() => {
              const RefusedData = data.RefusedData.filter(
                (Job: any) => Job.id !== job.id
              );
              setData({ ...data, RefusedData });
            }}
          >
            <Text className="text-white font-medium">{t("Delete")}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
