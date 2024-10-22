import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getCabins,
  createEditCabin,
  deleteCabin as deleteCabinApi,
} from "../../services/apiCabins";

function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery<Cabin[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { isCreating, createCabin };
}

function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }: { newCabinData: Cabin; id: number }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { isUpdating, editCabin };
}

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteCabin };
}

export { useCabins, useCreateCabin, useEditCabin, useDeleteCabin };
