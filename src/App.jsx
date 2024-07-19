import { styled } from "styled-components";
import { HashRouter, Navigate, Route, Routes, Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import { LanguageSwitchProvider } from "./context/LanguageContext";
import { Header, AdminSidebar, ProtectedRoute } from "./components/Layout";
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
} from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // 1 minutes
      staleTime: 0,
    },
  },
});

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

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
                    <StyledAppLayout>
                      <Header />
                      <AdminSidebar />
                      <Main>
                        <Container>
                          <Outlet />
                        </Container>
                      </Main>
                    </StyledAppLayout>
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
              <Route path="reservation" element={<Reservation />} />
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
