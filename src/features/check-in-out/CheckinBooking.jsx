import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  // This useEffect synchronizes the local confirmedPaid state with the booking's payment status from the database.
  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking]);
  // navigate one step back
  const moveBack = useMoveBack();
  // here, i'm using custom hook return checkin and isCheckingin
  const { checkin, isCheckingIn } = useCheckin();
  // here, i'm using custom hook useSetting
  const { setting, isLoading: isloadingSetting } = useSettings();

  if (isLoading || isloadingSetting) return <Spinner />;
  if (!booking) return <div>No booking found</div>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  // optional breakfast
  const optionalBreakfastPrice =
    (setting?.breakfastPrice ?? 0) * numNights * numGuests;
  // Removed unused variable breakfastPrice

  // Removed unused variable breakfastPrice

  // Safely extract guest data (same as BookingDataBox)
  const guest = Array.isArray(guests) ? guests[0] : guests;
  const guestName = guest?.fullName || "Unknown Guest";
  // handleCheckin function
  function handleCheckin() {
    if (!confirmedPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {/* Add breakfast */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmedPaid(false);
            }}
          >
            You want to add breakfast for{" "}
            {formatCurrency(optionalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}
      {/* Confirm payment  */}
      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
          disabled={confirmedPaid || isCheckingIn}
          id={confirm}
        >
          I confirmed that {guestName} has paid the total amount of
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : ` ${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )}(${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )}) `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmedPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
