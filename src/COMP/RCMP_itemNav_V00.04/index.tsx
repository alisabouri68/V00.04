// COMP/RCMP_itemNav/index.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ItemNavProps {
  id?: string;
  title?: string;
  icon?: string;
  href?: string;
  enabled?: boolean;
}

const ItemNav: React.FC<ItemNavProps> = ({ 
  id = "",
  title = "آیتم",
  icon = "●",
  href = "#",
  enabled = true 
}) => {
  const location = useLocation();
  const isActive = location.pathname === href || (href === "/" && location.pathname === "/");

  if (!enabled) return null;

  return (
    <li className="flex items-center justify-center w-full" role="none">
      <Link
        to={href}
        className={`${
          isActive ? "border-s-primary" : "border-s-transparent"
        } border-s-4 flex flex-col items-center justify-center p-1 w-full bg-light text-dark hover:text-primary`}
        aria-current={isActive ? "page" : undefined}
      >
        <span
          className={`flex items-center justify-center p-2 rounded-full text-2xl transition-all w-10 h-10 ${
            isActive ? "bg-transparent text-primary" : "text-inherit"
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className={`text-sm font-medium capitalize ${isActive ? "text-primary" : "text-inherit"}`}>
          {title}
        </span>
      </Link>
    </li>
  );
};

export default ItemNav;