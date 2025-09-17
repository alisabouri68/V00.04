import { RouterProvider } from "react-router-dom";
import router from "ROUTS";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DynaCtrl from "PLAY/RPLY_dynaCtrl_V00.04";
import { Provider } from "react-redux";
import { store } from "./RDUX/store"; 

function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <DynaCtrl>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </DynaCtrl>
      </Provider>
    </>
  );
}

export default App;
