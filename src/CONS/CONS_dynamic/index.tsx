// CONS/CONS_dynamic.tsx
import React from 'react';
import { RouteConfig } from 'TYPE';
import { panelman } from 'ACTR/RACT_panelman_V00.04/index';
import { initDyna } from 'PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl';
import NotFoundPage from 'CONS/CONS_notFound';

interface DynamicPageProps {
  pageKey: string;
  config: RouteConfig;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ pageKey, config }) => {
  const { envi } = initDyna();
  
  // اطمینان از اینکه ENVI آماده است
  React.useEffect(() => {
    if (envi) {
      panelman.setContext(envi);
    }
  }, [envi]);

  const routeExists = panelman.getRouteState(pageKey);
  
  // اگر صفحه وجود نداشت، 404 نمایش داده شود
  if (!routeExists) {
    return <NotFoundPage />;
  }

  // ساخت صفحه به صورت داینامیک از JSON
  const pageContent = panelman.buildPage(pageKey);

  if (!pageContent) {
    return <NotFoundPage />;
  }

  return <>{pageContent}</>;
};

export default DynamicPage;