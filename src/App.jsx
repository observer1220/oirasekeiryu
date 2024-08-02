import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider, LanguageSwitchProvider } from "./context";
import { AdminLayout, ProtectedRoute } from "./components/Layout";
import {
  Dashboard,
  Bookings,
  Cabins,
  Users,
  Settings,
  Account,
  PageNotFound,
  Booking,
  Checkin,
  Home,
  Reservation,
  Login,
  GuestLogin,
} from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // 1 minutes
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <LanguageSwitchProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <HashRouter>
            <Routes>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route path="/" element={<Home />} />
              <Route path="reservation/:id" element={<Reservation />} />
              <Route path="guestLogin" element={<GuestLogin />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </HashRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                background: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </LanguageSwitchProvider>
  );
}

export default App;
