<<<<<<< HEAD
// routes/layers/middleware/auth.middleware.ts
import { Middleware, MiddlewareContext } from './index';

export const authMiddleware: Middleware = async (context) => {
  const { user, route, next, redirect } = context;
  
  const requiresAuth = route.meta?.requiresAuth ?? true;
  
  if (requiresAuth && !user.isAuthenticated) {
    redirect('/login', { 
      from: window.location.pathname,
      message: 'لطفاً وارد سیستم شوید'
    });
    return;
  }
  
  next();
};

export const roleMiddleware: Middleware = async (context) => {
  const { user, route, next, redirect } = context;
  
  const requiredRole = route.meta?.requiredRole;
  if (requiredRole && user.role !== requiredRole) {
    redirect('/unauthorized', {
      requiredRole,
      currentRole: user.role
    });
    return;
  }
  
  next();
};

export const permissionMiddleware: Middleware = async (context) => {
  const { user, route, next, redirect } = context;
  
  const requiredPermissions = route.meta?.requiredPermissions || [];
  const hasPermission = requiredPermissions.every((perm:any) => 
    user.permissions.includes(perm)
  );
  
  if (!hasPermission) {
    redirect('/unauthorized', {
      requiredPermissions,
      userPermissions: user.permissions
    });
    return;
  }
  
  next();
};
=======

>>>>>>> f80cd735f2a895ea2c515a4defac99e0249832a1
