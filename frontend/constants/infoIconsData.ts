import { faBuilding, faCalendarAlt, faCoins, faFileContract, faGlobe, faHouse, faStar, faTrain } from "@fortawesome/free-solid-svg-icons";

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
