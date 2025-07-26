import { RouterProvider } from "react-router-dom";
import router from "ROUTS";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "RDUX/store";
import ThemeProvider from "RDUX/theme/themeProvider";
function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <>
      {/* Redux global state provider */}
      < Provider store={store} >
        {/* Theme configuration provider (Redux-based) */}
        <ThemeProvider>
          {/* React Query provider for API data caching */}
          <QueryClientProvider client={queryClient}>
            {/* Routing provider (entry point for all routes) */}
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider >
      </Provider >
    </>
  );
};

export default App;
