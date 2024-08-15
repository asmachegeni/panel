import { ReactNode } from "react";
import Login from "./modules/login/Login";
import { RoutePrivate } from "./components/RoutePrivate";
import Files from "./modules/files/Files";
import AppLayout from "./components/AppLayout";
import People from "./modules/people/People";
import Positions from "./modules/positions/Positions";
import Place from "./modules/place/Place";
import Socket from "./modules/socket/Socket";
import NotFound from "./NotFound";
import Graph from "./modules/graph/Graph";

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
          <Files />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/graph",
    element: (
      <RoutePrivate>
        <Graph />
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
          <Socket />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/places",
    element: (
      <RoutePrivate>
        <AppLayout>
          <Place />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/positions",
    element: (
      <RoutePrivate>
        <AppLayout>
          <Positions />
        </AppLayout>
      </RoutePrivate>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default routes;
