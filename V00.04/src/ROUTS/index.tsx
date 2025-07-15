import { useState, useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthProvider from "../MIDD/authProvider";
import SuspenseFallback from "../BOX/BOX_loading";
import type { RoutsType } from "../TYPE";
const CoverDesk = lazy(() => import("../LAYO/LAYO_Cover_desk_V00.04/index"));
const FlatDesk = lazy(() => import("LAYO/LAYO_Flat_desk_V00.04/index"));
const DeepDesk = lazy(() => import("../LAYO/LAYO_DEEP_desk_V00.04/index"));
const DeepFloatDesk = lazy(() => import("../LAYO/LAYO_DeepFloat_desk_V00.04"));
const LinearFloatDesk = lazy(
  () => import("../LAYO/LAYO_LinearFloat_desk_V00.04")
);
const MonoDesk = lazy(() => import("../LAYO/LAYO_MONO_desk_V00.04/index"));
const NotFoundDesk = lazy(
  () => import("../LAYO/LAYO_NOTFOUND_desk_V00.04/index")
);
const CoverMobile = lazy(
  () => import("../LAYO/LAYO_Cover_mobile_V00.04/index")
);
const FlatMobile = lazy(() => import("LAYO/LAYO_Flat_mobile_V00.04/index"));
const DeepMobile = lazy(() => import("../LAYO/LAYO_DEEP_mobile_V00.04/index"));
const DeepFloatMobile = lazy(
  () => import("../LAYO/LAYO_DeepFloat_mobile_V00.04")
);
const LinearFloatMobile = lazy(
  () => import("../LAYO/LAYO_LinearFloat_mobile_V00.04")
);
const MonoMobile = lazy(() => import("../LAYO/LAYO_MONO_mobile_V00.04/index"));
const NotFoundMobile = lazy(
  () => import("../LAYO/LAYO_NOTFOUND_mobile_V00.04/index")
);

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return isMobile;
};

const ResponsiveLayout = ({
  desktop: Desktop,
  mobile: Mobile,
}: {
  desktop: React.ComponentType;
  mobile: React.ComponentType;
}) => {
  const isMobile = useDeviceDetect();
  const Layout = isMobile ? Mobile : Desktop;

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Layout />
    </Suspense>
  );
};

const routes: RoutsType[] = [
  {
    id: "home",
    path: "/",
    element: <ResponsiveLayout desktop={CoverDesk} mobile={CoverMobile} />,
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
    element: <ResponsiveLayout desktop={FlatDesk} mobile={FlatMobile} />,
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
    element: <ResponsiveLayout desktop={DeepDesk} mobile={DeepMobile} />,
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
    element: (
      <ResponsiveLayout desktop={DeepFloatDesk} mobile={DeepFloatMobile} />
    ),
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
    element: (
      <ResponsiveLayout desktop={LinearFloatDesk} mobile={LinearFloatMobile} />
    ),
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
    element: <ResponsiveLayout desktop={MonoDesk} mobile={MonoMobile} />,
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
    element: (
      <ResponsiveLayout desktop={NotFoundDesk} mobile={NotFoundMobile} />
    ),
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
