import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import AuthContext from "./contexts/authcontext/authContext";
import { ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { useState } from "react";

function App() {
  const theme = createTheme({
    direction: "rtl",
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
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const router = useRoutes(routes);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ token, setToken }}>
          {router}
        </AuthContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
