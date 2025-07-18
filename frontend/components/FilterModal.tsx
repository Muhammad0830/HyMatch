import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FilterState } from "@/types/types";
import { useTranslation } from "react-i18next";

const FilterModal = ({
  modalOpen,
  setModalOpen,
  selectedFilter,
  setFilterState,
  defaultFilterState,
}: any) => {
  const { t } = useTranslation();
  const [jobTypeFilter, setJobTypeFilter] = useState([
    { title: "調理", isTrue: false },
    { title: "接客", isTrue: false },
    { title: "清掃", isTrue: false },
    { title: "工場", isTrue: false },
    { title: "宅配", isTrue: false },
    { title: "ホテル", isTrue: false },
  ]);

  return (
    <View className="absolute top-0 left-0">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View className="bg-black/30 flex-1 justify-center items-center">
          <View className="bg-white rounded-xl p-4 gap-3 min-w-64 w-auto">
            <View className="flex-row gap-2 justify-between items-center">
              <Text>{selectedFilter?.title}</Text>
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                className="bg-red-600 p-1.5 rounded-full"
              >
                <FontAwesomeIcon icon={faClose} size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View className="self-stretch">
              {jobTypeFilter.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setFilterState(defaultFilterState);
                    const truthy = jobTypeFilter
                      .filter((jobType) =>
                        jobType.isTrue ? jobType.title : null
                      )
                      .map((filter) => filter.title);
                    setJobTypeFilter((prev) => {
                      return filter.isTrue
                        ? prev.map((jobType) =>
                            jobType.title === filter.title
                              ? { ...jobType, isTrue: false }
                              : jobType
                          )
                        : prev.map((jobType) =>
                            jobType.title === filter.title
                              ? { ...jobType, isTrue: true }
                              : jobType
                          );
                    });
                    setFilterState((prev: FilterState) => {
                      if (filter.isTrue) {
                        const updatedTruthy = truthy.filter(
                          (title: any) => title !== filter.title
                        );
                        return {
                          ...prev,
                          jobType: [...updatedTruthy],
                        };
                      }
                      return {
                        ...prev,
                        jobType: [...truthy, filter.title],
                      };
                    });
                  }}
                  className="flex-row items-center gap-2 border-t-[1px] border-black/30 pt-2 mb-2"
                >
                  <View
                    className={`items-center justify-center p-1.5 rounded-full border border-black/30 ${
                      filter.isTrue ? "bg-green-500" : "bg-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                  </View>
                  <Text>{t(`${filter.title}`)}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => {
                  setFilterState(defaultFilterState);
                  setJobTypeFilter((prev) =>
                    prev.map((jobType) => ({ ...jobType, isTrue: false }))
                  );
                  setModalOpen(false);
                }}
                className="flex-row items-center gap-2 border-y-[1px] border-black/30 py-2 "
              >
                <View
                  className={`items-center justify-center p-1.5 rounded-full border border-black/30`}
                >
                  <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                </View>
                <Text>{t("noTypeFilter")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
