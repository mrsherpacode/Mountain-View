import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
// This file creates a custom React hook that manages the current user's authentication state throughout your application.
export function useUser() {
  const { data: user, isPending } = useQuery({
    //queryKey identifies what data you want, queryFn defines how to fetch it
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });
  //isAuthenticated = Gets the role property from the user object
  // Compares it to the string "authenticated"
  // Returns boolean: true if authenticated, false if not

  return { user, isPending, isAuthenticated: user?.role === "authenticated" };
}
