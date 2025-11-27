// This is a custom React hook that wraps the login functionality using React Query's useMutation.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      // This saves user data to cache, then all components get it instantly from there instead of making new API calls!
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.error("Error", err);
      toast.error("your email and password are incorrect");
    },
  });

  return { login, isLoading };
}
