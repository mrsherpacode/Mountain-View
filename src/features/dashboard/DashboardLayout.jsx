import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  // here, i'm using custom hook
  const { bookings, isPending: isPending1 } = useRecentBookings();
  const { stays, isPending: isPending2, confirmedStays } = useRecentStays();

  if (isPending1 || isPending2) return <Spinner />;

  // Debug logs - remove these in production
  console.log("Bookings:", bookings);
  console.log("Stays:", stays);
  console.log("Confirmed stays:", confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>statistics </div>
      <div>statistics </div>
      <div>statistics </div>
      <div>statistics </div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
