import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  // here i'm using custom hook to checkout user
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  // here, i'm using custom hook for deleting booking
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  const { status, id: bookingId } = booking;
  // const status = "checked-in";
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking# {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {/* Check-in button */}
        {status === "unconfirmed" && (
          <div>
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check-in
            </Button>
          </div>
        )}
        {/* checkout */}
        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check-out
          </Button>
        )}
        {/* Delete booking */}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="delete"
              // once the booking is delete it navigates back to (-1)
              onConfirm={() =>
                deleteBooking(bookingId, { onSuccess: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>

        {/* Back button  */}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
