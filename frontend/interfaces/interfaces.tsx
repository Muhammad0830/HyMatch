import { SortState } from "@/types/types";
import { FontAwesome } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";

export type FontAwesomeIconName = React.ComponentProps<
  typeof FontAwesome
>["name"];

export interface HeaderProps {
  title: string;
  leftIcon: FontAwesomeIconName;
  rightIcon: FontAwesomeIconName;
  isIndexHeader?: boolean;
}

export interface SortModalProps {
  handleSortPress: () => void;
}

export interface SortDataProps {
  icon: any;
  title: string;
  name: string;
  firstOption: { title: string; onpress: () => void };
  secondOption: { title: string; onpress: () => void };
  thirdOption: { title: string; onpress: () => void };
}

export interface FilterDataProps {
  icon: any;
  title: string;
}

export type DataContextType = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  filteredChosen: any[];
  setFilteredChosen: React.Dispatch<React.SetStateAction<any[]>>;
  filteredRefused: any[];
  setFilteredRefused: React.Dispatch<React.SetStateAction<any[]>>;
  filterState: any;
  setFilterState: React.Dispatch<React.SetStateAction<any>>;
  unSwipedJobs: any[];
  setUnSwipedJobs: React.Dispatch<React.SetStateAction<any[]>>;
};

export type CreateSortDataFn = (
  t: (key: string) => string,
  setSortState: Dispatch<SetStateAction<SortState>>
) => SortDataProps[];
