import { ReactNode } from "react";
import Login from "./pages/Login";
import { RoutePrivate } from "./components/RoutePrivate";
import  Files  from "./pages/Files";
import { Home } from "./pages/Home";
import AppLayout from "./components/AppLayout";
import Register from "./pages/Register";
interface Route {
  path: string;
  element: ReactNode;
}
const routes: Route[] = [
  {
    path: "/",
    element: (
      <RoutePrivate>
        <AppLayout>
          <Home />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/files",
    element: (
      <RoutePrivate>
        <AppLayout>
          <Files />
        </AppLayout>
      </RoutePrivate>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
export default routes;
