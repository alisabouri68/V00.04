import { Suspense, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import SuspenseFallback from './BOX/BOX_loading';
import Routes from './ROUTS';
import ThemeProvider from 'RDUX/theme/themeProvider';
import { Provider } from 'react-redux';
import { store } from 'RDUX/theme/store';
// import { Provider } from 'react-redux';
/**
 * Creates a pre-configured QueryClient instance with default options.
 * 
 * Why this configuration?
 * - `staleTime: 60_000`: Data remains fresh for 1 minute before refetching
 *   (balances performance vs data freshness)
 * - `refetchOnWindowFocus: false`: Prevents disruptive refetches when tab gains focus
 * - `retry: 1`: Failing queries will retry once before showing errors
 * 
 * Consider extending for:
 * - Caching strategies
 * - Mutation defaults
 * - SSR support (when available)
 */
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  /**
  * Using useRef to maintain a stable QueryClient instance across re-renders.
  * This prevents:
  * - Unnecessary re-creations of QueryClient
  * - Cache invalidation during component lifecyle
  * - Potential memory leaks
  * 
  * Note: For SSR, consider initializing from context instead
  */
  const queryClientRef = useRef<QueryClient>();
  // Initialize only once (singleton pattern)
  if (!queryClientRef.current) {
    queryClientRef.current = createQueryClient();
  }

  return (
    /**
    * Suspense boundary for handling async operations in router/components.
    * 
    * Features:
    * - Shows SuspenseFallback during data loading/route transitions
    * - Integrates with React.lazy() for code splitting
    * - Works with React Query's suspense mode
    * 
    * Future improvements:
    * - Add multiple boundaries for granular loading states
    * - Implement error boundaries for graceful error handling
    */
    <Suspense fallback={<SuspenseFallback />}>
      <Provider store={store}>
      <ThemeProvider>
        {/* 
        Provides React Query context to entire application
        - Client instance is stable across re-renders
        - Accessible via useQueryClient() hook anywhere
      */}
        <QueryClientProvider client={queryClientRef.current}>
          {/* <Provider store={store}> */}
          {/**
         * Router provider configures application routing
         * 
         * Key points:
         * - Routes object contains all route definitions
         * - Supports nested routes, loaders, and lazy loading
         * - Enable React Location Devtools for debugging:
         *   import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
         * 
         * SSR Note: 
         * Current react-router-dom (v6) doesn't support SSR out-of-box.
         * Consider Remix or Next.js for SSR needs.
         */}
          <RouterProvider router={Routes} />
          {/* </Provider> */}
        </QueryClientProvider>
      </ThemeProvider>
      </Provider>
    </Suspense>
  );
};

export default App;