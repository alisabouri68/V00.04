/******************************************
 * Component:      Navigation
 * Last Update:    2025.07.15
 * By:             APPS.00
 * Description:    Sidebar navigation menu (responsive)
 ******************************************/

/*------------------------------------------------------------
 * Meta Data
 *
 * ID:             RCOM_navigator
 * Title:          Component navigator - React Version
 * Version:        V00.04
 * VAR:            VAR 2  mobile
 * Last Update:    D2025.04.04
 * Owner:          APPS.00
 * Description:    Responsive sidebar for page navigation
 *------------------------------------------------------------*/

/**************************************
 * Step 01 - Import Dependencies
 **************************************/
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBriefcase,
  faHome,
  faLocationDot,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
/**************************************
 * Step 05 - Define property interface
 * Used to structure the navigation data
 **************************************/
interface DataNav {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}

/**************************************
 * Step 06 - Define Sidebar Navigation Component
 **************************************/
const Sidebar = () => {
  // Current route info
  const location = useLocation();

  // Navigation items for the sidebar
  const dataNav: DataNav[] = [
    {
      id: "1",
      icon: <FontAwesomeIcon icon={faHome} />,
      href: "/",
      title: "Home",
    },
    {
      id: "5",
      icon: <FontAwesomeIcon icon={faLocationDot} />,
      href: "/hot",
      title: "Hot",
    },
    {
      id: "4",
      icon: <FontAwesomeIcon icon={faMicrophone} />,
      href: "/cast",
      title: "cast",
    },
    {
      id: "3",
      icon: <FontAwesomeIcon icon={faBriefcase} />,
      href: "/gasma",
      title: "GASMA",
    },
    {
      id: "6",
      icon: <FontAwesomeIcon icon={faBookOpen} />,
      href: "/Mono",
      title: "Mono",
    },
  ];
  return (
    <div
      className="flex overflow-hidden w-full h-full transition-all border border-stone-300 dark:border-stone-900 duration-300 bg-light text-dark"
      aria-label="Main navigation"
    >
      <nav className="flex w-full items-center overflow-hidden">
        <ul
          className=" flex items-center gap-1 w-full h-full py-2"
          role="menubar"
          aria-orientation="vertical"
        >
          {/* Navigation items */}
          {dataNav.length > 0 ? (
            dataNav.map((item) => {
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
                    to={item.href}
                    className={`
                      flex
                      flex-col
                      items-center
                      justify-center
                      static
                      p-1
                      w-full
                      text-text-light-custom
                      
                      hover:text-primary
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`
                        flex items-center justify-center
                        p-2 rounded-full text-2xl
                        transition-all duration-300 w-10 h-10
                        ${isActive
                          ? "bg-primary text-light dark:text-text-white-custom hover:text-white-custom dark:hover:text-text-white-custom"
                          : "text-inherit"
                        }
                      `}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`
                        text-xs
                        font-medium
                        capitalize
                        transition-colors
                        duration-300
                        ${isActive ? "text-primary" : "text-inherit"}
                      `}
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="text-red-500 text-xs p-2 text-center">
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default memo(Sidebar);
