import { lazy, ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import { wrapWithMiddleware } from "PLAY/middlewareWrapper";
import AuthTestPanel from "COMP/authtest";

// Lazy-loaded pages
const ConsoleHome = lazy(() => import("../../CONS/CONS_home"));
const ConsoleMono = lazy(() => import("../../CONS/CONS_mono"));
const ConsoleHot = lazy(() => import("../../CONS/CONS_hot"));
const ConsoleGasma = lazy(() => import("../../CONS/CONS_gasma"));
const ConsoleGasmaDetail = lazy(() => import("../../CONS/CONS_gasmaDetails"));
const ConsoleCast = lazy(() => import("../../CONS/CONS_cast"));

export interface CustomRouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  requiresAuth?: boolean;
  children?: CustomRouteConfig[];
}

export const convertToRouteObject = (config: CustomRouteConfig): RouteObject => ({
  path: config.path,
  element: wrapWithMiddleware(config.element, config.requiresAuth),
  children: config.children?.map(convertToRouteObject),
});

export const DEFAULT_ROUTE_CONFIG: CustomRouteConfig[] = [
  { name: "home", path: "/", element: <ConsoleHome />, requiresAuth: true },
  { name: "mono", path: "/mono", element: <ConsoleMono />, requiresAuth: true },
  { name: "hot", path: "/hot", element: <ConsoleHot />, requiresAuth: true },
  {
    name: "gasma",
    path: "/gasma",
    element: <ConsoleGasma />,
    requiresAuth: true,
    children: [{ name: "gasma-detail", path: ":id", element: <ConsoleGasmaDetail />, requiresAuth: true }],
  },
  { name: "cast", path: "/cast", element: <ConsoleCast />, requiresAuth: true },

  {
    name: "home",
    path: "/",
    element: <ConsoleHome />,
    requiresAuth: true,
  },
  {
    name: "authTest",
    path: "/auth-test",
    element: <AuthTestPanel />,
    requiresAuth: false,
  },

  // مسیر 404
  { name: "notFound", path: "/*", element: <div>صفحه یافت نشد</div>, requiresAuth: false },
];
