// router/index.ts
import { createBrowserRouter } from 'react-router-dom';
import { panelman } from 'ACTR/RACT_panelman_V00.04/index';
import ResponsiveLayout from '../LAYOUT/ResponsiveLayout';
import DynamicPage from '../CONS/CONS_dynamic';
import NotFoundPage from 'CONS/CONS_notFound';

export const createAppRouter = () => {
  // اول پنل را بر اساس نقش کاربر مقداردهی کن
  panelman.initByRole();

  // دریافت روت‌های قابل دسترسی
  const accessibleRoutes = panelman.getAccessibleRoutes();

  const routes = [{
    path: '/',
    element: <ResponsiveLayout />,
    children: [] as any[]
  }];

  // اضافه کردن روت‌های قابل دسترسی
  accessibleRoutes.forEach(routeKey => {
    const routeConfig = panelman.getRouteConfig(routeKey);

    // برای home از مسیر '/' استفاده کن
    const path = routeKey === 'home' ? '' : routeConfig?.path?.replace(/^\//, '') || routeKey;

    routes[0].children.push({
      path: path,
      element: <DynamicPage pageKey={routeKey} config={routeConfig} />
    });
  });

  // Route برای صفحات ناموجود
  routes[0].children.push({
    path: '*',
    element: <NotFoundPage />
  });

  return createBrowserRouter(routes);
};

export const router = createAppRouter();
export default router;