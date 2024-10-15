import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getStaysTodayActivity,
  updateBooking,
} from "../../services/apiBookings";

// Define the shape of the booking update payload
interface BookingUpdatePayload {
  status: string;
  isPaid?: boolean;
  breakfast?: { [key: string]: any }; // Adjust this type according to the shape of breakfast
}

// Define the shape of the booking data returned from the server
interface Booking {
  id: string;
  status: string;
  isPaid: boolean;
  // Add other fields as per your backend response
}

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast?: { [key: string]: any };
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return { isCheckingIn, checkin };
}

function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId: any) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
    },
    onError: () => {
      toast.error("There was an error while checking out");
    },
  });

  return { isCheckingOut, checkout };
}

function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isLoading, activities };
}

export { useCheckin, useCheckout, useTodayActivity };
