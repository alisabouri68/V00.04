import { Suspense } from 'react'
import { LifeLine } from 'react-loading-indicators'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom';
import Routes from './ROUTS'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <Suspense fallback={
      <div className="w-screen h-screen flex items-center justify-center">
        <LifeLine color="#31ccca" size="medium" text="" textColor="" />
      </div>
    }>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes} />
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
