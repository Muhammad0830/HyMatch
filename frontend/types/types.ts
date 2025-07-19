export type SortState = {
  byDate: "asc" | "desc" | null;
  byPayment?: "asc" | "desc" | null;
  byHome?: "asc" | "desc" | null;
  bySchool?: "asc" | "desc" | null;
};

export type StarredCriteria = {
  nearStation?: boolean;
  beginnerWelcome?: boolean;
  salaryIncrease?: boolean;
  timeFlexiblity?: boolean;
  "5/7Workday"?: boolean;
};

export type HourlyRange = {
  from: number;
  to: number;
};

export type FilterState = {
  jobType?: string[];
  japaneseLevel?: string[];
  hourlyRange?: HourlyRange | null;
  starred?: StarredCriteria;
  salaryUnit?: "hourly" | "weekly" | "monthly" | "yearly";
};
