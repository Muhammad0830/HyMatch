export type SortState = {
  byDate: "asc" | "desc" | null; 
  byPayment?: "asc" | "desc" | null;
  byHome?: "asc" | "desc" | null;
  bySchool?: "asc" | "desc" | null;
};

export type FilterState = {
  jobType?: string;
  japaneseLevel?: string[];
  hourlyRange?: [number, number];
  starred?: boolean;
};