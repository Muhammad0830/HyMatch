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
  salaryUnit?: "hourly" | "daily" | "weekly" | "monthly" | "yearly";
};

export type FieldDefinition =
  | {
      name: string;
      label: string;
      type: "text" | "select" | "radio" | "file" | "checkbox" | "col-checkbox";
      options?: string[] | number[];
      keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
    }
  | {
      name: string;
      label: string;
      type: "radio";
      options: { label: string; icon: any }[];
    };

export type FormValues = {
  name: string;
  profileImage: string | null;
  [key: string]: any; 
};
