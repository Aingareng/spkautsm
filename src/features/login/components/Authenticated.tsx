import { Navigate, Outlet } from "react-router-dom";
import { IAuthData } from "../types/login";
import localStorageUtils from "@/shared/utils/storage";

export default function Authenticated() {
  const isLoggiedIn = localStorageUtils.get<IAuthData>("isLoggedIn");
  const isAuthenticated = isLoggiedIn || false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
