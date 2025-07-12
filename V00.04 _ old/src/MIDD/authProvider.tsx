import React, { useEffect, memo } from 'react';
import Header from 'BOX/BOX_header';
import Sidebar from 'BOX/BOX_nav';
import AbsMan from 'ACTR/RACT_absMan';
import { login } from 'RDUX/env/HybSlice';

// Interface defining the layout configuration options
interface LayoutConfig {
    header?: boolean; // Whether to show header
    sidebar?: boolean; // Whether to show sidebar
    screen?: boolean; // Special screen layout mode (full screen without standard layout)
}

// Interface defining the route properties
interface Route {
    auth?: boolean; // Whether authentication is required
    layout?: LayoutConfig; // Layout configuration
    element: React.ReactElement; // The route's component
}

/**
 * AuthProvider component - Handles route authentication and layout composition
 * Wraps routes with authentication check and applies the configured layout
 */
const AuthProvider: React.FC<{ route: Route }> = ({ route }) => {
    const { layout } = route;
    // Get authentication state from Redux store
    const isAuth = AbsMan.useAppSelector((state) => state.hyb.isAuth);
    const dispatch = AbsMan.useAppDispatch();

    // Effect to handle authentication when route requires it
    useEffect(() => {
        if (route.auth && !isAuth) {
            // Dispatch login action if not authenticated (simulated auth in this example)
            dispatch(login({ isAuth: true, user: {} }));
        }
    }, [route.auth, isAuth, dispatch]);

    // Don't render anything if auth is required but user isn't authenticated
    if (route.auth && !isAuth) return null;

    // Determine which layout components to show based on route configuration
    const showHeader = layout?.header !== false;
    const showSidebar = layout?.sidebar !== false;

    return (
        <>
            {/* Render header if configured */}
            {showHeader && <Header />}

            {/* Special screen layout (full screen) or standard layout */}
            {layout?.screen ? (
                // Full screen layout (no sidebar, just the component)
                route.element
            ) : (
                // Standard layout with optional sidebar and content panel
                <div className="flex p-6 gap-5 h-full">
                    {/* Render sidebar if configured */}
                    {showSidebar && (
                        <div className="w-20 bg-white rounded-xl shadow-md">
                            <Sidebar />
                        </div>
                    )}
                    {/* Main content panel */}
                    <div id="panel" className="flex w-full gap-5">
                        {route.element}
                    </div>
                </div>
            )}
        </>
    );
};

// Export as memoized component to prevent unnecessary re-renders
export default memo(AuthProvider);
