import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // 登入成功時，將 user 資料寫入 queryClient
      queryClient.setQueryData(["user"], user.user)
      navigate("/dashboard", { replace: true })
      toast.success("Login success")
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Provided email or password is incorrect')
    }
  })

  return { isLoading, login }
}