import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from 'ROUTS';
import ClockLoader from 'react-spinners/ClockLoader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from 'RDUX/store';

// Main App component that wraps the entire application with necessary providers
function App() {
    // Create a React Query client instance
    const queryClient = new QueryClient();

    return (
        // Suspense boundary for lazy loading components with a loading fallback
        <Suspense
            fallback={
                <div className="w-screen h-screen flex items-center justify-center">
                    <ClockLoader
                        color={'blue'}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }>
            {/* Redux provider for global state management */}
            <Provider store={store}>
                {/* React Query provider for server state management */}
                <QueryClientProvider client={queryClient}>
                    {/* Router provider handles all application routing */}
                    <RouterProvider router={router} />

                    {/* React Query devtools for development (hidden by default) */}
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Provider>

            {/* Toast notification container positioned at bottom-left */}
            <ToastContainer theme="light" position="bottom-left" />
        </Suspense>
    );
}

export default App;
