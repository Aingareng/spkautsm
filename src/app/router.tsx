import AuthLayout from "@/pages/auth/AuthLayout";
import Login from "@/pages/auth/LoginPage";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import Home from "@/pages/dashboard/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
