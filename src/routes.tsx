import { ReactNode } from "react";
import Login from "./pages/Login";
import { RoutePrivate } from "./components/RoutePrivate";
import { Files } from "./pages/Files";
import { Home } from "./pages/Home";
interface Route {
  path: string;
  element: ReactNode;
}
const routes: Route[] = [
  {
    path: "/",
    element: (
      <RoutePrivate>
        <Home />
      </RoutePrivate>
    ),
  },
  {
    path: "/files",
    element: (
      <RoutePrivate>
        <Files />
      </RoutePrivate>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },
];
export default routes;
