import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./contexts/authContext";
function App() {
  const router = useRoutes(routes);
  return (
    <AuthContext.Provider
      value={{ isLogged: false, login: () => {}, logout: () => {} }}
    >
      {router}
    </AuthContext.Provider>
  );
}

export default App;
