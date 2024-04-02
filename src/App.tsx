import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import AuthContext from "./contexts/authContext";
import { createTheme, ThemeProvider } from "@mui/material";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["vazirmatn"].join(","),
    },
    palette: {
      primary: {
        main: "#0C0F3A",
      },
    },
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            backgroundColor: "#0C0F3A",
            "& .Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },

            "&.Mui-selected:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          },
        },
      },
    },
  });
  const router = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider
        value={{ isLogged: true, login: () => {}, logout: () => {} }}
      >
        {router}
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
