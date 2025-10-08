import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

// This custom hook extact some logic of useQuery hook
export function useSettings() {
  const {
    isloading,
    error,
    data: setting,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isloading, error, setting };
}
