// This custom hook extracts some bookings table logic

import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
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

  //useQuery custom hook
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    // queryFn: the function responsible for fetching the data, which must return a promise.
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return {
    isLoading,
    bookings,
    error,
  };
}
