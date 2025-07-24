import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";

type Props = {
  label: string;
  value: string | number | null;
  options: (string | number)[];
  onChange: (val: string | number) => void;
  isLabel?: boolean;
  className?: string;
  buttonClassName?: string;
};

export const SelectInput = ({
  label,
  value,
  options,
  onChange,
  isLabel,
  className,
  buttonClassName,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  return (
    <View className={className}>
      {isLabel && <Text className="mb-1 font-semibold">{label}</Text>}
      <TouchableOpacity
        className={buttonClassName}
        onPress={() => setModalVisible(true)}
      >
        {value ? (
          <Text className="text-base text-black font-bold">
            {value.toString()}
          </Text>
        ) : (
          <Text className="text-base text-gray-600">{t("Select...")}</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-center bg-black/50 px-5"
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View className="bg-white rounded-lg max-h-[50%]">
            <FlatList
              data={options}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <Pressable
                  className="p-4 border-b border-gray-200"
                  onPress={() => {
                    onChange(item);
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-base">{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
