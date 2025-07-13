import { memo } from "react";
import SidebarLogo from "COMP/RCMP_sidebarLogo_VAR.01_V00.04";
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

interface DataNav {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar = () => {
  const location = useLocation();

  const dataNav: DataNav[] = [
    {
      id: "1",
      title: "home",
      icon: <FontAwesomeIcon icon={faHome} />,
      href: "/",
    },
    {
      id: "2",
      title: "comm",
      icon: <FontAwesomeIcon icon={faPhoneVolume} />,
      href: "/comm",
    },
    {
      id: "3",
      title: "desk",
      icon: <FontAwesomeIcon icon={faBriefcase} />,
      href: "/desk",
    },
    {
      id: "4",
      title: "cast",
      icon: <FontAwesomeIcon icon={faMicrophone} />,
      href: "/cast",
    },
    {
      id: "5",
      title: "hot",
      icon: <FontAwesomeIcon icon={faLocationDot} />,
      href: "/hot",
    },
    {
      id: "6",
      title: "wikiCnter",
      icon: <FontAwesomeIcon icon={faBookOpen} />,
      href: "/mono/wikicntr/desk",
    },
  ];

  return (
    <aside
      className="
        hidden
        md:flex
        rounded-xl
        overflow-hidden
        w-24
        transition-all
        duration-300
        my-custom-card
        h-full
      "
      aria-label="Main navigation"
    >
      <nav className="flex w-full md:flex-col items-center overflow-hidden">
        <ul
          className="
            flex
            flex-col
            items-center
            gap-1
            w-full
            py-2
            md:py-1
            custom-scrollbar
            overflow-y-auto
          "
          role="menubar"
          aria-orientation="vertical"
        >
          <li className="flex items-center justify-center">
            <SidebarLogo />
          </li>

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
                            ? "bg-primary bg-transparent text-primary"
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
                        md:text-sm
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
              Navigation data not available
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(Sidebar);
