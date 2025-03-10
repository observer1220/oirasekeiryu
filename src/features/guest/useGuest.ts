import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  signup as signupApi,
  login as loginApi,
} from "../../services/apiGuest";

function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please verify the new account from the user's email address."
      );
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, signup };
}

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, nationalID }: GuestLoginRequest) =>
      loginApi({ email, nationalID }),
    onSuccess: (user) => {
      queryClient.setQueryData(["guest"], user[0]);

      if (user.length > 0) {
        localStorage.setItem("guest", JSON.stringify(user[0]));
        navigate("/", { replace: true });
        toast.success("Login success");
      } else {
        toast.error("Provided email or national ID is incorrect");
      }
    },
    onError: () => {
      toast.error("Provided email or national ID is incorrect");
    },
  });
  return { isLoading, login };
}

export { useSignup, useLogin };
