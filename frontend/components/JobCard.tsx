import { Animated, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
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
  faBellConcierge,
  faBroom,
  faIndustry,
  faTruck,
  faHotel,
  faTrainSubway,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "@/contexts/DataContext";

export default function JobCard({ Job, index }: any) {
  const { data, setData } = useData();
  const translateX = useRef(new Animated.Value(0)).current;

  const handleInfoPress = () => {
    alert("ここにはないよ");
  };

  const typeIconMap: Record<string, any> = {
    utensils: faUtensils,
    bellConcierge: faBellConcierge,
    user: faBroom,
    phone: faIndustry,
    truck: faTruck,
    hotel: faHotel,
  };

  const starIconConfig = [
    {
      key: "nearStation",
      icon: faTrainSubway,
    },
    {
      key: "beginnerWelcome",
      icon: faSeedling,
    },
    {
      key: "salaryIncrease",
      icon: faArrowUp,
    },
    {
      key: "timeFlexiblity",
      icon: faClock,
    },
    {
      key: "5/7Workday",
      icon: faCalendarAlt,
    },
  ];

  const handleRefusePress = () => {
    Animated.timing(translateX, {
      toValue: -400,
      duration: 300,
      useNativeDriver: true,
    }).start();
    console.log("refuse", Job.id);
    const jobsData = data.jobsData.filter((job: any) => job.id !== Job.id);
    const RefusedData = [...data.RefusedData, Job];
    setTimeout(() => {
      setData({ ...data, jobsData, RefusedData });
    }, 300);
  };

  const handleChoosePress = () => {
    Animated.timing(translateX, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start();
    console.log("choose", Job.id);
    const jobsData = data.jobsData.filter((job: any) => job.id !== Job.id);
    const ChosenData = [...data.ChosenData, Job];
    setTimeout(() => {
      setData({ ...data, jobsData, ChosenData });
    }, 300);
  };

  return (
    <Animated.View
      style={{ transform: [{ translateX }] }}
      className="flex-1 absolute top-0 bottom-0 left-0 right-0 text-center gap-1 py-[10px] px-[10px] items-center"
    >
      <View className={`bg-[#e4e3e3] w-full rounded-lg flex-1 p-2`}>
        <View className="flex-row justify-between items-center gap-3 px-2 py-4">
          <View className="flex-row gap-3 items-center">
            <View
              style={{ padding: 20 }}
              className="border border-[#c29c70] rounded-full w-[35px] justify-center items-center aspect-square"
            >
              <FontAwesomeIcon icon={faBuilding} size={24} color="blue" />
            </View>
            <Text className="text-2xl font-bold">{Job.name}</Text>
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
              <View
                style={{ padding: 20 }}
                className="border border-[#c29c70] rounded-full w-[35px] justify-center items-center aspect-square"
              >
                <FontAwesomeIcon icon={faFileContract} size={24} color="blue" />
              </View>
              <View>
                <Text className="text-lg font-bold">{Job.type}</Text>
              </View>
            </View>
            <View className="p-3 border border-[#c29c70] rounded-full justify-center items-center">
              <FontAwesomeIcon
                icon={typeIconMap[Job.icon]}
                size={24}
                color="blue"
              />
            </View>
          </View>

          <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

          <View className="flex-row items-center justify-between gap-3 py-2 px-3 ">
            <View className="w-[55%] flex-row items-center gap-3">
              <View
                style={{ padding: 20 }}
                className="border border-[#c29c70] rounded-full w-[35px] justify-center items-center aspect-square"
              >
                <FontAwesomeIcon icon={faCoins} size={24} color="blue" />
              </View>
              <View>
                <Text className="text-sm font-bold">{Job.price}</Text>
              </View>
            </View>
            <View className="w-[1px] border border-l-[#c29c70] border-r-0 h-[150%] "></View>
            <View className="w-[44%] flex-row items-center gap-3">
              <View
                style={{ padding: 20 }}
                className="border border-[#c29c70] rounded-full w-[35px] justify-center items-center aspect-square"
              >
                <FontAwesomeIcon icon={faGlobe} size={24} color="blue" />
              </View>
              <View>
                <Text className="text-lg font-bold">{Job.minLangLevel}</Text>
              </View>
            </View>
          </View>

          <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

          <View className="flex-row items-center justify-between gap-3 px-3 ">
            <View className="w-[55%] flex-row items-center gap-4">
              <View
                style={{ padding: 20 }}
                className="border border-[#c29c70] rounded-full w-[35px] justify-center items-center aspect-square"
              >
                <FontAwesomeIcon icon={faHome} size={24} color="blue" />
                <View
                  style={{ transform: [{ rotate: "-90deg" }] }}
                  className="absolute -bottom-2 -right-2 border border-[#c29c70] bg-white p-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faShoePrints} size={15} color="blue" />
                </View>
              </View>
              <View>
                <Text className="text-lg font-bold">{Job.fromHome}分</Text>
              </View>
            </View>
            <View className="w-[1px] border border-l-[#c29c70] border-r-0 h-[100%] "></View>
            <View className="w-[44%] flex-row items-center gap-3">
              <View
                style={{ padding: 20 }}
                className="border border-[#c29c70] rounded-full w-[35px] justify-center items-center aspect-square"
              >
                <FontAwesomeIcon icon={faTrain} size={24} color="blue" />
              </View>
              <View className="gap-1">
                <View className="border border-[#c29c70] rounded-full p-1 justify-center items-center aspect-square">
                  <Text className="text-xs text-blue-700">
                    {Job.stationCode}
                  </Text>
                </View>
                <Text className="font-bold">{Job.nearStationName}</Text>
              </View>
            </View>
          </View>

          <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

          <View className="flex-row items-center justify-between gap-3 px-4 ">
            <View
              style={{ padding: 20 }}
              className="border border-[#c29c70] rounded-full w-[35px] justify-center items-center aspect-square"
            >
              <FontAwesomeIcon icon={faCalendarAlt} size={24} color="blue" />
            </View>
            <View>
              <View className="flex-row items-center gap-1">
                {Object.entries(Job.workDay).map(([key, value], index) => {
                  return (
                    <View
                      key={index}
                      className={`justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70] ${value ? "bg-[#c29c70]" : ""}`}
                    >
                      <Text
                        className={`text-xs font-bold ${value ? "text-white" : "text-[#c29c70]"}`}
                      >
                        {key}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View className="w-full justify-center items-center flex-row gap-3">
                <View>
                  <FontAwesomeIcon icon={faClock} size={20} color="blue" />
                </View>
                <View>
                  <Text className="text-lg">{Job.time}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

          <View className="flex-row justify-between gap-3 pb-2 px-4 items-center">
            <View
              style={{ padding: 20 }}
              className="border border-[#c29c70] rounded-full w-[35px] justify-center items-center aspect-square"
            >
              <FontAwesomeIcon icon={faStar} size={24} color="blue" />
            </View>
            <View className="border border-[#c29c70] rounded-md p-2 flex-1 flex-row items-center gap-2 flex-wrap">
              {starIconConfig
                .filter((config) => Job.star[config.key])
                .map((config, index) => (
                  <View
                    key={index}
                    className="bg-[#c29c70] rounded-full p-1 w-[35px] justify-center items-center aspect-square"
                  >
                    <FontAwesomeIcon
                      icon={config.icon}
                      size={20}
                      color="#fff"
                    />
                  </View>
                ))}
            </View>
          </View>
        </View>
      </View>
      <View className="transparent w-full" style={{ height: 70 }}>
        <TouchableOpacity
          onPress={() => handleRefusePress()}
          className="absolute bottom-[90%] left-0 w-20 rounded-full border border-[#c29c70] bg-white px-2 py-4 justify-center items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChoosePress()}
          className="absolute bottom-[90%] right-0 w-20 rounded-full border border-[#c29c70] bg-white px-2 py-4 justify-center items-center"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
