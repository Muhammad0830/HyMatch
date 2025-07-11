import React from "react";
import { Tabs } from "expo-router";
import AnimatedTabIcon from "@/components/AnimatedTabIcon"; // adjust path as needed
import { StatusBar } from "react-native";
import Header from "@/components/Header";

export default function _layout() {
  return (
    <>
      <StatusBar backgroundColor={"#000000"} barStyle={"light-content"} />
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
            bottom: 0 ,
            overflow: "hidden",
          },
        }}
      >
        <Tabs.Screen
          name="refused"
          options={{
            title: "Refused",
            header: () => {
              return (
                <Header
                  leftIcon="mail-reply"
                  title="Refusal リスト"
                  rightIcon="sliders"
                />
              );
            },
            tabBarButton: (props) => {
              return <AnimatedTabIcon {...props} icon="trash" />;
            },
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            header: () => {
              return (
                <Header
                  isIndexHeader
                  leftIcon="bars"
                  title="仕事一覧"
                  rightIcon="sliders"
                />
              );
            },
            tabBarButton: (props) => {
              return <AnimatedTabIcon {...props} icon="phone" />;
            },
          }}
        />
        <Tabs.Screen
          name="chosen"
          options={{
            title: "Chosen",
            header: () => {
              return (
                <Header
                  leftIcon="mail-reply"
                  title="Choose リスト"
                  rightIcon="sliders"
                />
              );
            },
            tabBarButton: (props) => {
              return <AnimatedTabIcon {...props} icon="heart" />;
            },
          }}
        />
      </Tabs>
    </>
  );
}
