// مسیرها و metadata routeها
import type { SerializableRoute } from "./types";

export const defaultRouteConfig: SerializableRoute[] = [
  {
    path: "/",
    component: "layout",
    index: false,
    children: [
      { path: "", component: "home", index: true },
      { path: "hot", component: "hot" },
      { path: "cast", component: "cast" },
      { path: "wiki", component: "wiki" },
      { path: "gasma", component: "gasma"},
      { path: "login", component: "login" },
      { path: "register", component: "register" },
      { path: "verify-email", component: "verifyEmail" },
      { path: "verify-success", component: "verifySuccess" },
      { path: "verify-email-handler", component: "verifyHandler" },
      { path: "access-denied", component: "accessDenied" },
      { path: "*", component: "notfound" }
    ]
  }
];










// , middlewareNames: ["authentication"]
// , middlewareNames: ["authentication","permission"]
// , middlewareNames: ["authentication"] 