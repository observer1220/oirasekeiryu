import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useCheckout } from "./useCheckout";

CheckoutButton.propTypes = {
  bookingId: PropTypes.string,
};

function CheckoutButton({ bookingId }) {
  const { isLoading, checkout } = useCheckout(bookingId);
  return (
    <Button
      variation="primary"
      size="small"
      onClick={checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
