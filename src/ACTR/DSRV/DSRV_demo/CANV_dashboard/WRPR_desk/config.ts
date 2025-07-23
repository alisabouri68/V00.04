// React lazy loading for code-splitting
import { lazy } from "react";

// Export service configuration object
export default {
    // Display name of the service
    serviceName: "Dashboard",

    // Unique slug used in routing
    slug: "dashboard",

    // Tailwind class for background color of service button
    color: "bg-gray-100",

    // Order in which this service should appear in the list
    order: 1,

    // Main component for the service (optional if using sheets)
    // component: lazy(() => import("./index")),

    // Array of sheet configurations under this service
    sheets: [
        {
            // Display name of the sheet
            sheetName: "Home",

            // Unique slug used for routing to this sheet
            slug: "home",

            // Main React component for this sheet
            component: lazy(() => import("./sheets/home")),

            // Optional auxiliary component (e.g. side panel or modal)
            auxiliary: lazy(() => import("./sheets/home/auxiliary/index")),

            // Display order within the service
            order: 1,
        },
        {
            sheetName: "Demo Page",
            slug: "demo",
            component: lazy(() => import("./sheets/demo")),
            auxiliary: lazy(() => import("./sheets/demo/auxiliary/index")),
            order: 2,
        },
    ],
};
