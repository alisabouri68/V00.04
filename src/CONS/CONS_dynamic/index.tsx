// CONS/CONS_dynamic.tsx
import React from "react";
import { RouteConfig } from "TYPE";
import { usePanelMan } from "ACTR/RACT_panelman_V00.04/index";
import NotFoundPage from "CONS/CONS_notFound";

interface DynamicPageProps {
  pageKey: string;
  config: RouteConfig;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ pageKey }) => {
  const panelman = usePanelMan();

  if (!panelman) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-400">
        ⏳ در حال بارگذاری محیط...
      </div>
    );
  }


  const accessibleRoutes = panelman.getAccessibleRoutes();
  const routeExists = accessibleRoutes.includes(pageKey);

  console.log("🔍 DynamicPage Debug:", {
    pageKey,
    accessibleRoutes,
    routeExists,
    hasPanelMan: !!panelman
  });

  if (!routeExists) {
    return <NotFoundPage />;
  }

  // ✅ ساخت صفحه
  try {
    const pageContent = panelman.buildPage(pageKey);

    if (!pageContent) {
      return <NotFoundPage />;
    }

    console.log(`✅ Successfully built page: ${pageKey}`);
    return <>{pageContent}</>;

  } catch (error) {
    console.error(`💥 Error building page ${pageKey}:`, error);
    return (
      <div className="flex items-center justify-center w-full h-full bg-red-50 text-red-600">
        <div className="text-center">
          <div className="text-2xl mb-2">💥</div>
          <div>خطا در ساخت صفحه</div>
          <div className="text-sm mt-2">{pageKey}</div>
        </div>
      </div>
    );
  }
};

export default DynamicPage;