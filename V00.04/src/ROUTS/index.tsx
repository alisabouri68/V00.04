import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthProvider from "../MIDD/authProvider";
import SuspenseFallback from "../BOX/BOX_loading";
import type { RoutsType } from "../TYPE";
const Cover = lazy(() => import("../LAYO/LAYO_Cover_desk_V00.04/index"));
const Flat = lazy(() => import("LAYO/LAYO_Flat_desk_V00.04/index"));
const Deep = lazy(() => import("../LAYO/LAYO_DEEP_desk_V00.04/index"));
const DeepFloat = lazy(() => import("../LAYO/LAYO_DeepFloat_desk_V00.04"));
const LinearFloat = lazy(() => import("../LAYO/LAYO_LinearFloat_desk_V00.04"));
const Mono = lazy(() => import("../LAYO/LAYO_MONO_desk_V00.04/index"));
const NotFound = lazy(() => import("../LAYO/LAYO_NOTFOUND_desk_V00.04/index"));
const routes: RoutsType[] = [
  {
    id: "home",
    path: "/",
    element: <Cover />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      screen: true,
    },
  },
  {
    id: "Flat",
    path: "/Flat",
    element: <Flat />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      screen: true,
    },
  },
  {
    id: "Deep",
    path: "/Deep",
    element: <Deep />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      screen: true,
    },
  },
  {
    id: "DeepFloat",
    path: "/DeepFloat",
    element: <DeepFloat />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      screen: true,
    },
  },
  {
    id: "LinearFloat",
    path: "/LinearFloat",
    element: <LinearFloat />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      screen: true,
    },
  },
  {
    id: "mono",
    path: "/Mono",
    element: <Mono />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      screen: true,
    },
    children: [],
  },
  {
    id: "not-found",
    path: "*",
    element: <NotFound />,
    auth: true,
    layout: {
      header: false,
      aside: false,
      screen: true,
    },
  },
];

const wrapWithProviders = (route: RoutsType) => (
  <Suspense fallback={<SuspenseFallback />}>
    <AuthProvider route={route} />
  </Suspense>
);

const processRoutes = (routes: RoutsType[]): any[] => {
  return routes.map((route) => {
    const processedRoute: any = {
      path: route.path,
      element: wrapWithProviders(route),
    };

    if (route.children) {
      processedRoute.children = processRoutes(route.children);
    }

    return processedRoute;
  });
};

const initializeRouter = () => {
  const processedRoutes = processRoutes(routes);

  if (process.env.NODE_ENV === "development") {
    console.debug("[Router] Initialized routes:", processedRoutes);
  }

  return createBrowserRouter(processedRoutes);
};

const router = initializeRouter();
export default router;
