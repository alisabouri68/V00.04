import { lazy } from "react";
import MiddlewareWrapper from "../MIDD/middlewareWrapper"
import {
  createBrowserRouter,
  RouteObject,
} from "react-router";

const ConsolHome = lazy(() => import("../CONS/CONS_home/index"));
const ConsolMono = lazy(() => import("../CONS/CONS_mono/index"));
const ConsolHot = lazy(() => import("../CONS/CONS_hot/index"));
const ConsolGasma = lazy(() => import("../CONS/CONS-gasma/index"));
const ConsolCast = lazy(() => import("../CONS/CONS_cast/index"));
const BundlGasma = lazy(() => import("../BNDL/WRAP_gasma/index"))


const routes: RouteObject[] = [
  {
    element: <MiddlewareWrapper />,
    children: [
      { path: "/", element: <ConsolHome /> },
      { path: "/mono", element: <ConsolMono /> },
      { path: "/hot", element: <ConsolHot /> },
      {
        path: "/gasma", element: <ConsolGasma />, children: [
          { path: ":id", element: <BundlGasma /> },
        ],
      },
      { path: "/cast", element: <ConsolCast /> },
    ],
  },
];

const router = createBrowserRouter(routes);



export default router;
