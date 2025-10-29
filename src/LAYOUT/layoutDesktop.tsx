// LAYOUT/layoutDesktop.tsx
import React from 'react';
import { Outlet } from "react-router-dom";
interface LayoutDesktopProps {
  children?: React.ReactNode;
}

const LayoutDesktop: React.FC<LayoutDesktopProps> = () => {
  return (
    <div className="flex flex-wrap items-center w-full h-full overflow-hidden bg-gray-800 dark:bg-gray-900 text-white">

      <Outlet />
    </div>
  );
};

export default LayoutDesktop;