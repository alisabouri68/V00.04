import { RouterProvider } from "react-router-dom";
import router from "ROUTS";
import DynamanProvider from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

function App() {
  return (
    <>
      <DynamanProvider>
        <RouterProvider router={router} />
      </DynamanProvider>
    </>
  );
}

export default App;
