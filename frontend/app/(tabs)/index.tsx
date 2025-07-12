import { Text, View, BackHandler, Alert, TouchableOpacity } from "react-native";
import "../globals.css";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFileContract,
  faUtensils,
  faGlobe,
  faCoins,
  faShoePrints,
  faHome,
  faTrain,
  faCalendarAlt,
  faClock,
  faStar,
  faSeedling,
  faInfo,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

export default function Index() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Exit app or show confirmation
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // 👈 prevents default tab back navigation
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  const handleInfoPress = () => {
    alert("ここにはないよ");
  };

  return (
    <View className="flex-1 bg-[#b1b1b1] ">
      <View className="flex-1 absolute top-0 bottom-0 left-0 right-0 text-center gap-1 py-[10px] px-[10px] items-center">
        <View className={`bg-[#e4e3e3] w-full rounded-lg flex-1 p-2`}>
          <View className="flex-row justify-between items-center gap-3 px-2 py-4">
            <View className="flex-row gap-3 items-center">
              <View>
                <FontAwesomeIcon icon={faBuilding} size={32} color="blue" />
              </View>
              <Text className="text-2xl font-bold">hyMatch_job_01</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleInfoPress()}
              className="justify-center items-center p-2 rounded-full bg-[#c29c70]"
            >
              <FontAwesomeIcon icon={faInfo} size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View className="gap-5 mt-2 flex-1 justify-evenly border border-[#c29c70] rounded-2xl p-3">
            <View className="flex-row items-center justify-between gap-3 px-3 ">
              <View className="flex-row items-center gap-3">
                <View>
                  <FontAwesomeIcon
                    icon={faFileContract}
                    size={32}
                    color="blue"
                  />
                </View>
                <View>
                  <Text className="text-lg font-bold">調理</Text>
                </View>
              </View>
              <View className="p-3 border border-[#c29c70] rounded-full">
                <FontAwesomeIcon icon={faUtensils} size={24} color="blue" />
              </View>
            </View>

            <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

            <View className="flex-row items-center justify-between gap-3 py-2 px-3 ">
              <View className="w-[60%] flex-row items-center gap-3">
                <View>
                  <FontAwesomeIcon icon={faCoins} size={32} color="blue" />
                </View>
                <View>
                  <Text className="text-md font-bold">¥1,030 - ¥1,130</Text>
                </View>
              </View>
              <View className="w-[1px] border border-l-[#c29c70] border-r-0 h-[150%] "></View>
              <View className="w-[39%] flex-row items-center gap-3">
                <View>
                  <FontAwesomeIcon icon={faGlobe} size={32} color="blue" />
                </View>
                <View>
                  <Text className="text-lg font-bold">N3</Text>
                </View>
              </View>
            </View>

            <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

            <View className="flex-row items-center justify-between gap-3 py-2 px-3 ">
              <View className="w-[60%] flex-row items-center gap-4">
                <View>
                  <FontAwesomeIcon icon={faHome} size={32} color="blue" />
                  <View
                    style={{ transform: [{ rotate: "-90deg" }] }}
                    className="absolute -bottom-3 -right-3 bg-white p-1 rounded-full"
                  >
                    <FontAwesomeIcon
                      icon={faShoePrints}
                      size={15}
                      color="blue"
                    />
                  </View>
                </View>
                <View>
                  <Text className="text-lg font-bold">?分</Text>
                </View>
              </View>
              <View className="w-[1px] border border-l-[#c29c70] border-r-0 h-[150%] "></View>
              <View className="w-[39%] flex-row items-center gap-3">
                <View>
                  <FontAwesomeIcon icon={faTrain} size={32} color="blue" />
                </View>
                <View>
                  <Text className="text-lg font-bold">?分</Text>
                </View>
              </View>
            </View>

            <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

            <View className="flex-row items-center justify-between gap-3 px-4 ">
              <View>
                <FontAwesomeIcon icon={faCalendarAlt} size={32} color="blue" />
              </View>
              <View>
                <View className="flex-row items-center gap-1">
                  <View className="justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70]">
                    <Text className="text-sm font-bold">月</Text>
                  </View>
                  <View className="justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70]">
                    <Text className="text-sm font-bold">火</Text>
                  </View>
                  <View className="justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70]">
                    <Text className="text-sm font-bold">水</Text>
                  </View>
                  <View className="justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70]">
                    <Text className="text-sm font-bold">木</Text>
                  </View>
                  <View className="justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70]">
                    <Text className="text-sm font-bold">金</Text>
                  </View>
                  <View className="justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70]">
                    <Text className="text-sm font-bold">土</Text>
                  </View>
                  <View className="justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70]">
                    <Text className="text-sm font-bold">土</Text>
                  </View>
                </View>
                <View className="w-full justify-center items-center flex-row gap-3">
                  <View>
                    <FontAwesomeIcon icon={faClock} size={20} color="blue" />
                  </View>
                  <View>
                    <Text className="text-lg">09:00 - 18:00</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

            <View className="flex-row justify-between gap-3 pb-2 px-4 items-center">
              <View>
                <FontAwesomeIcon icon={faStar} size={32} color="blue" />
              </View>
              <View className="border border-[#c29c70] rounded-md p-2 flex-1 flex-row items-center gap-2 flex-wrap">
                <View className="bg-[#c29c70] rounded-full p-1 w-[35px] justify-center items-center aspect-square">
                  <FontAwesomeIcon icon={faSeedling} size={20} color="#fff" />
                </View>
                <View className="bg-[#c29c70] rounded-full p-1 w-[35px] justify-center items-center aspect-square">
                  <FontAwesomeIcon icon={faSeedling} size={20} color="#fff" />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="transparent w-full" style={{ height: 70 }}></View>
      </View>
    </View>
  );
}
