import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  // here, i'm using custom hook
  const { bookings, isPending: isPending1, numDays } = useRecentBookings();
  const { isPending: isPending2, confirmedStays } = useRecentStays();
  const { cabins, isLoading: isPending3 } = useCabins();

  if (isPending1 || isPending2 || isPending3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        countCabins={cabins.length}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
