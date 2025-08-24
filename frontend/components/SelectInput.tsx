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
  options: (string | number)[] | any;
  onChange: (val: string | number) => void;
  isLabel?: boolean;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
};

export const SelectInput = ({
  label,
  value,
  options,
  onChange,
  isLabel,
  className,
  buttonClassName,
  disabled,
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
          <Text className="text-base text-black">{value.toString()}</Text>
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
            {disabled ? (
              <View className="p-4 rounded-md">
                <Text>{t("please select a previous value first")}</Text>
              </View>
            ) : (
              <FlatList
                data={options}
                keyExtractor={(item, index) =>
                  typeof item === "string" || typeof item === "number"
                    ? item.toString()
                    : (item.value?.toString() ?? index.toString())
                }
                renderItem={({ item }) => (
                  <Pressable
                    className="p-4 border-b border-gray-200"
                    onPress={() => {
                      onChange(typeof item === "object" ? item.value : item);
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-base">
                      {t(
                        `${typeof item === "object" ? item.label : item.toString()}`
                      )}
                    </Text>
                  </Pressable>
                )}
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
