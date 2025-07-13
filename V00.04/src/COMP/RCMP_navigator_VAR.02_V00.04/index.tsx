import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
  ];

  return (
    <div
      className="
        w-full
        md:hidden
        fixed
        bottom-0
        left-0
        right-0
        z-50
        transition-all
        duration-300
        my-custom-card
      "
      aria-label="Main navigation"
    >
      <nav className="flex items-center h-full">
        <ul
          className="
            flex
            items-center
            gap-1
            w-full
            h-full
            py-2
            custom-scrollbar
          "
          role="menubar"
          aria-orientation="horizontal"
        >
          {dataNav.length > 0 ? (
            dataNav.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.title.toLowerCase() === "home" &&
                  location.pathname === "/");

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
                            ? "bg-primary text-white"
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
              Navigation data not available
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default memo(Sidebar);
