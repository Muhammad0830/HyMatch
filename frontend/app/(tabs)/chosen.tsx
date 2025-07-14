import React, { useCallback, useEffect } from "react";
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

const Chosen = () => {
  const router = useRouter();
  const { data } = useData();
  const [chosenData, setChosenData] = React.useState([]);

  useEffect(() => {
    setChosenData(data.ChosenData);
  }, [data]);

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
    }, [router])
  );

  if (chosenData) {
    return (
      <ScrollView className="flex-1 px-2 pt-4 pb-[70px] gap-2">
        {chosenData?.length > 0 ? (
          <View className="gap-2">
            {chosenData.map((job: any, index: number) => (
              <ChosenCard key={index} job={job} index={index} />
            ))}
          </View>
        ) : (
          <View className="w-full h-full min-h-[80vh] items-center flex-1 justify-center">
            <Text className="text-xl text-center">
              選ばれた仕事はありません。
            </Text>
            <Text className="text-center text-xl mb-2 mt-5">
              次のアクションは？
            </Text>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => router.replace("/")}
                className="px-2 py-1.5 rounded-md border border-blue-500 "
              >
                <Text className="text-blue-500 text-sm">メインページへ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.replace("/(tabs)/refused")}
                className="px-2 py-1.5 rounded-md bg-blue-500 "
              >
                <Text className="text-white text-sm">Refusalリストへ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
};

export default Chosen;
