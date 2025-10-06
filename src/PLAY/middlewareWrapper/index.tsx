import { ReactNode, useEffect, useState, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../../LAYOUT";
import { regman } from "ACTR/RACT_regman_V00.04/index";

interface MiddlewareWrapperProps {
  children?: ReactNode;
  requiresAuth?: boolean;
}
export const ROUTE_ACCESS: Record<string, string[]> = {
  user: ["home", "hot"], 
  admin: ["home", "hot", "cast", "gasma","wiki"], 
  guest: ["authTest"], 
};

export const MiddlewareWrapper: React.FC<MiddlewareWrapperProps> = ({ children, requiresAuth }) => {
  const [isAuth, setIsAuth] = useState(regman.isAuthenticated());

  useEffect(() => {
    const interval = setInterval(() => {
      const auth = regman.isAuthenticated();
      if (auth !== isAuth) setIsAuth(auth);
    }, 200);

    return () => clearInterval(interval);
  }, [isAuth]);

  if (requiresAuth && !isAuth) return <Navigate to="/auth-test" replace />;

  return <Layout>{children}</Layout>;
};

export const wrapWithMiddleware = (element: ReactNode, requiresAuth?: boolean): ReactNode => {
  return (
    <MiddlewareWrapper requiresAuth={requiresAuth}>
      <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
    </MiddlewareWrapper>
  );
};



