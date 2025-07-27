import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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
import getFilteredAndSortedJobs from "@/lib/getFilteredAndSortedJobs";
import {
  createSortData,
  createFilterData,
} from "@/constants/SortAndFilterData";
import SortModal from "./SortModal";
import FilterModal from "./FilterModal";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { useData } from "@/contexts/DataContext";

const defaultSortState: SortState = {
  byHome: null,
  bySchool: null,
  byPayment: null,
  byDate: null,
};

export const defaultFilterState: FilterState = {
  jobType: [],
  japaneseLevel: [],
  hourlyRange: null,
  starred: {
    nearStation: false,
    beginnerWelcome: false,
    salaryIncrease: false,
    timeFlexiblity: false,
    "5/7Workday": false,
  },
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
  const {
    data,
    setFilteredChosen,
    setFilteredRefused,
    filterState,
    setFilterState,
    setUnSwipedJobs,
  } = useData();

  const activeSort = useMemo(() => {
    const entry = Object.entries(sortState).find(
      (entry): entry is [keyof typeof sortState, "asc" | "desc"] =>
        entry[1] !== null
    );

    return entry ? { key: entry[0], value: entry[1] } : null;
  }, [sortState]);

  const isFilterActive = (title: string) => {
    switch (title) {
      case "DesiredJobType":
        if (filterState.jobType) return filterState?.jobType?.length > 0;
      case "JapaneseLevel":
        if (filterState.japaneseLevel)
          return filterState.japaneseLevel.length > 0;
      case "WorkHoursRange":
        return filterState.hourlyRange !== null;
      case "Starred":
        if (filterState.starred)
          return Object.values(filterState.starred).some((v) => v === true);
      default:
        return false;
    }
  };

  const filteredSortedJobs = useMemo(() => {
    return getFilteredAndSortedJobs(data.jobsData, filterState, sortState);
  }, [data.jobsData, filterState, sortState]);
  console.log(
    "filteredSortedJobs",
    filteredSortedJobs.map((job: any) => job.name)
  );

  const filteredChosenJobs = useMemo(() => {
    return getFilteredAndSortedJobs(data.ChosenData, filterState, sortState);
  }, [data.ChosenData, filterState, sortState]);

  const filteredRefusedJobs = useMemo(() => {
    return getFilteredAndSortedJobs(data.RefusedData, filterState, sortState);
  }, [data.RefusedData, filterState, sortState]);

  useEffect(() => {
    setFilteredChosen(filteredChosenJobs);
    setFilteredRefused(filteredRefusedJobs);
    setUnSwipedJobs(filteredSortedJobs);
  }, [
    filteredChosenJobs,
    filteredRefusedJobs,
    filteredSortedJobs,
    setFilteredChosen,
    setFilteredRefused,
    setUnSwipedJobs,
  ]);

  const sortData = createSortData(t, setSortState);
  const filterData = createFilterData(t);

  return (
    <View className="flex-1 w-full h-full bg-white gap-2">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-2xl font-bold">{t("Sort")}</Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => {
              setSortState(defaultSortState);
              setFilterState(defaultFilterState);
            }}
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
                      <View className="p-1 bg-blue-700 rounded-full items-center justify-center">
                        {activeSort.value === "desc" ? (
                          <FontAwesomeIcon
                            icon={faArrowDownWideShort}
                            size={16}
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
                  <View className="flex-row items-center gap-3 justify-between">
                    <View className="flex-row gap-3 items-center">
                      <View className="w-[30px] aspect-square justify-center items-center rounded-full bg-[#c29c70]">
                        <FontAwesomeIcon
                          icon={filter.icon}
                          size={20}
                          color={"#fff"}
                        />
                      </View>
                      <Text className="text-black font-bold text-md">
                        {t(`${filter.title}`)}
                      </Text>
                    </View>
                    {isFilterActive(filter.title) ? (
                      <View>
                        <FontAwesomeIcon
                          icon={faCircleDot}
                          size={22}
                          color={"blue"}
                        />
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
        filterState={filterState}
        defaultFilterState={defaultFilterState}
      />
    </View>
  );
};

export default SortAndFiltering;
