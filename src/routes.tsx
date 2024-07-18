import { ReactNode } from "react";
import Login from "./modules/login/Login";
import { RoutePrivate } from "./components/RoutePrivate";
import Files from "./modules/files/Files";
import { Home } from "./modules/home/Home";
import AppLayout from "./components/AppLayout";
import { Setting } from "./modules/setting/Setting";
import People from "./modules/people/People";

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
        <AppLayout>
          <Files />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/setting",
    element: (
      <RoutePrivate>
        <AppLayout>
          <Setting />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/people",
    element: (
      <RoutePrivate>
        <AppLayout>
          <People />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/sockets",
    element: (
      <RoutePrivate>
        <AppLayout>
          <People />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/places",
    element: (
      <RoutePrivate>
        <AppLayout>
          <People />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/positions",
    element: (
      <RoutePrivate>
        <AppLayout>
          <People />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default routes;
