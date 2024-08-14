import { ReactNode } from "react";
import Login from "./modules/login/Login";
// import { RoutePrivate } from "./components/RoutePrivate";
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
      <AppLayout>
        <Files />
      </AppLayout>
    ),
  },
  {
    path: "/graph",
    element: <Graph />,
  },
  {
    path: "/files",
    element: (
      <AppLayout>
        <Files />
      </AppLayout>
    ),
  },
  {
    path: "/people",
    element: (
      <AppLayout>
        <People />
      </AppLayout>
    ),
  },
  {
    path: "/sockets",
    element: (
      <AppLayout>
        <Socket />
      </AppLayout>
    ),
  },
  {
    path: "/places",
    element: (
      <AppLayout>
        <Place />
      </AppLayout>
    ),
  },
  {
    path: "/positions",
    element: (
      <AppLayout>
        <Positions />
      </AppLayout>
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
