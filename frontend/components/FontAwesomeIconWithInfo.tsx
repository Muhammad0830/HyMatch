import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClose,
  faHome,
  faInfo,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import {
  createIconsInfo,
  createStarIconConfig,
} from "@/constants/infoIconsData";

const FontAwesomeIconWithInfo = ({
  icon,
  size,
  color,
  hasInfo,
  className,
  onPress,
}: {
  icon: any;
  size: number;
  color: string;
  hasInfo?: boolean;
  className?: string;
  onPress?: () => void;
}) => {
  const { t } = useTranslation();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const jobTypes = ["調理", "接客", "清掃", "工場", "宅配", "ホテル"];

  const icons = createIconsInfo(t);
  const starIconConfig = createStarIconConfig(t);

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress();
        setIsInfoOpen(true);
      }}
      className={`${className} p-2.5 justify-center items-center`}
    >
      <FontAwesomeIcon icon={icon} size={size} color={color} />
      {hasInfo && (
        <View className="absolute -top-2 -right-2  border border-blue-700 bg-blue-100 p-1 rounded-full">
          <FontAwesomeIcon icon={faInfo} size={15} color="blue" />
        </View>
      )}
      {icon === faHome && (
        <View
          style={{ transform: [{ rotate: "-90deg" }] }}
          className="absolute -bottom-2 -right-2 border border-[#c29c70] bg-white p-1 rounded-full"
        >
          <FontAwesomeIcon icon={faShoePrints} size={15} color="blue" />
        </View>
      )}

      {/* Info Modal */}
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isInfoOpen}
          onRequestClose={() => setIsInfoOpen(false)}
        >
          <View className="flex-1 justify-center items-center">
            <View className="z-10 absolute min-w-[70vw] max-w-[75%] bg-white p-4 rounded-lg">
              <View className="flex-row items-center gap-2 justify-between">
                <Text className="text-xl font-bold">{t("Info")}</Text>
                <TouchableOpacity
                  onPress={() => setIsInfoOpen(false)}
                  className="bg-red-500 p-1 rounded-full justify-center items-center"
                >
                  <FontAwesomeIcon icon={faClose} size={16} color="white" />
                </TouchableOpacity>
              </View>
              <View>
                {icons.map((iconItem, index) => {
                  if (iconItem.name === icon.iconName) {
                    return (
                      <View key={index}>
                        <View className="gap-4 flex-row items-center mt-2">
                          <View className="border border-[#c29c70] w-[35px] rounded-full justify-center items-center aspect-square">
                            <FontAwesomeIcon
                              icon={iconItem.icon}
                              size={20}
                              color="blue"
                            />
                          </View>
                          <Text className="font-bold flex-wrap flex-1">
                            {iconItem.text}
                          </Text>
                        </View>
                        {iconItem.name === "file-contract" ? (
                          <View className="mt-2">
                            <Text className="text-md mb-2">
                              {t("jobTypesMessage", { count: jobTypes.length })}
                            </Text>
                            <View>
                              {jobTypes.map((type, index) => (
                                <View
                                  key={index}
                                  className={`flex-row items-center my-1`}
                                >
                                  <Text>
                                    {index + 1}. {t(type)}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        ) : iconItem.name === "star" ? (
                          <View className="mt-2">
                            <Text className="text-md mb-2">
                              {t("starMessage", {
                                count: starIconConfig.length,
                              })}
                            </Text>
                            <View>
                              {starIconConfig.map((config, index) => (
                                <View
                                  key={index}
                                  className={`flex-row items-center my-1 gap-2`}
                                >
                                  <View className="bg-[#c29c70] p-1.5 rounded-full justify-center items-center aspect-square">
                                    <FontAwesomeIcon
                                      icon={config.icon}
                                      size={20}
                                      color="white"
                                    />
                                  </View>
                                  <Text>{t(config.text)}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        ) : null}
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            </View>
            <Pressable
              onPress={() => setIsInfoOpen(false)}
              className="bg-black/30 w-full h-full flex-1 justify-center items-center"
            ></Pressable>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

export default FontAwesomeIconWithInfo;
