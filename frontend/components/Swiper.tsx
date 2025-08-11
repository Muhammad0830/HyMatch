import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { faArrowLeftRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTranslation } from "react-i18next";

const SCREEN_WIDTH = Dimensions.get("window").width;

type SwiperProps = {
  data: any[];
  onSwipeLeft?: (job: any) => void;
  onSwipeRight?: (job: any) => void;
  renderCard: (job: any) => React.ReactNode;
  handleReset: () => void;
};

export default function Swiper({
  data,
  renderCard,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  handleReset = () => {},
}: SwiperProps) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const { t } = useTranslation();

  const currentItem = data[0];
  const nextItem = data[1];

  const handleSwipe = (direction: "left" | "right") => {
    try {
      if (!currentItem) return;

      if (direction === "left") {
        onSwipeLeft(currentItem);
      } else {
        onSwipeRight(currentItem);
      }

      translateX.value = 0;
      rotate.value = 0;
    } catch (error) {
      console.error("Error in handleSwipe:", error);
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = interpolate(translateX.value, [-300, 300], [-20, 20]);
    })
    .onEnd(() => {
      if (translateX.value < -100) {
        translateX.value = withSpring(
          -SCREEN_WIDTH - 100,
          { duration: 500 },
          () => runOnJS(handleSwipe)("left")
        );
      } else if (translateX.value > 100) {
        translateX.value = withSpring(
          SCREEN_WIDTH + 100,
          { duration: 500 },
          () => runOnJS(handleSwipe)("right")
        );
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SCREEN_WIDTH / 2], [0, 1]),
  }));

  const nopeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SCREEN_WIDTH / 2, 0], [1, 0]),
  }));

  const rotating = useSharedValue(0);

  const spinStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotating.value}deg`,
        },
      ],
    };
  });

  const handleRefresh = () => {
    const duration = 1500;

    rotating.value = withTiming(-1080, { duration }, () => {
      runOnJS(handleReset)();
    });

    setTimeout(() => {
      rotating.value = 0;
    }, duration + 1000);
  };

  if (data.length <= 0) {
    return (
      <View className="items-center h-[83vh] px-4 justify-center">
        <Text className="text-xl text-center">{t("noJobLeft")}</Text>
        <Text className="mt-4 mb-2 text-xl text-center">
          {t("change Filter")}
        </Text>
        <Text className="mt-6 text-lg text-center">{t("resetFilter?")}</Text>
        <TouchableOpacity
          onPress={() => handleRefresh()}
          className="mt-2 bg-blue-500 px-3 py-2 rounded-md flex-row gap-2 items-center"
        >
          <Animated.View style={spinStyle}>
            <FontAwesomeIcon icon={faArrowLeftRotate} size={16} color="white" />
          </Animated.View>
          <Text className="text-white font-bold">{t("Reset")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {nextItem ? (
        <View>{renderCard(nextItem)}</View>
      ) : (
        <View className="items-center h-[83vh] px-4 justify-center">
          <Text className="text-xl text-center">{t("noJobLeft")}</Text>
          <Text className="mt-4 mb-2 text-xl text-center">
            {t("change Filter")}
          </Text>
          <Text className="mt-6 text-lg text-center">{t("resetFilter?")}</Text>
          <TouchableOpacity
            onPress={() => handleRefresh()}
            className="mt-2 bg-blue-500 px-3 py-2 rounded-md flex-row gap-2 items-center"
          >
            <Animated.View style={spinStyle}>
              <FontAwesomeIcon
                icon={faArrowLeftRotate}
                size={16}
                color="white"
              />
            </Animated.View>
            <Text className="text-white font-bold">{t("Reset")}</Text>
          </TouchableOpacity>
        </View>
      )}

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <Animated.View
            pointerEvents={"none"}
            style={[likeOpacity]}
            className={
              "left-10 bg-transparent border-[5px] border-green-500 w-36 aspect-square absolute top-16 p-2.5 rounded-full z-10 justify-center items-center"
            }
          >
            <Text className="text-green-500 font-bold text-2xl">CHOOSE</Text>
          </Animated.View>
          <Animated.View
            pointerEvents={"none"}
            style={[nopeOpacity]}
            className={
              "right-10 bg-transparent border-[5px] border-red-500 w-36 aspect-square absolute top-16 p-2.5 rounded-full z-10 justify-center items-center"
            }
          >
            <Text className="text-red-500 font-bold text-2xl">REFUSE</Text>
          </Animated.View>

          {renderCard(currentItem)}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: SCREEN_WIDTH,
    alignSelf: "center",
  },
  badge: {
    position: "absolute",
    top: 20,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  likeBadge: {
    left: 20,
    backgroundColor: "green",
  },
  nopeBadge: {
    right: 20,
    backgroundColor: "red",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
