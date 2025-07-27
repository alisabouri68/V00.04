/******************************************
 * Component:      Navigation
 * Last Update:    2025.07.14
 * By:             APPS.00
 * Description:    Sidebar navigation menu (responsive)
 ******************************************/

/*------------------------------------------------------------
 * Meta Data
 *
 * ID:             RCOM_navigator
 * Title:          Component navigator - React Version
 * Version:        V00.04
 * VAR:            VAR 1 desktop
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
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import logoDash from "ASST/images/Asset 5.svg";

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
    // {
    //   id: "2",
    //   icon: <FontAwesomeIcon icon={faPhoneVolume} />,
    //   href: "/Flat",
    //   title: "Flat",
    // },
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
    <aside
      className="
        flex
        flex-col
        rounded-lg
        overflow-hidden
        min-w-[80px]
        max-w-[80px]
        transition-all
        dark:border
        dark:border-gray-950
        bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300
        h-full
      "
      aria-label="Main navigation"
    >
      <div className="flex flex-col items-center justify-center py-3 select-none bg-gradient-to-b from-white to-transparent dark:from-gray-900">
        <img
          src={logoDash}
          alt="Dashboard Logo"
          className="w-10 h-10 md:w-12 md:h-12 object-contain hover:scale-105"
          loading="lazy"
          width={80}
          height={80}
        />
        <div className="w-10/12 h-px rounded-full mt-2 md:mt-3 group-hover:w-full" />
      </div>
      <nav className="relative flex w-full h-full md:flex-col items-center">
        {/* <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 
            bg-gradient-to-b from-gray-500 to-transparent dark:from-gray-900 z-50"></div> */}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 
           bg-gradient-to-t from-white to-transparent dark:from-gray-900 z-10"></div>


        <ul
          className=" flex flex-col items-center gap-1 w-full shadow-inner h-full py-2 md:py-1 custom-scrollbar overflow-y-auto"
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
                      ${isActive ? "border-s-primary" : ""}
                      border-4
                      border-transparent
                      flex
                      flex-col
                      items-center
                      justify-center
                      p-1
                      w-full
                      bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300
                      hover:text-primary
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`
                        flex items-center justify-center
                        p-2 rounded-full text-2xl
                        transition-all w-10 h-10
                        ${isActive
                          ? "bg-primary bg-transparent text-primary text-light-custom"
                          : "text-inherit"
                        }
                      `}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`
                        text-sm
                        font-medium
                        capitalize
                        transition-colors
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
              Navigation data not available
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(Sidebar);
