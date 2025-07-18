import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowDownShortWide,
  faArrowDownWideShort,
  faArrowRotateBack,
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
import SortModal from "./SortModal";
import FilterModal from "./FilterModal";

const defaultFilterState: FilterState = {
  jobType: null,
  japaneseLevel: [],
  hourlyRange: null,
  starred: null,
};

const defaultSortState: SortState = {
  byHome: null,
  bySchool: null,
  byPayment: null,
  byDate: null,
};

const SortAndFiltering = ({ handleSortPress }: SortModalProps) => {
  const { t } = useTranslation();
  const [modalSortOpen, setModalSortOpen] = useState(false);
  const [modalFilterOpen, setModalFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortDataProps | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterDataProps | null>(
    null
  );
  const [sortState, setSortState] = useState<SortState>(defaultSortState);
  const [filterState, setFilterState] =
    useState<FilterState>(defaultFilterState);
  const [draftData, setDraftData] = useState<any[]>([...Data.jobsData]);
  console.log("filterState", filterState);

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
                    setModalSortOpen(true);
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
                    setModalFilterOpen(true);
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

      <SortModal
        modalOpen={modalSortOpen}
        setModalOpen={setModalSortOpen}
        selectedSort={selectedSort}
        setSortState={setSortState}
        defaultSortState={defaultSortState}
        activeSort={activeSort}
      />

      <FilterModal
        modalOpen={modalFilterOpen}
        setModalOpen={setModalFilterOpen}
        selectedFilter={selectedFilter}
        setFilterState={setFilterState}
        defaultFilterState={defaultFilterState}
      />
    </View>
  );
};

export default SortAndFiltering;
