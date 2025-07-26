import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFileContract,
  faUtensils,
  faGlobe,
  faCoins,
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
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import FontAwesomeIconWithInfo from "@/components/FontAwesomeIconWithInfo";
import BigInfoModal from "./BigInfoModal";

export default function JobCard({ Job }: any) {
  const { t } = useTranslation();
  const [bigInfoModalOpen, setBigInfoModalOpen] = useState(false);

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

  const minLevel = Job.japaneseLevel;

  return (
    <View className="top-5 w-full min-h-[90vh] text-center gap-1 py-[10px] px-[10px] items-center">
      <View className={`bg-white w-full rounded-2xl flex-1 p-2`}>
        <View className="flex-row justify-between items-center gap-3 px-2 py-4">
          <View className="flex-row gap-3 items-center">
            <View className="border border-[#c29c70] rounded-full justify-center items-center aspect-square">
              <FontAwesomeIconWithInfo
                icon={faBuilding}
                size={24}
                color="blue"
                hasInfo
              />
            </View>
            <Text className="text-2xl font-bold">{Job.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setBigInfoModalOpen(true)}
            className="justify-center items-center p-2 rounded-full bg-[#c29c70]"
          >
            <FontAwesomeIcon icon={faInfo} size={18} color="white" />
          </TouchableOpacity>
        </View>
        <View className="gap-5 mt-2 flex-1 justify-evenly border border-[#c29c70] rounded-2xl p-3">
          <View className="flex-row items-center justify-between gap-3">
            <View className="flex-row items-center gap-3">
              <View className="border border-[#c29c70] rounded-full justify-center items-center aspect-square">
                <FontAwesomeIconWithInfo
                  icon={faFileContract}
                  size={24}
                  color="blue"
                  hasInfo
                />
              </View>
              <View>
                <Text className="text-lg font-bold">{t(`${Job.type}`)}</Text>
              </View>
            </View>
            <View className="border border-[#c29c70] p-2.5 rounded-full justify-center items-center">
              <FontAwesomeIcon
                icon={typeIconMap[Job.icon]}
                size={24}
                color="blue"
              />
            </View>
          </View>

          <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

          <View className="flex-row items-center justify-between gap-3 py-2">
            <View className="w-[53%] flex-row items-center gap-3">
              <View className="border border-[#c29c70] rounded-full justify-center items-center aspect-square">
                <FontAwesomeIconWithInfo
                  icon={faCoins}
                  size={24}
                  color="blue"
                  hasInfo
                />
              </View>
              <View>
                <Text className="text-sm font-bold">{Job.payment}</Text>
              </View>
            </View>
            <View className="w-[1px] border border-l-[#c29c70] border-r-0 h-[150%] "></View>
            <View className="w-[46%] flex-row items-center gap-1">
              <View className="border border-[#c29c70] rounded-full justify-center items-center aspect-square">
                <FontAwesomeIconWithInfo
                  icon={faGlobe}
                  size={24}
                  color="blue"
                  hasInfo
                />
              </View>
              <View className="flex-1 items-center mr-2">
                <Text className="text-lg font-bold">{minLevel}</Text>
              </View>
            </View>
          </View>

          <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

          <View className="flex-row items-center justify-between gap-3 pr-3">
            <View className="w-[55%] flex-row items-center gap-4">
              <View className="border border-[#c29c70] rounded-full justify-center items-center aspect-square">
                <FontAwesomeIconWithInfo
                  icon={faHome}
                  size={24}
                  color="blue"
                  hasInfo
                />
              </View>
              <View>
                <Text className="text-lg font-bold">
                  ~{Job.fromHome}
                  {t("min")}
                </Text>
              </View>
            </View>
            <View className="w-[1px] border border-l-[#c29c70] border-r-0 h-[100%] "></View>
            <View className="w-[44%] flex-row items-center gap-1">
              <View className="border border-[#c29c70] rounded-full justify-center items-center aspect-square">
                <FontAwesomeIconWithInfo
                  icon={faTrain}
                  size={24}
                  color="blue"
                  hasInfo
                />
              </View>
              <View className="gap-1 flex-1 items-center">
                <View className="border border-[#c29c70] rounded-full p-1 justify-center items-center w-14 aspect-square">
                  <Text className="text-xs text-blue-700">
                    {Job.stationCode}
                  </Text>
                </View>
                <Text className="font-bold text-sm text-center">
                  {t(`${Job.nearStationName}`)}
                </Text>
              </View>
            </View>
          </View>

          <View className="border border-x-0 border-b-0 border-t-[#c29c70]"></View>

          <View className="flex-row items-center justify-between gap-3 pr-1">
            <View className="border border-[#c29c70] rounded-full justify-center items-center aspect-square">
              <FontAwesomeIconWithInfo
                icon={faCalendarAlt}
                size={24}
                color="blue"
                hasInfo
              />
            </View>
            <View>
              <View className="flex-row items-center gap-1">
                {Object.entries(Job.workDay).map(([key, value], index) => {
                  return (
                    <View
                      key={index}
                      className={`justify-center items-center rounded-full w-[29px] aspect-square border border-[#c29c70] ${
                        value ? "bg-[#c29c70]" : ""
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          value ? "text-white" : "text-[#c29c70]"
                        }`}
                      >
                        {t(`${key}`)}
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

          <View className="flex-row justify-between gap-3 pb-2 pr-1 items-center">
            <View className="border border-[#c29c70] rounded-full justify-center items-center aspect-square">
              <FontAwesomeIconWithInfo
                icon={faStar}
                size={24}
                color="blue"
                hasInfo
              />
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
      <View className="transparent w-full" style={{ height: 70 }}></View>

      <View>
        <BigInfoModal
          isBigInfoModalOpen={bigInfoModalOpen}
          setBigInfoModalOpen={setBigInfoModalOpen}
        />
      </View>
    </View>
  );
}
