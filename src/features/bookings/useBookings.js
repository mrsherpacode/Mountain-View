// This custom hook extracts some bookings table logic

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  // using queryClint  for prefetching data
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // Sorting , startDate-desc is default value
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //useQuery custom hook
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    // queryFn: the function responsible for fetching the data, which must return a promise.
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Here, i'm applying Prefetching, which is a technique where we fetch data that we anticipate will be needed before it is actually required to render on the user interface.
  // prefetching next page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  // if page is greater than pageCount don't go to next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      // page:page +1 means fetch next page before it's on UI
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  //prefetching previous page
  //if page is greater than 1 don't go further back
  if (page > 1)
    queryClient.prefetchQuery({
      // page:page  -1 means fetch previous page before it's on UI
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return {
    isLoading,
    bookings,
    error,
    count,
  };
}
