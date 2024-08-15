import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
export const RoutePrivate = ({ children }: { children: ReactNode }) => {
  return <>{localStorage.getItem("token") ? children : <Navigate to="/login" />}</>;
};
