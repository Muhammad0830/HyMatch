import { text } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faBuilding,
  faCalendarAlt,
  faClock,
  faCoins,
  faFileContract,
  faGlobe,
  faHouse,
  faSeedling,
  faStar,
  faTrain,
  faTrainSubway,
} from "@fortawesome/free-solid-svg-icons";

export const createIconsInfo = (t: (key: string) => string) => [
  {
    name: "building",
    icon: faBuilding,
    text: t("Means Job Name"),
  },
  {
    name: "file-contract",
    icon: faFileContract,
    text: t("Means Job Type"),
  },
  {
    name: "globe",
    icon: faGlobe,
    text: t("Means Min Japanese level"),
  },
  {
    name: "coins",
    icon: faCoins,
    text: t("Means salary"),
  },
  {
    name: "house",
    icon: faHouse,
    text: t("Means commute time from home"),
  },
  {
    name: "train",
    icon: faTrain,
    text: t("Means commute time from school"),
  },
  {
    name: "calendar-days",
    icon: faCalendarAlt,
    text: t("Means working days per week"),
  },
  {
    name: "star",
    icon: faStar,
    text: t("Means important job criteria"),
  },
];

export const createStarIconConfig = (t: (key: string) => string) => [
  {
    key: "nearStation",
    icon: faTrainSubway,
    text: t("Means there is station nearby"),
  },
  {
    key: "beginnerWelcome",
    icon: faSeedling,
    text: t("Means beginner welcome"),
  },
  {
    key: "salaryIncrease",
    icon: faArrowUp,
    text: t("Means salary increases"),
  },
  {
    key: "timeFlexiblity",
    icon: faClock,
    text: t("Means time flexibility"),
  },
  {
    key: "5/7Workday",
    icon: faCalendarAlt,
    text: t("Means 5 wordays per week"),
  },
];
