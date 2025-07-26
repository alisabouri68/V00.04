import { lazy, Suspense } from "react";
import MiddlewareWrapper from "../MIDD/middlewareWrapper"
import {
  createBrowserRouter,
  RouteObject,
} from "react-router";

const HomeDesk = lazy(() => import("../LAYOUT/LAYO_Cover_desk_V00.04"));
const HomeMobile = lazy(() => import("../LAYOUT/LAYO_Cover_mobile_V00.04"));

const SuspenseFallback = () => <div>Loading...</div>;

function ResponsiveLayout() {
  const isMobile = window.innerWidth < 768;
  const Layout = isMobile ? HomeMobile : HomeDesk;
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Layout />
    </Suspense>
  );
}
const routes: RouteObject[] = [
  {
    element: <MiddlewareWrapper />,
    children: [
      { path: "/", element: <ResponsiveLayout /> },
    ],
  },
];

const router = createBrowserRouter(routes);



export default router;
