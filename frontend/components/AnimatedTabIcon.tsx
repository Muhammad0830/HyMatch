import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClose,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function AnimatedTabIcon(props: any) {
  const onPress = props.onPress;
  const focused = props["aria-selected"];
  const isIndex = props.isIndex;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const translateY = useSharedValue(150);

  useEffect(() => {
    translateY.value = withTiming(focused ? 0 : 150, {
      duration: 200,
    });
  }, [focused, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: `${translateY.value}%`,
      },
    ],
  }));

  return (
    <TouchableOpacity
      onPress={
        isIndex
          ? () => {
              setIsModalOpen(true);
            }
          : onPress
      }
      className="h-full justify-center items-center"
    >
      <View className="w-14 h-12 justify-center items-center relative">
        <Animated.View
          className="absolute bg-blue-500 left-0 bottom-0 right-0 top-0 rounded-lg"
          style={animatedStyle}
        ></Animated.View>
        <FontAwesome
          name={props.icon}
          size={30}
          color={focused ? "white" : "blue"}
        />
      </View>

      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
        >
          <View className="flex-1 justify-center items-center">
            <Pressable
              onPress={() => setIsModalOpen(false)}
              className="bg-black/30 z-10 w-full h-full"
            ></Pressable>
            <View className="absolute bg-white z-20 rounded-lg p-4 min-w-64 gap-5">
              <View className="flex-row items-center gap-2 justify-between">
                <Text className="text-black font-bold text-lg">
                  {t("Mail or Call for a job")}
                </Text>
                <TouchableOpacity
                  onPress={() => setIsModalOpen(false)}
                  className="bg-red-500 p-1 rounded-full justify-center items-center"
                >
                  <FontAwesomeIcon icon={faClose} size={16} color="white" />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center gap-2 justify-between">
                <TouchableOpacity className="bg-blue-700 px-4 py-3 rounded-lg flex-row items-center gap-2">
                  <FontAwesomeIcon icon={faMailBulk} size={16} color="white" />
                  <Text className="text-white font-bold">{t("Mail")}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border border-blue-700 px-4 py-3 rounded-lg flex-row items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} size={16} color="blue" />
                  <Text className="text-blue-700 font-bold">{t("Call")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
}
