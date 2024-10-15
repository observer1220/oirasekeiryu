import { Button } from "../../components/common";
import { useCheckout } from "./useCheckin";

interface CheckoutButtonProps {
  bookingId: number;
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  // 這裡有問題，因為 useCheckout 不需要 bookingId
  // const { isCheckingOut, checkout } = useCheckout(bookingId);
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkout()}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
