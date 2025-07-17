import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowDownShortWide,
  faArrowDownWideShort,
  faArrowRotateBack,
  faCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  SortModalProps,
  SortDataProps,
  FilterDataProps,
} from "@/interfaces/interfaces";
import { SortState, FilterState } from "@/types/types";
import Data from "@/data.json";
import getFilteredAndSortedJobs from "@/lib/getFilteredAndSortedJobs";
import {
  createSortData,
  createFilterData,
} from "@/constants/SortAndFilterData";

const SortModal = ({ handleSortPress }: SortModalProps) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortDataProps | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterDataProps | null>(
    null
  );
  const [sortState, setSortState] = useState<SortState>({ byDate: null });
  const [filterState, setFilterState] = useState<FilterState>({});
  const [draftData, setDraftData] = useState<any[]>([...Data.jobsData]);

  const activeSort = useMemo(() => {
    const entry = Object.entries(sortState).find(
      (entry): entry is [keyof typeof sortState, "asc" | "desc"] =>
        entry[1] !== null
    );

    return entry ? { key: entry[0], value: entry[1] } : null;
  }, [sortState]);

  const filteredSortedJobs = useMemo(() => {
    return getFilteredAndSortedJobs(draftData, filterState, sortState);
  }, [draftData, filterState, sortState]);

  const defaultSortState: SortState = {
    byHome: null,
    bySchool: null,
    byPayment: null,
    byDate: null,
  };

  const sortData = createSortData(t, setSortState);
  const filterData = createFilterData(t);

  console.log(
    "filteredData",
    filteredSortedJobs.map((job) => job.name)
  );

  return (
    <View className="flex-1 w-full h-full bg-white gap-2">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-2xl font-bold">{t("Sort")}</Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => setSortState(defaultSortState)}
            className="w-[30px] aspect-square rounded-full bg-blue-700 justify-center items-center"
          >
            <FontAwesomeIcon
              icon={faArrowRotateBack}
              size={18}
              color={"#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortPress()}
            className="w-[30px] aspect-square rounded-full bg-red-600 justify-center items-center"
          >
            <FontAwesomeIcon icon={faClose} size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
      {/* sort */}
      <View className="border border-black/30 rounded-md p-3 gap-2">
        {sortData.map(
          (sort: SortDataProps, index: number, array: SortDataProps[]) => {
            return (
              <View key={index} className="gap-2">
                <TouchableOpacity
                  onPress={() => {
                    handleSortPress();
                    setModalOpen(true);
                    setSelectedSort(sort);
                  }}
                  className="flex-row items-center justify-between gap-2"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                      <FontAwesomeIcon
                        icon={sort.icon}
                        size={20}
                        color={"#fff"}
                      />
                    </View>
                    <Text className="text-black font-bold text-md">
                      {sort.title}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    {sort.name === activeSort?.key ? (
                      <View className="p-1.5 bg-blue-700 rounded-full items-center justify-center">
                        {activeSort.value === "desc" ? (
                          <FontAwesomeIcon
                            icon={faArrowDownWideShort}
                            size={18}
                            color="white"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faArrowDownShortWide}
                            size={18}
                            color="white"
                          />
                        )}
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
                {index + 1 === array.length ? null : (
                  <View className="bg-black/40 w-full h-[1px]"></View>
                )}
              </View>
            );
          }
        )}
      </View>

      {/* filter */}
      <View>
        <Text className="text-2xl font-bold">{t("Filter")}</Text>
      </View>
      <View className="border border-black/30 rounded-md p-3 gap-2">
        {filterData.map(
          (
            filter: FilterDataProps,
            index: number,
            array: FilterDataProps[]
          ) => {
            return (
              <View key={index} className="gap-2">
                <TouchableOpacity
                  onPress={() => {
                    handleSortPress();
                    setModalOpen(true);
                    setSelectedFilter(filter);
                  }}
                >
                  <View className="flex-row items-center gap-3">
                    <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                      <FontAwesomeIcon
                        icon={filter.icon}
                        size={20}
                        color={"#fff"}
                      />
                    </View>
                    <Text className="text-black font-bold text-md">
                      {filter.title}
                    </Text>
                  </View>
                </TouchableOpacity>
                {index + 1 === array.length ? null : (
                  <View className="bg-black/40 w-full h-[1px]"></View>
                )}
              </View>
            );
          }
        )}
      </View>

      <View className="absolute top-0 left-0">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <View className="bg-black/30 flex-1 justify-center items-center">
            <View className="bg-white rounded-xl p-4 gap-3 min-w-52">
              <View className="flex-row gap-2 justify-between items-center">
                <Text>{selectedSort?.title}</Text>
                <TouchableOpacity
                  onPress={() => setModalOpen(false)}
                  className="bg-red-600 p-1.5 rounded-full"
                >
                  <FontAwesomeIcon icon={faClose} size={16} color="white" />
                </TouchableOpacity>
              </View>
              <View className="w-full">
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setSortState(defaultSortState);
                      selectedSort?.firstOption.onpress();
                      setModalOpen(false);
                    }}
                    className="flex-row items-center gap-2 border-t-[1px] border-black/30 pt-2 mb-2"
                  >
                    <View
                      className={`items-center justify-center p-1.5 rounded-full border border-black/30 ${
                        selectedSort?.name === activeSort?.key &&
                        activeSort?.value === "desc"
                          ? "bg-green-500"
                          : "bg-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                    </View>
                    <Text>{selectedSort?.firstOption.title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortState(defaultSortState);
                      selectedSort?.secondOption.onpress();
                      setModalOpen(false);
                    }}
                    className="flex-row items-center gap-2 border-y-[1px] border-black/30 py-2"
                  >
                    <View
                      className={`items-center justify-center p-1.5 rounded-full border border-black/30 ${
                        selectedSort?.name === activeSort?.key &&
                        activeSort?.value === "asc"
                          ? "bg-green-500"
                          : "bg-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                    </View>
                    <Text>{selectedSort?.secondOption.title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortState(defaultSortState);
                      selectedSort?.thirdOption.onpress();
                      setModalOpen(false);
                    }}
                    className="flex-row items-center gap-2 border-b-[1px] border-black/30 mt-2 pb-2"
                  >
                    <View
                      className={`items-center justify-center p-1.5 rounded-full border border-black/30 ${
                        selectedSort?.name !== activeSort?.key ||
                        (activeSort?.value !== "desc" &&
                          activeSort?.value !== "asc")
                          ? "bg-green-500"
                          : "bg-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                    </View>
                    <Text>{selectedSort?.thirdOption.title}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default SortModal;
