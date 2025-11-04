// ROUTS/index.ts
import { createBrowserRouter } from 'react-router-dom';
import { panelman } from 'ACTR/RACT_panelman_V00.04/index';
import ResponsiveLayout from '../LAYOUT/ResponsiveLayout';
import DynamicPage from '../CONS/CONS_dynamic';
import NotFoundPage from 'CONS/CONS_notFound';
import { initDyna } from '../PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl';
import { useEffect, useState } from 'react';

// کامپوننت wrapper که از context استفاده می‌کند
const AppInitializer = () => {
  const { envi } = initDyna(); // دسترسی به ENVI از طریق context
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (envi) {
      // مقداردهی اولیه panelman زمانی که ENVI آماده است
      panelman.setContext(envi);
      console.log('PanelMan initialized with ENVI from context');
      setIsInitialized(true);
    }
  }, [envi]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری داده‌ها...</p>
        </div>
      </div>
    );
  }

  return <ResponsiveLayout />;
};

// کامپوننت برای روت‌های داینامیک
const DynamicRouteHandler = ({ pageKey }: { pageKey: string }) => {
  const { envi } = initDyna();
  const routeConfig = panelman.getRouteConfig(pageKey);

  // اگر ENVI هنوز لود نشده یا مسیر وجود ندارد
  if (!envi || !routeConfig) {
    return <NotFoundPage />;
  }

  return <DynamicPage pageKey={pageKey} config={routeConfig} />;
};

export const createAppRouter = () => {
  const routes = [{
    path: '/',
    element: <AppInitializer />,
    children: [] as any[]
  }];

  // اینجا باید منتظر بمانیم تا panelman مقداردهی شود
  // برای تست، روت‌های ثابت تعریف می‌کنیم
  const staticRoutes = [
    { key: 'home', path: '' },
    { key: 'hot', path: 'hot' },
    { key: 'cast', path: 'cast' },
    { key: 'wiki', path: 'wiki' },
    { key: 'gasma', path: 'gasma' }
  ];

  staticRoutes.forEach(route => {
    routes[0].children.push({
      index: route.key === 'home',
      path: route.key === 'home' ? undefined : route.path,
      element: <DynamicRouteHandler pageKey={route.key} />
    });
  });

  // Route برای صفحات ناموجود
  routes[0].children.push({
    path: '*',
    element: <NotFoundPage />
  });

  return createBrowserRouter(routes);
};

export const applicationRouter = createAppRouter();
export default applicationRouter;