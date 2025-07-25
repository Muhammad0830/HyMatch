import React, { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useData } from "@/contexts/DataContext";
import ChosenCard from "@/components/ChosenCard";
import { useTranslation } from "react-i18next";

const Chosen = () => {
  const router = useRouter();
  const { filteredChosen } = useData();
  const [chosenData, setChosenData] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setChosenData(filteredChosen);
  }, [filteredChosen]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [router])
  );

  if (chosenData) {
    return (
      <ScrollView className="flex-1 px-2 pt-4 gap-2">
        <View className="flex-1 pb-[100px]">
          {chosenData?.length > 0 ? (
            <View className="gap-2">
              {chosenData.map((job: any, index: number) => (
                <ChosenCard key={index} job={job} index={index} />
              ))}
            </View>
          ) : (
            <View className="w-full h-full min-h-[80vh] items-center flex-1 justify-center">
              <Text className="text-xl text-center">{t("noChosen")}</Text>
              <Text className="text-center text-xl mb-2 mt-5">
                {t("nextAction?")}
              </Text>
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={() => router.replace("/")}
                  className="px-2 py-1.5 rounded-md border border-blue-500 "
                >
                  <Text className="text-blue-500 text-sm">{t("mainPage")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.replace("/(tabs)/refused")}
                  className="px-2 py-1.5 rounded-md bg-blue-500 "
                >
                  <Text className="text-white text-sm">{t("refusalList")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
};

export default Chosen;
