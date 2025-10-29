import { ReactNode, useEffect, useState, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { hybMan } from "ACTR/RACT_hybman_V00.04";
import { profileMan } from "ACTR/RACT_profileman_V00.04";

interface MiddlewareWrapperProps {
  children: ReactNode;
  requiresAuth?: boolean;
  roles?: string[];
}

export const MiddlewareWrapper = ({
  children,
  requiresAuth,
  roles,
}: MiddlewareWrapperProps) => {
  const [ready, setReady] = useState(false);
  const location = useLocation();

  const isAuthenticated = useMemo(() => hybMan.isAuthenticated(), []);
  const user = useMemo(() => profileMan.getProfile(), []);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center w-full bg-light text-dark text-2xl h-screen">
        Loading...
      </div>
    );
  }

  const currentPath = location.pathname;

  if (requiresAuth && !isAuthenticated && currentPath !== "/auth-test") {
    return <Navigate to="/auth-test" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && user && !roles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-gray-700">
        <h2 className="text-xl font-semibold mb-4">⛔️ دسترسی غیرمجاز</h2>
        <p>شما مجوز لازم برای دیدن این صفحه را ندارید.</p>
      </div>
    );
  }

  return <>{children}</>;
};

// تابع wrapWithMiddleware
export const wrapWithMiddleware = (
  element: ReactNode,
  requiresAuth?: boolean,
  roles?: string[]
) => (
  <MiddlewareWrapper requiresAuth={requiresAuth} roles={roles}>
    {element}
  </MiddlewareWrapper>
);
