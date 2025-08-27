import { lazy, ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import MiddlewareWrapper from "../../MIDD/middlewareWrapper"; // ✅ PascalCase

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
  protected?: boolean; // still ok here
  children?: CustomRouteConfig[];
}

// ✅ Helper function to wrap element with Middleware
const wrapWithMiddleware = (element: ReactNode, protectedRoute?: boolean): ReactNode => {
  return (
    <MiddlewareWrapper isAuthenticated={!!protectedRoute}>
      {element}
    </MiddlewareWrapper>
  );
};

export const convertToRouteObject = (config: CustomRouteConfig): RouteObject => {
  return {
    path: config.path,
    element: wrapWithMiddleware(config.element, config.protected),
    children: config.children?.map(convertToRouteObject)
  };
};

export const DEFAULT_ROUTE_CONFIG: CustomRouteConfig[] = [
  { 
    name: "home",
    path: "/",
    element: <ConsoleHome />, 
    protected: true 
  },
  { 
    name: "mono",
    path: "/mono",
    element: <ConsoleMono />, 
    protected: true 
  },
  { 
    name: "hot",
    path: "/hot",
    element: <ConsoleHot />, 
    protected: true 
  },
  { 
    name: "gasma",
    path: "/gasma",
    element: <ConsoleGasma />, 
    protected: true,
    children: [
      {
        name: "gasma-detail",
        path: ":id",
        element: <ConsoleGasmaDetail />,
        protected: true,
      }
    ]
  },
  { 
    name: "cast",
    path: "/cast",
    element: <ConsoleCast />, 
    protected: true 
  },
  { 
    name: "notFound",
    path: "/*",
    element: <div>notFound</div>, 
    protected: true 
  }
];

console.log("DEFAULT_ROUTE_CONFIG:", DEFAULT_ROUTE_CONFIG);
