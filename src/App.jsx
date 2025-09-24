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

// Setting Up React Query
const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 60 * 1000, // 1 minutes in milliseconds
  },
});
// Declaritively Browsing route
function App() {
  return (
    <BrowserRouter>
      {/*Providing the QueryClient(reactQuery) to the entire Application*/}
      <QueryClientProvider client={queryClient}>
        {/* Integrating React Query Dev Tools */}
        <ReactQueryDevtools />
        {/* Global css style */}
        <GlobalStyles />
        <Routes>
          {/* AppLayout is the whole application layout,other Routes are child routes of Applayou except login and pagenotfound */}
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="Dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="account" element={<Account />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="pageNotFound" element={<PageNotFound />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
