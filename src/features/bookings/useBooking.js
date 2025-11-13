// This custom hook extracts some cabin table logic

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  // geeting bookingId from URL
  const { bookingId } = useParams();
  //useQuery custom hook
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    // queryFn: the function responsible for fetching the data, which must return a promise.
    queryFn: () => getBooking(bookingId),
    enabled: !!bookingId, // only run query if bookingId exists
  });
  return {
    isLoading,
    booking,
    error,
  };
}
