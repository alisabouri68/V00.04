import { createBrowserRouter } from "react-router";
import panelman from "../ACTR/RACT_panelman_V00.04";
const routeManager = new panelman();
routeManager.init();
const routes = routeManager.toRouteObjects();
const router = createBrowserRouter(routes);
export default router;
