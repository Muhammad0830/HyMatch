import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, Easing } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

type SwiperProps = {
  data: any[];
  onSwipeLeft?: (job: any) => void;
  onSwipeRight?: (job: any) => void;
  renderCard: (job: any) => React.ReactNode;
};

export default function Swiper({
  data,
  renderCard,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
}: SwiperProps) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const currentItem = data[0];

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

  if (data.length <= 0) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 18, color: "gray" }}>No more cards</Text>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <Animated.View
            style={[likeOpacity]}
            className={
              "left-10 bg-transparent border-[5px] border-green-500 w-36 aspect-square absolute top-16 p-2.5 rounded-full z-10 justify-center items-center"
            }
          >
            <Text className="text-green-500 font-bold text-2xl">CHOOSE</Text>
          </Animated.View>
          <Animated.View
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
