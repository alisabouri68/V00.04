import { memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../RDUX/store";
import { loadQuickAccessFromLocalStorage } from "../../RDUX/quickAccessSlice/initQuickAccess";
import logoDash from "ASST/images/Asset 5.svg";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { iconMap } from "COMP/RCMP_consoleBasket_VAR.01_V00.04";
export interface DataNav {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  para?: boolean;
  lock?: boolean;
  pin?: boolean;
}
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const quickAccessItems = useSelector((state: RootState) => state.quickAccess.items);
  const defaultDataNav: DataNav[] = [
    {
      id: "1",
      icon: <GoHome />,
      href: "/",
      title: "Home",
    },
    {
      id: "5",
      icon: <MdOutlineLocalFireDepartment />,
      href: "/hot",
      title: "Hot",
    },
  ];
  const dataNav: DataNav[] = quickAccessItems.length > 0
    ? quickAccessItems
      .filter(item => item.title)
      .map(item => {
        return {
          id: item.id,
          href: item.href,
          title: item.title,
          icon: iconMap[item.icon] ?? <GoHome />,
        };
      })
    : defaultDataNav;

  useEffect(() => {
    dispatch(loadQuickAccessFromLocalStorage());
  }, [dispatch]);

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
        <ul
          className="flex flex-col items-center gap-1 w-full shadow-inner h-full py-2 md:py-1 custom-scrollbar overflow-y-auto"
          role="menubar"
          aria-orientation="vertical"
        >
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
                      ${isActive ? "border-s-primary" : "border-s-transparent"}
                      border-s-4
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
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(Sidebar);
