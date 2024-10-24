import styled from "styled-components";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils";
import BookingDataBox from "../bookings/BookingDataBox";
import {
  Row,
  ButtonGroup,
  Button,
  ButtonText,
  Spinner,
  Checkbox,
  Heading,
} from "../../components/common";

import { useMoveBack } from "../../hooks";
import { useBooking } from "../bookings/useBookings";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { isLoading, booking } = useBooking();
  if (!booking) return <p>Booking not found</p>;
  const { isLoading: isLoadingSettings, settings } = useSettings();
  if (!settings) return <p>Settings not found</p>;

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  const moveBack = useMoveBack();
  const { isCheckingIn, checkin } = useCheckin();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({
        bookingId,
        breakfast: {},
      });
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="breakfast"
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false);
          }}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </Checkbox>
      </Box>

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
            disabled={confirmPaid || isCheckingIn}
            id="confirm"
          >
            I confirm that {guests.fullName} has paid the total amount{" "}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : formatCurrency(totalPrice + optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
