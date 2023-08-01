import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings () {
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