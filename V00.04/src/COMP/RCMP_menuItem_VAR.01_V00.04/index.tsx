import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

export type MenuItemProps = {
  title: string;
  icon: React.ReactNode;
  path?: string; // Optional custom path
};

const MenuItem = ({ icon, title, path: customPath }: MenuItemProps) => {
  const location = useLocation();

  // Calculate path with custom path support and home handling
  const getPath = () => {
    if (customPath) return customPath;
    return title.toLowerCase() === "home" ? "/" : `/${title.toLowerCase()}`;
  };

  const path = getPath();
  const isActive =
    location.pathname === path ||
    (title.toLowerCase() === "home" && location.pathname === "/");

  return (
    <Link
      to={path}
      className={`
                 ${isActive ? "md:border-s-primary" : ""}
                   md:border-4
                   md:border-transparent
                   flex
                   flex-col
                   items-center
                   justify-center
                   p-1
                   w-full
                   hover:text-primary
                   `}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={`
            flex items-center justify-center
            p-2 rounded-full text-2xl
            transition-all duration-300 w-10 h-10
            ${
              isActive
                ? "bg-primary text-white md:bg-transparent md:text-primary"
                : "text-inherit"
            }
          `}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span
        className={`
            text-xs
            md:text-sm
            font-medium
            capitalize
            transition-colors
            duration-300
            ${
              isActive
                ? "text-primary"
                : `
                     text-inherit`
            }
          `}
      >
        {title}
      </span>
    </Link>
  );
};

export default memo(MenuItem);
