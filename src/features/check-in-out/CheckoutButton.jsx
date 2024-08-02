import { Button } from "../../components/common";
import PropTypes from "prop-types";
import { useCheckout } from "./useCheckin";

CheckoutButton.propTypes = {
  bookingId: PropTypes.string,
};

function CheckoutButton({ bookingId }) {
  const { isLoading, checkout } = useCheckout(bookingId);
  return (
    <Button
      $variation="primary"
      size="small"
      onClick={checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
