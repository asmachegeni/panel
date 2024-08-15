import { createContext } from "react";
import { AuthType } from "./authContext.types";
const values: AuthType = {
  token: "",
  setToken: () => {},
  getToken: () => localStorage.getItem("token"),
};
const AuthContext = createContext(values);
export default AuthContext;
