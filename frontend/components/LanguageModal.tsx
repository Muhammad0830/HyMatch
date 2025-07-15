import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import i18n from "@/i18";

const LanguageModal = ({
  langModalVisible,
  setlangModalVisible,
}: {
  langModalVisible: boolean;
  setlangModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const changeLanguage = async (lang: "en" | "ja" | "uz") => {
    await i18n.changeLanguage(lang);
  };
  return (
    <View className="absolute top-0 left-0">
      <Modal
        animationType="fade"
        transparent={true}
        visible={langModalVisible}
        onRequestClose={() => setlangModalVisible(false)} // Android back button
      >
        <View className="flex-1 justify-center w-full items-center bg-black/50">
          <View className="bg-white rounded-xl p-4 gap-3">
            <View className="flex-row items-center gap-3 justify-between">
              <Text className="text-lg font-bold">Langugage settings</Text>

              <TouchableOpacity
                className="bg-red-500 p-1.5 rounded-full"
                onPress={() => setlangModalVisible(false)}
              >
                <FontAwesomeIcon icon={faClose} size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <View className="border-0 border-b-[1px] border-black/30"></View>
              <TouchableOpacity
                onPress={() => {
                  changeLanguage("en");
                  setlangModalVisible(false);
                }}
                className="p-2 w-full items-center justify-center"
              >
                <Text>English</Text>
              </TouchableOpacity>
              <View className="border-0 border-b-[1px] border-black/30"></View>
              <TouchableOpacity
                onPress={() => {
                  changeLanguage("ja");
                  setlangModalVisible(false);
                }}
                className="p-2 w-full items-center justify-center"
              >
                <Text>日本語</Text>
              </TouchableOpacity>
              <View className="border-0 border-b-[1px] border-black/30"></View>
              <TouchableOpacity
                onPress={() => {
                  changeLanguage("uz");
                  setlangModalVisible(false);
                }}
                className="p-2 w-full items-center justify-center"
              >
                <Text>O&apos;zbekcha</Text>
              </TouchableOpacity>
              <View className="border-0 border-b-[1px] border-black/30"></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LanguageModal;
