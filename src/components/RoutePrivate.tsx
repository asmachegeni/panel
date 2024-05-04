import { ReactNode } from "react";
import { useContext } from "react";
import AuthContext from "../contexts/authcontext/authContext";
import { Navigate } from "react-router-dom";
export const RoutePrivate = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);

  return <>{authContext.isLogged ? children : <Navigate to="/login" />}</>;
};
