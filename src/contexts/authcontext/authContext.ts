import { createContext } from "react";
import { AuthType } from "./authContext.types";
const values:AuthType={
    isLogged: false,
    login: () => {},
    logout: () => {},
}
const AuthContext = createContext(values);
export default AuthContext;
