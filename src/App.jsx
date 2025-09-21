import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import GlobalStyles from "../src/styles/GlobalStyles";
import Cabins from "../src/pages/Cabins";
import Account from "../src/pages/Account";
import Bookings from "../src/pages/Bookings";
import Login from "../src/pages/Login";
import Users from "../src/pages/Users";
import Settings from "../src/pages/Settings";
import PageNotFound from "../src/pages/PageNotFound";
// Declaritively Browsing route
function App() {
  return (
    <BrowserRouter>
      <>
        {/* Global css style */}
        <GlobalStyles />
        <Routes>
          <Route index element={<Navigate replace to="Dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="account" element={<Account />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="login" element={<Login />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="pageNotFound" element={<PageNotFound />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
