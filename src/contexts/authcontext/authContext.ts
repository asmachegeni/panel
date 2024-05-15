import { createContext } from "react";
import { AuthType } from "./authContext.types";
const values: AuthType = {
  isLogged: false,
  setIsLogged: () => {},
  //   login: () => {},
  //   logout: () => {},
  token: "",
  setToken: () => {},
};
const AuthContext = createContext(values);
export default AuthContext;
