//  This custom hook extracts the logic of creating a cabin

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  //If you need to use queryClient, import useQueryClient from react-query and uncomment the next line:
  // React Query automatically refetches → Fresh cabin list with new cabin
  // Table automatically refreshes and shows new cabin

  const queryClient = useQueryClient();
  // For creating
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // reset(); // Uncomment or implement reset if needed
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createCabin, isCreating };
}
