import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  updateCurrentUser,
  getCurrentUser,
} from "../../services/apiAuth";
import { reserve as reserveAPI } from "../../services/apiGuest";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/admin/dashboard", { replace: true });
      toast.success("Login success");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Provided email or password is incorrect");
    },
  });
  return { isLoading, login };
}

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // 登出時刪除所有的 query
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { isLoading, logout };
}

function useReserve() {
  const { isLoading, mutate: reserve } = useMutation({
    mutationFn: reserveAPI,
    onSuccess: () => {
      toast.success("Reservation successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, reserve };
}

function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please verify the new account from the user's email address."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, signup };
}

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      // Update the user data in the cache
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isUpdating, updateUser };
}

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}

export { useLogin, useLogout, useReserve, useSignup, useUpdateUser, useUser };
