// This custom hook extracts some bookings table logic

import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  //useQuery custom hook
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    // queryFn: the function responsible for fetching the data, which must return a promise.
    queryFn: getBookings,
  });
  return {
    isLoading,
    bookings,
    error,
  };
}
