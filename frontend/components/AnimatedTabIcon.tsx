import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function AnimatedTabIcon(props: any) {
  const onPress = props.onPress;
  const focused = props["aria-selected"];

  const translateY = useSharedValue(150); // start at 150%

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
      onPress={onPress}
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
    </TouchableOpacity>
  );
}
