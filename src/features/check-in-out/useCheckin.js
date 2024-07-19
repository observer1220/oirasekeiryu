import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useCheckin () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/')
    },
    onError: () => {
      toast.error('There was an error while checking in');
    }
  });

  return { isCheckingIn, checkin }
}

function useCheckout () {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error('There was an error while checking out');
    }
  });

  return { isCheckingOut, checkout }
}

function useTodayActivity () {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  })

  return { isLoading, activities }
}

export { useCheckin, useCheckout, useTodayActivity }