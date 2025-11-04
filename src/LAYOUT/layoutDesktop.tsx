// LAYOUT/layoutDesktop.tsx
import React from "react";
import { Outlet } from "react-router-dom";
interface LayoutDesktopProps {
  children?: React.ReactNode;
}

const LayoutDesktop: React.FC<LayoutDesktopProps> = () => {
  return <Outlet />;
};

export default LayoutDesktop;
