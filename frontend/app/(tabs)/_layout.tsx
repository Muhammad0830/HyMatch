import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AnimatedTabIcon from "@/components/AnimatedTabIcon"; // adjust path as needed
import { TouchableOpacity, View } from "react-native";

export default function _layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarItemStyle: {
          height: 60,
        },
        tabBarStyle: {
          backgroundColor: "#c29c70",
          borderRadius: 10,
          marginHorizontal: 20,
          marginBottom: 12,
          height: 60,
          position: "absolute",
          bottom: 40,
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="refused"
        options={{
          title: "Refused",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name="trash" size={size} color={color} />
          ),
          tabBarButton: (props) => {
            return <AnimatedTabIcon {...props} icon="trash" />;
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name="phone" size={size} color={color} />
          ),
          tabBarButton: (props) => {
            return <AnimatedTabIcon {...props} icon="phone" />;
          },
        }}
      />
      <Tabs.Screen
        name="chosen"
        options={{
          title: "Chosen",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name="heart" size={size} color={color} />
          ),
          tabBarButton: (props) => {
            return <AnimatedTabIcon {...props} icon="heart" />;
          },
        }}
      />
    </Tabs>
  );
}
