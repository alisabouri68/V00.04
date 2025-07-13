import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthProvider from "../MIDD/authProvider";
import SuspenseFallback from "../BOX/BOX_loading";
import type { RoutsType } from "../TYPE";
const Home = lazy(() => import("../LAYOUT/home"));
const Comm = lazy(() => import("../LAYOUT/comm"));
const Desk = lazy(() => import("../LAYOUT/desk"));
const Hot = lazy(() => import("../LAYOUT/hot"));
const Cast = lazy(() => import("../LAYOUT/cast"));
const Mono = lazy(() => import("../LAYOUT/mono"));
const WikiEditor = lazy(() => import("../LAYOUT/wikiEditor"));
const WikiManager = lazy(() => import("../LAYOUT/wikiManager"));
const NotFound = lazy(() => import("../LAYOUT/notFound"));
const routes: RoutsType[] = [
  {
    id: "home",
    path: "/",
    element: <Home />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      action: true,
      auxilary: true,
      jini: true,
    },
  },
  {
    id: "community",
    path: "/comm",
    element: <Comm />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      action: true,
      auxilary: true,
      jini: true,
    },
  },
  {
    id: "desktop",
    path: "/desk",
    element: <Desk />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      action: true,
      auxilary: true,
      jini: true,
    },
  },
  {
    id: "hot-topics",
    path: "/hot",
    element: <Hot />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      action: true,
      auxilary: true,
      jini: true,
    },
  },
  {
    id: "broadcast",
    path: "/cast",
    element: <Cast />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      action: true,
      auxilary: true,
      jini: true,
    },
  },
  {
    id: "mono",
    path: "/mono/wikicntr/desk",
    element: <Mono />,
    auth: true,
    layout: {
      header: true,
      aside: true,
      action: true,
      auxilary: true,
      jini: true,
    },
    children: [
      {
        id: "wikiEditor",
        path: "wikiEditor/referenceMenu",
        element: <WikiEditor />,
        auth: true,
        layout: {
          header: false,
          aside: false,
          action: false,
          auxilary: false,
          jini: false,
        },
      },
      {
        id: "wikiManager",
        path: "wikiManager/homeManager",
        element: <WikiManager />,
        auth: true,
        layout: {
          header: true,
          aside: true,
          action: true,
          auxilary: true,
          jini: true,
        },
      },
    ],
  },
  {
    id: "not-found",
    path: "*",
    element: <NotFound />,
    auth: true,
    layout: {
      header: false,
      aside: false,
      action: true,
      auxilary: true,
      jini: true,
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

