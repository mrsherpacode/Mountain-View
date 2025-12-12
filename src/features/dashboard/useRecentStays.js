import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  //  // 1. Gets time range from URL parameters

  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // 2. Calculates the date (7/30/90 days ago)

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    data: stays,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // Handle errors if needed
  if (error) {
    console.error("Error in useRecentStays:", error);
  }

  const confirmedStays = stays?.filter(
    (booking) =>
      booking.status === "checked-in" || booking.status === "checked-out"
  );

  return { stays, isPending, error, confirmedStays };
}
