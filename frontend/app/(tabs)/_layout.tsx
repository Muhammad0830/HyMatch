import React from "react";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="chosen"
        options={{
          title: "Chosen",
        }}
      />
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="refused" options={{ title: "Refused" }} />
    </Tabs>
  );
};

export default _layout;
