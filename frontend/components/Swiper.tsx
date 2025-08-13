import React from "react";
import { View, ViewStyle } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
} from "react-native-reanimated";
import { SwipeIndicator } from "./SwipeIndicator";

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  isTop: boolean;
  zIndex: number;
  style?: ViewStyle;
}

const SWIPE_THRESHOLD = 100;
const CARD_WIDTH = 300;

export function SwipeableCard({
  children,
  onSwipeRight,
  onSwipeLeft,
  isTop,
  zIndex,
  style,
}: SwipeableCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
        rotation.value = interpolate(
          event.translationX,
          [-CARD_WIDTH, 0, CARD_WIDTH],
          [-15, 0, 15]
        );
      },
      onEnd: (event) => {
        const shouldSwipeRight = event.translationX > SWIPE_THRESHOLD;
        const shouldSwipeLeft = event.translationX < -SWIPE_THRESHOLD;

        if (shouldSwipeRight) {
          translateX.value = withSpring(CARD_WIDTH * 2);
          translateY.value = withSpring(event.translationY);
          runOnJS(onSwipeRight)();
        } else if (shouldSwipeLeft) {
          translateX.value = withSpring(-CARD_WIDTH * 2);
          translateY.value = withSpring(event.translationY);
          runOnJS(onSwipeLeft)();
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
          rotation.value = withSpring(0);
        }

        scale.value = withSpring(1);
      },
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const rightIndicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      "clamp"
    ),
  }));

  const leftIndicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      "clamp"
    ),
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} enabled={isTop}>
      <Animated.View
        style={[animatedStyle, style, { zIndex }]}
        className="flex-1"
        pointerEvents="box-none"
      >
        <View className="flex-1 justify-center items-center">{children}</View>

        {/* SWIPE RIGHT → CHOOSE */}
        <SwipeIndicator
          type="right"
          style={rightIndicatorStyle}
          className="absolute top-[50px] left-5"
        />

        {/* SWIPE LEFT → REFUSAL */}
        <SwipeIndicator
          type="left"
          style={leftIndicatorStyle}
          className="absolute top-[50px] right-5"
        />
      </Animated.View>
    </PanGestureHandler>
  );
}
