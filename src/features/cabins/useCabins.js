// This custom hook extracts some cabin table logic

import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  //useQuery custom hook
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    // queryFn: the function responsible for fetching the data, which must return a promise.
    queryFn: getCabins,
  });
  return {
    isLoading,
    cabins,
    error,
  };
}
