// LAYOUT/layoutMobile.tsx
import React from 'react';
import { Outlet } from "react-router-dom";

interface LayoutMobileProps {
  children?: React.ReactNode;
}

const LayoutMobile: React.FC<LayoutMobileProps> = () => {
  return (
    <div className="flex flex-wrap items-center w-full h-full overflow-hidden bg-gray-300 dark:bg-gray-500">
      {/* محتوای خاص موبایل */}
      <div className="w-full p-4 bg-blue-500 text-white">
        <h1>📱 نسخه موبایل</h1>
      </div>
      
      {/* نمایش محتوای صفحات */}
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutMobile;