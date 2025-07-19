import {
  faClockFour,
  faFileExcel,
  faComments,
  faStar,
  faHome,
  faBuilding,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import { CreateSortDataFn } from "@/interfaces/interfaces";

export const createSortData: CreateSortDataFn = (t, setSortState) => [
  {
    icon: faClockFour,
    title: t("SortByPayment"),
    name: "byPayment",
    firstOption: {
      title: t("highPaying"),
      onpress: () => setSortState((prev) => ({ ...prev, byPayment: "desc" })),
    },
    secondOption: {
      title: t("lowPaying"),
      onpress: () => setSortState((prev) => ({ ...prev, byPayment: "asc" })),
    },
    thirdOption: {
      title: t("noPaymentSort"),
      onpress: () => setSortState((prev) => ({ ...prev, byPayment: null })),
    },
  },
  {
    icon: faHome,
    title: t("SortByHome"),
    name: "byHome",
    firstOption: {
      title: t("far"),
      onpress: () => setSortState((prev) => ({ ...prev, byHome: "desc" })),
    },
    secondOption: {
      title: t("near"),
      onpress: () => setSortState((prev) => ({ ...prev, byHome: "asc" })),
    },
    thirdOption: {
      title: t("noByHomeSort"),
      onpress: () => setSortState((prev) => ({ ...prev, byHome: null })),
    },
  },
  {
    icon: faBuilding,
    title: t("SortBySchool"),
    name: "bySchool",
    firstOption: {
      title: t("far"),
      onpress: () => setSortState((prev) => ({ ...prev, bySchool: "desc" })),
    },
    secondOption: {
      title: t("near"),
      onpress: () => setSortState((prev) => ({ ...prev, bySchool: "asc" })),
    },
    thirdOption: {
      title: t("noBySchoolSort"),
      onpress: () => setSortState((prev) => ({ ...prev, bySchool: null })),
    },
  },
  {
    icon: faCalendarCheck,
    title: t("SortByDate"),
    name: "byDate",
    firstOption: {
      title: t("new"),
      onpress: () => setSortState((prev) => ({ ...prev, byDate: "desc" })),
    },
    secondOption: {
      title: t("old"),
      onpress: () => setSortState((prev) => ({ ...prev, byDate: "asc" })),
    },
    thirdOption: {
      title: t("noDateSort"),
      onpress: () => setSortState((prev) => ({ ...prev, byDate: null })),
    },
  },
];

export const createFilterData = (t: (key: string) => string) => [
  {
    icon: faFileExcel,
    title: "DesiredJobType",
  },
  {
    icon: faComments,
    title: "JapaneseLevel",
  },
  {
    icon: faClockFour,
    title: "WorkHoursRange",
  },
  {
    icon: faStar,
    title: "Starred",
  },
];
