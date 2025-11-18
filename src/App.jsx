import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "../src/pages/Dashboard";
import GlobalStyles from "../src/styles/GlobalStyles";
import Cabins from "../src/pages/Cabins";
import Account from "../src/pages/Account";
import Bookings from "../src/pages/Bookings";
import Login from "../src/pages/Login";
import Users from "../src/pages/Users";
import Settings from "../src/pages/Settings";
import PageNotFound from "../src/pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";

// Setting Up React Query
const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0, // 1 minutes in milliseconds
  },
});
function App() {
  return (
    // Providing the QueryClient(reactQuery) to the entire Application
    <QueryClientProvider client={queryClient}>
      {/* Declaratively Browsing route */}
      <BrowserRouter>
        {/* Integrating React Query Dev Tools */}
        <ReactQueryDevtools />
        {/* Global css style */}
        <GlobalStyles />
        <Routes>
          {/* AppLayout is the whole application layout, other Routes are child routes of Applayou except login and pagenotfound */}
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="Dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="account" element={<Account />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="pageNotFound" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      {/* React toaster library for formatting notifications */}
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
            backgroundColor: "var(--color-gray-0)",
            color: "var(--color-gray-500)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
