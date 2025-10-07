//  This is a custom hook that extract the delete cabin logic
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  // Using React Query's useMutation Hook
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully!");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });
  return { isDeleting, deleteCabin };
}
