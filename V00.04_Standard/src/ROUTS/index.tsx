import { createBrowserRouter, Navigate } from 'react-router-dom';
import Welcome from 'LAYOUT/welcome';
import MonoDash from 'LAYOUT/monoDash';
import AuthProvider from 'MIDD/authProvider';

// Define application routes configuration
const routes: any[] = [
    // Root route that redirects to welcome page
    {
        path: '/',
        exact: true,
        auth: true, // Requires authentication
        element: <Navigate to={'/view/bioDemo/welcome'} replace />,
        layout: {
            // Layout configuration
            header: false,
            sidebar: false,
        },
    },
    // Welcome page route
    {
        path: '/view/bioDemo/welcome',
        exact: true,
        element: <Welcome />,
        auth: true, // Requires authentication
        layout: {
            header: true,
            sidebar: false,
            screen: true, // Special screen layout flag
        },
    },
    // Dashboard route with dynamic parameters
    {
        path: '/view/bioDemo/monoDash/:serviceName/:sheetName?/:id?',
        element: <MonoDash />,
        auth: true, // Requires authentication
        layout: {
            header: true,
            sidebar: true, // Shows sidebar navigation
        },
    },
];

/**
 * Initializes application routes by wrapping each with AuthProvider
 * @param {Array} routes - Array of route configuration objects
 * @returns {Router} Configured browser router instance
 */
function initialize(routes: any) {
    let routers: any[] = [];
    // Wrap each route element with authentication provider
    routes.map((route: any) =>
        routers.push({
            ...route,
            element: <AuthProvider route={route} />,
        })
    );
    // Create browser router with the protected routes
    return createBrowserRouter(routers);
}

// Export initialized router with configured routes
export default initialize(routes);
