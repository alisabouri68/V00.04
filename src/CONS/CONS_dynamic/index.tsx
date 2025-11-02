// CONS/CONS_dynamic.tsx
import React from "react";
import { RouteConfig } from "TYPE";
import { usePanelMan } from "ACTR/RACT_panelman_V00.04/index"; // ✅ استفاده از هوک به جای panelman مستقیم
import NotFoundPage from "CONS/CONS_notFound";

interface DynamicPageProps {
  pageKey: string;
  config: RouteConfig;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ pageKey }) => {
  const panelman = usePanelMan(); // ✅ دریافت نسخه‌ی پایدار

  if (!panelman) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-400">
        ⏳ در حال بارگذاری محیط...
      </div>
    );
  }

  // اطمینان از اینکه مسیر وجود دارد
  const routeExists =
    typeof panelman.getRouteState === "function" &&
    panelman.getRouteState(pageKey);

  if (!routeExists) {
    return <NotFoundPage />;
  }

  // ساخت صفحه از ENVI
  const pageContent = panelman.buildPage(pageKey);

  if (!pageContent) {
    return <NotFoundPage />;
  }

  return <>{pageContent}</>;
};

export default DynamicPage;
