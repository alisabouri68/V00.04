import { ReactNode, useEffect, useState, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../../LAYOUT";
import { regman } from "ACTR/RACT_regman_V00.04/index";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

interface MiddlewareWrapperProps {
  children?: ReactNode;
  requiresAuth?: boolean;
}

export const MiddlewareWrapper: React.FC<MiddlewareWrapperProps> = ({ children, requiresAuth }) => {
  const [isAuth, setIsAuth] = useState(regman.isAuthenticated());
  const { envi } = initDyna();

  useEffect(() => {
    const interval = setInterval(() => {
      const auth = regman.isAuthenticated();
      if (auth !== isAuth) setIsAuth(auth);
    }, 200);
    return () => clearInterval(interval);
  }, [isAuth]);

  if (requiresAuth && !isAuth) return <Navigate to="/auth-test" replace />;

  
  if (requiresAuth && (!envi || !envi.ENVI_CONS)) {
    return <div>Loading console...</div>;
  }

  return <Layout>{children}</Layout>;
};

export const wrapWithMiddleware = (element: ReactNode, requiresAuth?: boolean): ReactNode => (
  <MiddlewareWrapper requiresAuth={requiresAuth}>
    <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
  </MiddlewareWrapper>
);
