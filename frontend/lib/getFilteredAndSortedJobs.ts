import { FilterState, SortState } from "@/types/types";

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
