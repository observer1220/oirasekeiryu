import styled from "styled-components";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import BookingDataBox from "./BookingDataBox";
import {
  Row,
  Tag,
  Button,
  ButtonGroup,
  ButtonText,
  Spinner,
  Modal,
  ConfirmDelete,
  Heading,
} from "../../components/common";
import { useMoveBack } from "../../hooks";
import { useBooking, useDeleteBooking } from "./useBookings";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckin";
import { STATUS_TAGNAME } from "../../utils/constants";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useBooking();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <p>Booking not found</p>;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={STATUS_TAGNAME[booking.status]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/admin/checkin/${booking.id}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(booking.id)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button $variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(booking.id, {
                  onSuccess: () => {
                    navigate(-1);
                  },
                });
              }}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
