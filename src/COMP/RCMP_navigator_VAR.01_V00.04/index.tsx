import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDash from "ASST/images/Asset 5.svg";
import { iconMap,initialData } from "COMP/RCMP_consoleBasket_VAR.01_V00.04";
import { useGlobalState } from "RDUX/dynamanContext";

export interface DataNav {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  para?: boolean;
  lock?: boolean;
  pin?: boolean;
}

interface ConsoleItem {
  homeServiceGeneral: boolean;
  hotserviceGeneral: boolean;
  Cast: boolean;
  Gasma: boolean;
  wikiCnter: boolean;
}

const Sidebar = () => {
  const location = useLocation();
  const { globalState } = useGlobalState();
  const [filteredNav, setFilteredNav] = useState<DataNav[]>([]);

  // تابع برای گرفتن آیکون از iconMap
  const getIconComponent = (iconName: string, title: string) => {
    return iconMap[iconName] || <div>{title.charAt(0)}</div>; // fallback با حرف اول عنوان
  };

  useEffect(() => {
    // ترکیب تمام آیتم‌های نویگیشن از تمام بخش‌های initialData
    const allNavItems = [
      ...initialData.General,
      ...initialData.Community,
      ...initialData["Mono Service"]
    ];

    // تبدیل به فرمت DataNav و فیلتر کردن
    const navItems = allNavItems
      .map(item => ({
        id: item.id,
        title: item.title,
        icon: getIconComponent(item.icon, item.title),
        href: item.href,
        para: item.para,
        lock: item.lock,
        pin: item.pin
      }))
      .filter(item => {
        // بررسی وجود consoleItem در globalState
        if (!globalState.consoleItem) return false;
        
        // اگر آیتم در consoleItem وجود دارد، بر اساس مقدار آن فیلتر شود
        if (item.id in globalState.consoleItem) {
          return globalState.consoleItem[item.id as keyof ConsoleItem] === true;
        }
        
        // اگر آیتم در consoleItem وجود ندارد، نشان داده نشود
        return false;
      });

    setFilteredNav(navItems);
  }, [globalState.consoleItem]);

  return (
    <aside
      className="
       w-full
         flex
         flex-col
         rounded-lg
         overflow-hidden
         dark:border
         dark:border-stone-950
          bg-light text-dark
         h-full
       "
      aria-label="Main navigation"
    >
      <div className="flex flex-col items-center justify-center py-3 select-none bg-gradient-to-b from-light to-transparent ">
        <img
          src={logoDash}
          alt="Dashboard Logo"
          className="w-10 h-10 md:w-12 md:h-12 hover:scale-105"
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
          {filteredNav.length > 0 ? (
            filteredNav.map((item) => {
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
                        bg-light text-dark
                       hover:text-primary
                     `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`
                         flex items-center justify-center
                         p-2 rounded-full text-2xl
                         transition-all w-10 h-10
                         ${
                           isActive
                             ? "bg-transparent text-primary"
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
              No navigation items available
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(Sidebar);