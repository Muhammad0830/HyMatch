import { FilterState, SortState } from "@/types/types";

const calculateSalary = (
  job: any,
  unit: "hourly" | "weekly" | "monthly" | "yearly"
) => {
  const hourly = job.averagePayment;
  const hoursPerWeek = Object.values(job.workingHoursByDay || {}).reduce(
    (sum, dayHours) => sum + dayHours,
    0
  );
  switch (unit) {
    case "weekly":
      return hourly * hoursPerWeek;
    case "monthly":
      return hourly * hoursPerWeek * 4;
    case "yearly":
      return hourly * hoursPerWeek * 52;
    default:
      return hourly;
  }
};

export default function getFilteredAndSortedJobs(
  jobs: any[],
  filter: FilterState,
  sort: SortState
) {
  let result = [...jobs];

  // Apply filters
  if (filter.jobType && filter.jobType.length > 0) {
    console.log("jobType", filter.jobType);
    result = result.filter((job) => filter.jobType?.includes(job.type));
  }

  if (Array.isArray(filter.japaneseLevel) && filter.japaneseLevel.length > 0) {
    result = result.filter((job) =>
      filter.japaneseLevel!.includes(job.japaneseLevel)
    );
  }

  console.log("hourlyRange", filter.hourlyRange);
  if (filter.hourlyRange) {
    const { from, to } = filter.hourlyRange;
    console.log("from", from, "to", to);
    result = result.filter(
      (job) => job.averagePayment >= from && job.averagePayment <= to
    );
  }

  if (filter.starred) {
    result = result.filter((job) =>
      Object.entries(filter.starred!).every(
        ([key, val]) => val === false || job.star?.[key] === val
      )
    );
  }

  // Apply sorting
  if (sort.byDate !== null) {
    result.sort((a, b) =>
      sort.byDate === "asc"
        ? new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        : new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
    );
  }

  if (sort.byPayment) {
    result.sort((a, b) =>
      sort.byPayment === "asc"
        ? a.averagePayment - b.averagePayment
        : b.averagePayment - a.averagePayment
    );
  }

  if (sort.byHome) {
    result.sort((a, b) =>
      sort.byHome === "asc" ? a.fromHome - b.fromHome : b.fromHome - a.fromHome
    );
  }

  if (sort.bySchool) {
    result.sort((a, b) =>
      sort.bySchool === "asc"
        ? a.fromSchool - b.fromSchool
        : b.fromSchool - a.fromSchool
    );
  }
  console.log(
    "filtering working result",
    result.map((job) => job.name)
  );
  return result;
}
