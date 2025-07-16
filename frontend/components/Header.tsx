import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { HeaderProps } from "@/interfaces/interfaces";
import LanguageModal from "./LanguageModal";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Header = ({ title, leftIcon, rightIcon, isIndexHeader }: HeaderProps) => {
  const translateX = useSharedValue(-150);
  const translateXSort = useSharedValue(150);
  const [langModalVisible, setlangModalVisible] = useState(false);
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      return () => {
        translateX.value = withTiming(-150, {
          duration: 0,
        });
        translateXSort.value = withTiming(150, {
          duration: 0,
        });
      };
    }, [translateX, translateXSort])
  );

  const handleBarsPress = () => {
    translateX.value = withTiming(translateX.value === -150 ? 0 : -150, {
      duration: 200,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: `${translateX.value}%`,
      },
    ],
  }));

  const handleSortPress = () => {
    translateXSort.value = withTiming(translateXSort.value === 150 ? 0 : 150, {
      duration: 200,
    });
  };

  const animatedStyleSort = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: `${translateXSort.value}%`,
      },
    ],
  }));

  return (
    <View
      style={{
        backgroundColor: "white",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingInline: 10,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity
          className={`w-[30px] aspect-square justify-center items-center rounded-full  bg-[${
            isIndexHeader ? "#c29c70" : "white"
          }]`}
          onPress={() => {
            if (!isIndexHeader) {
              router.push("/");
            } else {
              handleBarsPress();
            }
          }}
        >
          <FontAwesome
            name={leftIcon}
            size={20}
            color={isIndexHeader ? "#ffffff" : "#000000"}
          />
        </TouchableOpacity>
      </View>
      <Text style={{ color: "black", fontWeight: 700, fontSize: 16 }}>
        {t(`${title}`)}
      </Text>
      <View>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#c29c70",
            borderRadius: "50%",
          }}
          onPress={() => handleSortPress()}
        >
          <FontAwesome
            name={rightIcon}
            size={18}
            color={"#ffffff"}
            style={{ transform: [{ rotate: "90deg" }] }}
          />
        </TouchableOpacity>
      </View>
      {/* hamburger menu */}
      {isIndexHeader ? (
        <Animated.View
          className={`absolute z-20 border border-black border-l-transparent w-[85%] px-4 py-4 left-0 top-2 rounded-tr-lg rounded-br-lg bg-white`}
          style={animatedStyle}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold">{t("Menu")}</Text>
            <View>
              <TouchableOpacity
                onPress={() => handleBarsPress()}
                className="bg-[#c29c70] w-[30px] aspect-square rounded-full justify-center items-center"
              >
                <FontAwesome name="close" size={25} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-4 p-3 border rounded-md border-black/30 gap-2">
            <TouchableOpacity className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="user" size={20} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">{t("Profile")}</Text>
            </TouchableOpacity>
            <View className="bg-black/40 w-full h-[1px]"></View>
            <TouchableOpacity
              className="flex-row items-center gap-3"
              onPress={() => {
                setlangModalVisible(true);
                handleBarsPress();
              }}
            >
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesomeIcon icon={faGlobe} size={20} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">{t("LanguageSettings")}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : null}

      {/* sort menu */}
      <Animated.View
        className={`absolute z-20 border border-black border-r-0 rounded-tl-lg rounded-bl-lg w-[85%] px-4 py-4 right-0 top-2 rounded-tr-lg rounded-br-lg bg-white gap-4`}
        style={animatedStyleSort}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">{t("Sort")}</Text>
          <TouchableOpacity
            onPress={() => handleSortPress()}
            className="w-[30px] aspect-square rounded-full bg-[#c29c70] justify-center items-center"
          >
            <FontAwesome name="close" size={25} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <View className="border border-black/30 rounded-md p-3 gap-2">
          <TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="clock-o" size={20} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">{t("SortByTime")}</Text>
            </View>
          </TouchableOpacity>
          <View className="bg-black/40 w-full h-[1px]"></View>
          <TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="home" size={20} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">
                {t("SortByHome")}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="bg-black/40 w-full h-[1px]"></View>
          <TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="building" size={18} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">
                {t("SortBySchool")}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="bg-black/40 w-full h-[1px]"></View>
          <TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="calendar-check-o" size={20} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">{t("SortByDate")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-2xl font-bold">{t("Filter")}</Text>
        </View>
        <View className="border border-black/30 rounded-md p-3 gap-2">
          <TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="file-excel-o" size={18} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">{t("DesiredJobType")}</Text>
            </View>
          </TouchableOpacity>
          <View className="bg-black/40 w-full h-[1px]"></View>
          <TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="comments-o" size={20} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">{t("JapaneseLevel")}</Text>
            </View>
          </TouchableOpacity>
          <View className="bg-black/40 w-full h-[1px]"></View>
          <TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="clock-o" size={20} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">{t("WorkHoursRange")}</Text>
            </View>
          </TouchableOpacity>
          <View className="bg-black/40 w-full h-[1px]"></View>
          <TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                <FontAwesome name="star" size={20} color={"#fff"} />
              </View>
              <Text className="text-black font-bold text-lg">
                {t("Starred")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <LanguageModal
        langModalVisible={langModalVisible}
        setlangModalVisible={setlangModalVisible}
      />
    </View>
  );
};

export default Header;
