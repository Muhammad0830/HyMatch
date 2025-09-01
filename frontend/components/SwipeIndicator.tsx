import React from "react";
import { Text, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { cn } from "@/lib/cn";

interface SwipeIndicatorProps {
  type: "left" | "right";
  style?: ViewStyle;
  className?: string;
}

export function SwipeIndicator({ type, style }: SwipeIndicatorProps) {
  const isRight = type === "right";

  return (
    <Animated.View
      style={style}
      className={cn(
        "absolute top-[10%] z-[100] pointer-events-none -translate-y-[60px] opacity-0",
        isRight ? "left-5" : "right-5"
      )}
    >
      <Animated.View
        className={cn(
          "w-[140px] h-[140px] rounded-full border-[6px] items-center justify-center bg-transparent",
          isRight ? "border-[#3DDC84] left-3" : "border-[#E53935] right-3"
        )}
      >
        <Text
          className={cn(
            "text-[28px] font-bold font-inter-bold shadow-black shadow-md",
            isRight ? "text-[#3DDC84]" : "text-[#E53935]"
          )}
          style={{
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 6,
          }}
        >
          {isRight ? "Choose" : "Refusal"}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
