// this is custom react hook for signup

import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      toast.success(
        "Account successfully created: please verify your email address"
      );
      console.log(data);
    },
  });

  return { signUp, isPending };
}
