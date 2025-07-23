/******************************************
 * Component:      App
 * Last Update:    2025.07.14
 * By:             APPS.00
 *
 * Description:
 * Root application wrapper that provides:
 * - Routing (React Router)
 * - Data fetching (React Query)
 * - Theme context (Redux)
 * - Suspense loading fallback
 ******************************************/

/**************************************
 * Step 01 - Import core dependencies
 * ------------------------------------
 * - Suspense: To wrap lazy-loaded components
 * - useRef: To persist queryClient instance across renders
 **************************************/
import { Suspense, useRef } from "react";

/**************************************
 * Step 02 - Import third-party providers
 * ------------------------------------
 * - QueryClientProvider: Enables React Query for data management
 * - RouterProvider: Sets up routing with React Router
 * - Provider (Redux): Supplies global Redux store
 **************************************/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

/**************************************
 * Step 03 - Import internal modules
 * ------------------------------------
 * - SuspenseFallback: UI to show while loading lazily
 * - Routes: Centralized routing config
 * - ThemeProvider: Custom theme wrapper using Redux
 * - store: Redux store for theme & other global states
 **************************************/
import SuspenseFallback from "./BOX/BOX_loading";
import Routes from "./ROUTS";
import ThemeProvider from "RDUX/theme/themeProvider";
import { store } from "RDUX/store";

/**************************************
 * Step 04 - Create QueryClient instance
 * ------------------------------------
 * - Singleton pattern using useRef to prevent recreation
 * - Custom default options set for data fetching behavior
 **************************************/
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute cache
        refetchOnWindowFocus: false, // Do not refetch when tab becomes active
        retry: 1, // Retry once on failure
      },
    },
  });

/**************************************
 * Step 05 - Define App component
 * ------------------------------------
 * - Wraps application in all required providers
 * - Suspense provides fallback for lazy-loaded routes
 **************************************/
const App = () => {
  // Persist queryClient across re-renders
  const queryClientRef = useRef<QueryClient>();

  // Initialize queryClient only once
  if (!queryClientRef.current) {
    queryClientRef.current = createQueryClient();
  }

  return (
    <Suspense fallback={<SuspenseFallback />}>
      {/* Redux global state provider */}
      <Provider store={store}>
        {/* Theme configuration provider (Redux-based) */}
        <ThemeProvider>
          {/* React Query provider for API data caching */}
          <QueryClientProvider client={queryClientRef.current}>
            {/* Routing provider (entry point for all routes) */}
            <RouterProvider router={Routes} />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
