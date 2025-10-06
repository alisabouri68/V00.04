import { createBrowserRouter } from "react-router";
import panelman from "../ACTR/aaaa";
const routeManager = new panelman();
routeManager.init();
const routes = routeManager.toRouteObjects();
const router = createBrowserRouter(routes);
export default router;
