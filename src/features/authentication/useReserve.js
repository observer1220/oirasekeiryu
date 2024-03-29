import { useMutation } from "@tanstack/react-query";
import { reserve as reserveApi } from "../../services/apiBooking";
import { toast } from "react-hot-toast";

export function useReserve () {
  const { isLoading, mutate: reserve } = useMutation({
    mutationFn: reserveApi,
    onSuccess: () => {
      toast.success("Reservation successful!")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { isLoading, reserve }
}