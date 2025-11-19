import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

// this is a coustom hook that check-out  user
export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoaging: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} successfully checked-out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was error while chekcking out "),
  });
  return { checkout, isCheckingOut };
}
