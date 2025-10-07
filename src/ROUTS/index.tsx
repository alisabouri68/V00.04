import { createBrowserRouter } from "react-router";
import panelman from "../ACTR/test";
const routeManager = new panelman();
routeManager.init();
const routes = routeManager.toRouteObjects();
const router = createBrowserRouter(routes);
export default router;
