import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { getBookings } from "../../services/apiBookings";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

function useBooking () {
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

function useBookings () {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === 'all'
    ? null
    : { field: 'status', value: filterValue, method: 'eq' };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction, method: 'order' };

  // PAGINATION
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // 這裡的 filter 類似 useEffect 的依賴陣列(Dependency array)
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING：只有在後面還有資料時，才會預先載入下一頁的資料
  const pageCount = Math.ceil(count / 10);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })

  return { isLoading, bookings, error, count }
}

function useDeleteBooking () {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return { isDeleting, deleteBooking }
}

export { useBooking, useBookings, useDeleteBooking }