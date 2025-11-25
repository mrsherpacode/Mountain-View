import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//for spinner
const FullPageSpinner = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;
// Procted route is parent of all other components and only authorized users can access the app.
function ProctedRoute({ children }) {
  //1)Load the authenticated user.

  // Here, i'm using custom hook that gets user;
  const { user, isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //2) If no authenticated user exists, redirect to the login page.
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [isAuthenticated, isPending, navigate]
  );

  //3) While loading, show a spinner.
  if (isPending)
    return (
      <FullPageSpinner>
        <Spinner />
      </FullPageSpinner>
    );
  //4) If a user is authenticated, render the application.
  if (isAuthenticated) return children;

  // Fallback (shouldn't reach here, but good for safety)
  return null;
}
export default ProctedRoute;
