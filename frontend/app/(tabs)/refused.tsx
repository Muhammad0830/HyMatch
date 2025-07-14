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
import RefusedCard from "@/components/RefusedCard";

const Refused = () => {
  const router = useRouter();
  const { data } = useData();
  const [refusedData, setRefusedData] = React.useState([]);

  useEffect(() => {
    setRefusedData(data.RefusedData);
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

  console.log("refusedData", refusedData.length);

  if (refusedData) {
    return (
      <ScrollView className="flex-1 px-2 pt-4 pb-[70px] gap-2">
        {refusedData?.length > 0 ? (
          <View className="gap-2">
            {refusedData.map((job: any, index: number) => (
              <RefusedCard key={index} job={job} index={index} />
            ))}
          </View>
        ) : (
          <View className="w-full h-full min-h-[80vh] items-center flex-1 justify-center">
            <Text className="text-xl text-center">
              Refuseされた仕事はありません。
            </Text>
            <Text className="text-center text-xl mb-2 mt-5">
              次のアクションは？
            </Text>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="px-2 py-1.5 rounded-md border border-blue-500 ">
                <Text className="text-blue-500 text-sm">メインページへ</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-2 py-1.5 rounded-md bg-blue-500 ">
                <Text className="text-white text-sm">Chooseリストへ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
};

export default Refused;
