import { RouterProvider } from "react-router-dom";
import applicationRouter from "ROUTS/index";
import DynaCtrl from "./PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import MockInjector from "PLAY/RPLY_login";
// import { PanelManTester } from "PLAY/testPanelMan";
// import { useEffect } from "react";
// import { panelman } from 'ACTR/RACT_panelman_V00.04/index';
// ****************************************************************************
// MAIN APPLICATION COMPONENT
// ****************************************************************************

/**
 * @component App
 * @description Root component of the entire React application
 * 
 * This component serves as the entry point for the application and sets up:
 * - Global application context and state management through DynaCtrl
 * - Client-side routing via React Router
 * - Overall application structure and providers
 * 
 * @returns {JSX.Element} The main application structure with routing and global context
 * 
 * @example
 * // This is how the application is typically bootstrapped in main.tsx:
 * // ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
 */
function App() {

  // useEffect(() => {
  //   // مقداردهی اولیه پنل هنگام لود برنامه
  //   panelman.initByRole();

  //   // برای دیباگ - می‌توانید حذف کنید
  //   console.log('Panel Status:', panelman.getPanelStatus());
  //   console.log('Accessible Routes:', panelman.getAccessibleRoutes());
  // }, []);
  return (
    /**
     * @wrapper DynaCtrl
     * @description Global application controller and context provider
     * 
     * DynaCtrl is a custom application-level component that provides:
     * - Global state management and context
     * - Application-level event handling
     * - Error boundary functionality
     * - Theme and configuration management
     * - Authentication state propagation
     * 
     * All child components have access to the global context provided by DynaCtrl
     */
    <DynaCtrl>
      <MockInjector />
      {/* <PanelManTester /> */}

      {/**
       * @component RouterProvider
       * @description Client-side routing provider from React Router DOM
       * 
       * This component enables:
       * - Declarative routing based on route configuration
       * - Dynamic route matching and component rendering
       * - Navigation state management
       * - Route-based code splitting and lazy loading
       * - Protected route handling via middleware
       * 
       * @prop {Router} router - The router instance containing all route configurations,
       * middleware wrappers, and navigation logic defined in ROUTS/index.ts
       * 
       * The router instance includes:
       * - All application routes with their respective components
       * - Authentication middleware for protected routes
       * - Responsive layout wrappers for different devices
       * - Error boundary and loading state handling
       * - Lazy-loaded components with Suspense fallbacks
       */}

      <RouterProvider router={applicationRouter} />
    </DynaCtrl>
  );
}

// ****************************************************************************
// EXPORT
// ****************************************************************************

/**
 * @exports App
 * @description Default export of the main application component
 * 
 * This export is consumed by:
 * - The application entry point (main.tsx) for rendering
 * - Testing utilities for component testing
 * - Storybook for component documentation
 * - Development tools for hot module replacement
 */
export default App;