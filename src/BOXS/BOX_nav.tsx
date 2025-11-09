import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiMic,
  FiBookOpen,
  FiStar,
} from "react-icons/fi"; // ← آیکن‌های جدید
import logoDash from "ASST/images/Asset 5.svg";
import { ReactNode } from "react";
import { FaGripfire } from "react-icons/fa";

export interface NavItem {
  id?: string;
  title?: string;
  icon?: ReactNode;
  href?: string;
  enabled?: boolean;
}

interface BoxNavProps {
  navItems?: NavItem[];
}

function BOX_nav({ navItems = [] }: BoxNavProps) {
  const location = useLocation();

  // آیتم‌های پیش‌فرض با آیکن‌های react-icons
  const defaultNavItems: NavItem[] = [
    {
      id: "home",
      title: "Home",
      icon: <FiHome />,
      href: "/",
      enabled: true,
    },
    {
      id: "hot",
      title: "Bionet calls",
      icon: <FaGripfire />,
      href: "/hot",
      enabled: true,
    },
    {
      id: "cast",
      title: "Cast",
      icon: <FiMic />,
      href: "/cast",
      enabled: true,
    },
    {
      id: "wiki",
      title: "Wiki",
      icon: <FiBookOpen />,
      href: "/wiki",
      enabled: true,
    },
    {
      id: "gasma",
      title: "Gasma",
      icon: <FiStar />,
      href: "/gasma",
      enabled: true,
    },
  ];

  // اگر props.navItems داده شده، از اون استفاده کن
  const itemsToRender = navItems.length > 0 ? navItems : defaultNavItems;

  // فقط آیتم‌های فعال
  const filteredNav = itemsToRender.filter((item) => item.enabled !== false);

  return (
    <aside
      className="min-w-[75px] max-w-[75px] flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 text-dark h-full"
      aria-label="Main navigation"
    >
      {/* logo */}
      <div className="flex flex-col items-center justify-center py-3 select-none bg-gradient-to-b from-light to-transparent">
        <img
          src={logoDash}
          alt="Dashboard Logo"
          className="w-10 h-10 md:w-12 md:h-12 hover:scale-105 transition-transform"
          loading="lazy"
          width={80}
          height={80}
        />
        <div className="w-10/12 h-px rounded-full mt-2 md:mt-3 group-hover:w-full bg-gray-200" />
      </div>

      {/* nav list */}
      <nav className="relative flex w-full h-full md:flex-col items-center">
        <ul
          className="flex flex-col items-center gap-1 w-full shadow-inner h-full py-2 md:py-1 custom-scrollbar overflow-y-auto"
          role="menubar"
          aria-orientation="vertical"
        >
          {filteredNav.map((item: NavItem) => {
            const isActive =
              location.pathname === item.href ||
              (item.href === "/" && location.pathname === "/");

            return (
              <li
                key={item.id}
                className="flex items-center justify-center w-full"
                role="none"
              >
                <Link
                  to={item.href || "#"}
                  className={`${
                    isActive
                      ? "border-s-primary text-primary"
                      : "border-s-transparent text-dark"
                  } border-s-4 flex flex-col items-center justify-center p-1 w-full  bg-white dark:bg-gray-800 hover:text-primary transition-colors`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={`flex items-center justify-center p-2 rounded-full text-2xl transition-all w-10 h-10 ${
                      isActive ? "text-primary" : "text-inherit"
                    }`}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`text-sm font-medium capitalize ${
                      isActive ? "text-primary" : "text-inherit"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default BOX_nav;
