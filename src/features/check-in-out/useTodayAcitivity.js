import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
// this is custom hook
export function useTodayAcitivity() {
  const { data: activities, isPending } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-acitivity"],
  });
  return { activities, isPending };
}
