import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createIconsInfo } from "@/constants/infoIconsData";

const BigInfoModal = ({
  isBigInfoModalOpen,
  setBigInfoModalOpen,
}: {
  isBigInfoModalOpen: boolean;
  setBigInfoModalOpen: (value: boolean) => void;
}) => {
  const { t } = useTranslation();

  const icons = createIconsInfo(t);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isBigInfoModalOpen}
      onRequestClose={() => setBigInfoModalOpen(false)}
    >
      <View className="flex-1 justify-center items-center">
        <View className="absolute bg-white min-w-[70vw] max-h-[70vh] p-4 rounded-lg z-10">
          <View className="flex-row items-center gap-2 justify-between mb-2">
            <Text className="text-xl font-bold">
              {t("All info about icons")}
            </Text>
            <TouchableOpacity
              onPress={() => setBigInfoModalOpen(false)}
              className="bg-red-500 rounded-full p-1"
            >
              <FontAwesomeIcon icon={faClose} size={20} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView className="h-[57vh]">
            <View className="justify-center h-[57vh]">
              {icons.map((iconItem, index, array) => (
                <View key={index}>
                  <View className="gap-4 flex-row items-center my-2">
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
                  {index === array.length - 1 ? null : (
                    <View className="border-t border-black/30 w-full self-center"></View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <Pressable
          onPress={() => setBigInfoModalOpen(false)}
          className="bg-black/30 w-full h-full"
        ></Pressable>
      </View>
    </Modal>
  );
};

export default BigInfoModal;
