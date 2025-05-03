import Authenticated from "@/features/login/components/Authenticated";
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

        <Route element={<Authenticated />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
