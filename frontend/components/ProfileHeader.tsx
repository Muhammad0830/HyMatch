import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import LanguageModal from "./LanguageModal";

const ProfileHeader = () => {
  const [langModalVisible, setlangModalVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <View className="h-[50px] w-full bg-white flex-row items-center justify-between px-4">
      <StatusBar backgroundColor={"#000000"} barStyle={"light-content"} />
      <TouchableOpacity
        onPress={() => setlangModalVisible(true)}
        className="justify-center items-center bg-[#c29c70] rounded-full p-1.5"
      >
        <FontAwesomeIcon icon={faGlobe} size={18} color="white" />
      </TouchableOpacity>
      <Text className="text-xl font-bold">{t("Profile")}</Text>
      <TouchableOpacity
        onPress={() => router.replace("/")}
        className="justify-center items-center bg-red-600 rounded-full p-1.5"
      >
        <FontAwesomeIcon icon={faClose} size={18} color="white" />
      </TouchableOpacity>

      <LanguageModal
        langModalVisible={langModalVisible}
        setlangModalVisible={setlangModalVisible}
      />
    </View>
  );
};

export default ProfileHeader;
