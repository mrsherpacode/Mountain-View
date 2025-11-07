// This custom hook extracts some bookings table logic

import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  //useQuery custom hook
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    // queryFn: the function responsible for fetching the data, which must return a promise.
    queryFn: () => getBookings({ filter }),
  });
  return {
    isLoading,
    bookings,
    error,
  };
}
