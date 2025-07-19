import { FilterState, SortState } from "@/types/types";

const calculateSalary = (
  job: any,
  unit: "hourly" | "daily" | "weekly" | "monthly" | "yearly"
) => {
  const hourly = job.averagePayment;
  const getWeeklyWorkingHours = (
    workDay: Record<string, boolean>,
    workingHoursByDay: string | number
  ): number => {
    const daysWorkedPerWeek = Object.values(workDay || {}).filter(
      Boolean
    ).length;
    const dailyHours = Number(workingHoursByDay) || 0;
    return daysWorkedPerWeek * dailyHours;
  };
  const hoursPerWeek = getWeeklyWorkingHours(
    job.workDay,
    job.workingHoursByDay
  );

  switch (unit) {
    case "daily":
      return hourly * (Number(job.workingHoursByDay) || 0);
    case "weekly":
      return hourly * hoursPerWeek;
    case "monthly":
      return hourly * hoursPerWeek * 4;
    case "yearly":
      return hourly * hoursPerWeek * 52;
    default:
      return hourly; // hourly case
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
    result = result.filter((job) => filter.jobType?.includes(job.type));
  }

  if (Array.isArray(filter.japaneseLevel) && filter.japaneseLevel.length > 0) {
    result = result.filter((job) =>
      filter.japaneseLevel!.includes(job.japaneseLevel)
    );
  }

  if (filter.hourlyRange && filter.salaryUnit) {
    const { from, to } = filter.hourlyRange;
    result = result.filter((job) => {
      const salary = calculateSalary(job, filter.salaryUnit!);
      return salary >= from && salary <= to;
    });
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

  return result;
}
