import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import AdminDashboard from "./pages/Admin/Dashboard";

import CashierDashboard from "./pages/Cashier/Dashboard";
import Billing from "./pages/Cashier/Billing";
import Payment from "./pages/Cashier/Payment";
import ViewPrice from "./pages/Cashier/ViewPrice";
import AddProduct from "./pages/Cashier/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/cashier/dashboard" element={<CashierDashboard />} />
        <Route path="/cashier/billing" element={<Billing />} />
        <Route path="/cashier/payment" element={<Payment />} />
        <Route path="/cashier/view-price" element={<ViewPrice />} />
        <Route path="/cashier/add-product" element={<AddProduct />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;