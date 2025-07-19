import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { FilterState, StarredCriteria } from "@/types/types";

const FilterModal = ({
  modalOpen,
  setModalOpen,
  selectedFilter,
  setFilterState,
  defaultFilterState,
}: any) => {
  const { t } = useTranslation();

  const [jobTypeOptions, setJobTypeOptions] = useState([
    "調理",
    "接客",
    "清掃",
    "工場",
    "宅配",
    "ホテル",
  ]);
  const [japaneseLevelOptions, setJapaneseLevelOptions] = useState([
    "N5",
    "N4",
    "N3",
    "N2",
    "N1",
  ]);
  const starOptions: { key: keyof StarredCriteria; label: string }[] = [
    { key: "nearStation", label: "駅近" },
    { key: "beginnerWelcome", label: "初心者歓迎" },
    { key: "salaryIncrease", label: "昇給あり" },
    { key: "timeFlexiblity", label: "時間の融通" },
    { key: "5/7Workday", label: "週5日勤務" },
  ];

  const [tempState, setTempState] = useState<FilterState>({
    jobType: [],
    japaneseLevel: [],
    hourlyRange: null,
    starred: {},
  });

  const [selectedUnit, setSelectedUnit] = useState<
    "hourly" | "daily" | "weekly" | "monthly" | "yearly"
  >("hourly");
  const [hourlyFrom, setHourlyFrom] = useState("");
  const [hourlyTo, setHourlyTo] = useState("");

  const toggleItem = (key: string, value: string) => {
    setTempState((prev) => {
      const updated = prev[key as keyof FilterState] || [];

      if (Array.isArray(updated)) {
        const exists = updated.includes(value);
        return {
          ...prev,
          [key]: exists
            ? updated.filter((v: string) => v !== value)
            : [...updated, value],
        };
      }
      return prev;
    });
  };

  const toggleStar = (starKey: keyof StarredCriteria) => {
    setTempState((prev) => ({
      ...prev,
      starred: {
        ...prev.starred,
        [starKey]: !prev.starred?.[starKey],
      },
    }));
  };

  const applyFilters = () => {
    let updatedTempState = { ...tempState };

    if (
      selectedFilter.title === t("WorkHoursRange") &&
      hourlyFrom &&
      hourlyTo
    ) {
      updatedTempState = {
        ...updatedTempState,
        hourlyRange: {
          from: Number(hourlyFrom),
          to: Number(hourlyTo),
        },
        salaryUnit: selectedUnit, // ✅ ADD THIS
      };
    }

    setTempState(updatedTempState);

    setFilterState((prev: FilterState) => ({
      ...prev,
      ...updatedTempState,
    }));

    console.log("tempState before applying:", tempState);
    console.log("final hourlyRange:", updatedTempState.hourlyRange);
    setModalOpen(false);
  };

  const clearFilter = () => {
    setTempState(defaultFilterState);
    setHourlyFrom("");
    setHourlyTo("");
    setFilterState(defaultFilterState);
    setModalOpen(false);
  };
  console.log("tempState", tempState);

  const renderOptions = () => {
    switch (selectedFilter?.title) {
      case t("DesiredJobType"):
        return jobTypeOptions.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => toggleItem("jobType", type)}
            className="flex-row items-center gap-2 border-t border-black/20 pt-2 mb-2"
          >
            <View
              className={`p-1.5 rounded-full border ${
                tempState.jobType?.includes(type) ? "bg-green-500" : "bg-white"
              }`}
            >
              <FontAwesomeIcon icon={faCheck} size={12} color="white" />
            </View>
            <Text>{t(type)}</Text>
          </TouchableOpacity>
        ));

      case t("JapaneseLevel"):
        return japaneseLevelOptions.map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => toggleItem("japaneseLevel", level)}
            className="flex-row items-center gap-2 border-t border-black/20 pt-2 mb-2"
          >
            <View
              className={`p-1.5 rounded-full border ${
                tempState.japaneseLevel?.includes(level)
                  ? "bg-green-500"
                  : "bg-white"
              }`}
            >
              <FontAwesomeIcon icon={faCheck} size={12} color="white" />
            </View>
            <Text>{level}</Text>
          </TouchableOpacity>
        ));

      case t("WorkHoursRange"):
        return (
          <View className="gap-2">
            {/* Unit selector */}
            <View className="mb-2 border border-black/30 p-3 rounded-md overflow-hidden">
              {["hourly", "daily", "weekly", "monthly", "yearly"].map(
                (unit, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedUnit(unit as any)}
                    className={`flex-row items-center p-2 gap-2 ${
                      index === 4 ? "border-b-0" : "border-b border-black/30"
                    }`}
                  >
                    <View className="p-1.5 rounded-full border z-10">
                      <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                    </View>
                    <Text
                      className={
                        selectedUnit === unit
                          ? "text-blue-500 z-10"
                          : "text-black z-10"
                      }
                    >
                      {unit.toUpperCase()}
                    </Text>
                    <View
                      className={`absolute top-0 bottom-0 left-0 right-0 z-0 ${
                        index === 0 ? "bg-blue-300" : ""
                      }`}
                    ></View>
                  </TouchableOpacity>
                )
              )}
            </View>

            <Text>{t("From")}:</Text>
            <TextInput
              className="border rounded p-2"
              keyboardType="numeric"
              value={hourlyFrom}
              onChangeText={setHourlyFrom}
              placeholder="e.g. 1000"
            />
            <Text>{t("To")}:</Text>
            <TextInput
              className="border rounded p-2"
              keyboardType="numeric"
              value={hourlyTo}
              onChangeText={setHourlyTo}
              placeholder="e.g. 1500"
            />
          </View>
        );

      case t("Starred"):
        return starOptions.map((star) => (
          <TouchableOpacity
            key={star.key}
            onPress={() => toggleStar(star.key)}
            className="flex-row items-center gap-2 border-t border-black/20 pt-2 mb-2"
          >
            <View
              className={`p-1.5 rounded-full border ${
                tempState.starred?.[star.key] ? "bg-green-500" : "bg-white"
              }`}
            >
              <FontAwesomeIcon icon={faCheck} size={12} color="white" />
            </View>
            <Text>{star.label}</Text>
          </TouchableOpacity>
        ));

      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <View className="bg-black/30 flex-1 justify-center items-center">
        <View className="bg-white rounded-xl p-4 gap-3 min-w-64 w-auto max-h-[90%]">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">{selectedFilter?.title}</Text>
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
              className="bg-red-600 p-1.5 rounded-full"
            >
              <FontAwesomeIcon icon={faClose} size={16} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView className="mt-2">{renderOptions()}</ScrollView>

          <View className="flex-row justify-between gap-2 mt-4">
            <TouchableOpacity
              onPress={clearFilter}
              className="bg-gray-300 rounded px-4 py-2 flex-1"
            >
              <Text className="text-center text-black">{t("Clear")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={applyFilters}
              className="bg-blue-600 rounded px-4 py-2 flex-1"
            >
              <Text className="text-center text-white">{t("Apply")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
