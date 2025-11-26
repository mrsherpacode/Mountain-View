import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

//  custom hook for user logout
export function useLogout() {
  const navigate = useNavigate();
  const query = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // remove all cached data
      query.removeQueries();
      //replace= prevents users from accidentally navigating back to the dashboard after logout,
      navigate("/login", { replace: true });
    },
  });
  return { logout, isPending };
}
