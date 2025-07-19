import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { FilterState, StarredCriteria } from "@/types/types";

const units = ["hourly", "daily", "weekly", "monthly", "yearly"];

const FilterModal = ({
  modalOpen,
  setModalOpen,
  selectedFilter,
  setFilterState,
  defaultFilterState,
}: any) => {
  const { t } = useTranslation();

  const [jobTypeOptions] = useState([
    "調理",
    "接客",
    "清掃",
    "工場",
    "宅配",
    "ホテル",
  ]);
  const [japaneseLevelOptions] = useState(["N5", "N4", "N3", "N2", "N1"]);
  const starOptions: { key: keyof StarredCriteria }[] = [
    { key: "nearStation" },
    { key: "beginnerWelcome" },
    { key: "salaryIncrease" },
    { key: "timeFlexiblity" },
    { key: "5/7Workday" },
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
  // animation
  const [focusedInput, setFocusedInput] = useState<"from" | "to" | null>(null);
  const animations = useRef(
    units.reduce((acc, unit) => {
      acc[unit] = {
        bg: new Animated.Value(unit === selectedUnit ? 0 : -120),
        iconMargin: new Animated.Value(unit === selectedUnit ? 10 : 30),
        containerX: new Animated.Value(unit === selectedUnit ? 0 : -40),
      };
      return acc;
    }, {} as Record<string, { bg: Animated.Value; iconMargin: Animated.Value; containerX: Animated.Value }>)
  ).current;

  useEffect(() => {
    units.forEach((unit) => {
      const isSelected = unit === selectedUnit;
      Animated.parallel([
        Animated.timing(animations[unit].bg, {
          toValue: isSelected ? 0 : -220,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animations[unit].iconMargin, {
          toValue: isSelected ? 10 : 30,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animations[unit].containerX, {
          toValue: isSelected ? 2 : -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [selectedUnit, animations]);

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

    setModalOpen(false);
  };

  const clearFilter = () => {
    setTempState(defaultFilterState);
    setHourlyFrom("");
    setHourlyTo("");
    setFilterState(defaultFilterState);
    setModalOpen(false);
  };

  const renderOptions = () => {
    switch (selectedFilter?.title) {
      case "DesiredJobType":
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

      case "JapaneseLevel":
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

      case "WorkHoursRange":
        return (
          <View>
            {/* Unit selector */}
            <View className="mb-2 border border-black/30 p-3 rounded-md overflow-hidden">
              {["hourly", "daily", "weekly", "monthly", "yearly"].map(
                (unit, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedUnit(unit as any)}
                    className={`flex-row items-center p-1.5 gap-2 rounded-md overflow-hidden ${
                      index === 4 ? "border-b-0" : "border-b border-black/30"
                    }`}
                  >
                    <Animated.View
                      className="flex-row items-center z-10"
                      style={{
                        transform: [
                          { translateX: animations[unit].containerX },
                        ],
                      }}
                    >
                      <Animated.View
                        style={{
                          marginRight: animations[unit].iconMargin,
                        }}
                      >
                        <View className="p-1.5 rounded-full z-10 bg-green-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={8}
                            color="white"
                          />
                        </View>
                      </Animated.View>
                      <Text
                        className={`z-10 ${
                          selectedUnit === unit ? "text-white" : "text-black"
                        }`}
                      >
                        {t(`${unit}`)}
                      </Text>
                    </Animated.View>

                    <Animated.View
                      className="absolute top-0 bottom-0 left-0 right-0 bg-blue-500 z-0"
                      style={{
                        transform: [{ translateX: animations[unit].bg }],
                      }}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>

            <View className="w-full justify-center items-center">
              <Text className="capitalize text-lg font-bold">
                {t(`${selectedUnit} range`)}
              </Text>
            </View>
            <Text
              className="text-sm"
              style={{ transform: [{ translateY: 2 }] }}
            >
              {t("From")}:
            </Text>
            <TextInput
              className={`border rounded-lg p-2 ${
                focusedInput === "from" ? "border-blue-500" : "border-black/50"
              }`}
              keyboardType="numeric"
              value={hourlyFrom}
              onChangeText={setHourlyFrom}
              placeholder="¥"
              placeholderTextColor="#9ce2fe"
              onFocus={() => setFocusedInput("from")}
              onBlur={() => setFocusedInput(null)}
            />
            <Text
              className="text-sm"
              style={{ transform: [{ translateY: 2 }] }}
            >
              {t("To")}:
            </Text>
            <TextInput
              className={`border rounded-lg p-2 ${
                focusedInput === "to" ? "border-blue-500" : "border-black/50"
              }`}
              keyboardType="numeric"
              value={hourlyTo}
              onChangeText={setHourlyTo}
              placeholder="¥"
              placeholderTextColor="#9ce2fe"
              onFocus={() => setFocusedInput("to")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
        );

      case "Starred":
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
            <Text>{t(`${star.key}`)}</Text>
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
            <Text className="text-lg font-bold">
              {t(`${selectedFilter?.title}`)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalOpen(false);
                setFocusedInput(null);
              }}
              className="bg-red-600 p-1.5 rounded-full"
            >
              <FontAwesomeIcon icon={faClose} size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View className="mt-1">{renderOptions()}</View>

          <View className="flex-row justify-between gap-2 mt-2">
            <TouchableOpacity
              onPress={() => {
                clearFilter();
                setFocusedInput(null);
              }}
              className="bg-gray-300 rounded px-4 py-2 flex-1"
            >
              <Text className="text-center text-black">{t("Clear")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                applyFilters();
                setFocusedInput(null);
              }}
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
