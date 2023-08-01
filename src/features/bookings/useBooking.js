import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking () {
  const { bookingId } = useParams();

  // QUERY
  const {
    isLoading,
    data: booking = {},
    error,
  } = useQuery({
    // 這裡的 filter 類似 useEffect 的依賴陣列(Dependency array)
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, booking, error }
}