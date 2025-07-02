import { createBrowserRouter } from "react-router-dom";
import Home from "../LAYOUT/home";
import Hot from "../LAYOUT/hot";
import Cast from "../LAYOUT/cast";
import NotFound from "../LAYOUT/notFound";
import AuthProvider from "../MIDD/authProvider";
import type { RoutsType } from "../TYPE";

const routes: RoutsType[] = [
    { path: "/", element: <Home />, auth: true, layout: { header: true, aside: true } },
    { path: "/hot", element: <Hot />, auth: true, layout: { header: true, aside: true } },
    { path: "/cast", element: <Cast />, auth: true, layout: { header: true, aside: true } },
    { path: "*", element: <NotFound />, auth: true, layout: { header: false, aside: false } },
];

const initializeRouter = (routes: RoutsType[]) => {
    const routers = routes.map((route) => ({
        path: route.path,
        element: <AuthProvider route={route} />,
    }));
    console.log(routers)
    return createBrowserRouter(routers);
};

export default initializeRouter(routes);
