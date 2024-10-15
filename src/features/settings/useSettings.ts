import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getSettings,
  updateSetting as updateSettingApi,
} from "../../services/apiSettings";

function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { isEditing, updateSetting };
}

export { useSettings, useUpdateSetting };
