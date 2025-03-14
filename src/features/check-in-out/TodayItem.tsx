import { Link } from "react-router-dom";
import styled from "styled-components";
import { Tag, Flag, Button } from "../../components/common";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

interface TodayItemProps {
  activity: {
    id: number;
    status: string;
    guests: {
      countryFlag: string;
      fullName: string;
      country: string;
    };
    numNight: number;
  };
}

function TodayItem({ activity }: TodayItemProps) {
  const { id, status, guests, numNight } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="primary">Arriving</Tag>}
      {status === "checked-in" && <Tag type="primary">Departing</Tag>}
      <Flag src={guests?.countryFlag} alt={`Flag of ${guests?.country}`} />
      <Guest>{guests?.fullName}</Guest>
      <div>{numNight}</div>

      {status === "unconfirmed" && (
        <Button
          $size="small"
          $variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
