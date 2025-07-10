import React, { useCallback } from "react";
import { BackHandler, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const Refused = () => {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/"); 
        return true; // prevent default
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );
  return (
    <View>
      <Text>refused</Text>
    </View>
  );
};

export default Refused;
