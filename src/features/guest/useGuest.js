// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  signup as signupApi,
  login as loginApi,
  // logout as logoutApi,
  // getCurrentUser
} from "../../services/apiGuest";
// import { useLocalStorageState as UseLocalStorageState } from "../../hooks/useGeneral";
// import { reserve as reserveApi } from "../../services/apiBooking";

function useSignup () {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account created successfully! Please verify the new account from the user's email address.")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { isLoading, signup }
}

function useLogin () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, nationalID }) => loginApi({ email, nationalID }),
    onSuccess: (user) => {
      queryClient.setQueryData(["guest"], user[0]);
      console.log(user);
      // UseLocalStorageState("guest", JSON.stringify(user[0]));
      localStorage.setItem("guest", JSON.stringify(user[0]));
      navigate("/", { replace: true });
      toast.success("Login success")
    },
    onError: (error) => {
      console.log(error.message);
      toast.error('Provided email or national ID is incorrect')
    }
  })
  return { isLoading, login }
}

// function useLogout () {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { mutate: logout, isLoading } = useMutation({
//     mutationFn: logoutApi,
//     onSuccess: () => {
//       // 登出時刪除所有的 query
//       queryClient.removeQueries()
//       navigate('/login', { replace: true })
//     }
//   })
//   return { isLoading, logout }
// }

// function useReserve () {
//   const { isLoading, mutate: reserve } = useMutation({
//     mutationFn: reserveApi,
//     onSuccess: () => {
//       toast.success("Reservation successful!")
//     },
//     onError: (error) => {
//       toast.error(error.message)
//     }
//   })

//   return { isLoading, reserve }
// }

// function useUser () {
//   const { isLoading, data: user } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//   })

// return { isLoading, user, isAuthenticated: user?.role === "authenticated" }
// }

// export { useLogin, useLogout, useReserve, useSignup, useUser }
export { useSignup, useLogin }