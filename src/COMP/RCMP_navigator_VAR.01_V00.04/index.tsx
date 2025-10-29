// COMP/RCMP_sidebar/index.tsx
import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDash from "ASST/images/Asset 5.svg";
import { iconMap, initialData } from "COMP/RCMP_consoleBasket_VAR.01_V00.04";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

export interface DataNav {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  para?: boolean;
  lock?: boolean;
  pin?: boolean;
}

interface ConsItem {
  id: string;
  value?: boolean;
  enabled?: boolean;
  path?: string;
  name?: string;
}

type ConsType = Record<string, ConsItem>;

const Sidebar = () => {
  const location = useLocation();
  const [cons, setCons] = useState<ConsType>({});
  const [filteredNav, setFilteredNav] = useState<DataNav[]>([]);

  const { envi } = initDyna();
  
  const updateCons = () => {
    setCons(envi.ENVI_CONS || {});
  };

  useEffect(() => {
    updateCons();
  }, []);

  // تبدیل cons به map ساده {id: boolean}
  const normalizeCons = (consData: ConsType | undefined): Record<string, boolean> => {
    if (!consData) return {};
    
    return Object.values(consData).reduce<Record<string, boolean>>((acc, item) => {
      // استفاده از value یا enabled (هر کدام که موجود باشد)
      acc[item.id] = item.value !== undefined ? item.value : (item.enabled || false);
      return acc;
    }, {});
  };

  useEffect(() => {
    const consoleMap = normalizeCons(cons);
    
    console.log('ENVI_CONS:', cons); // برای دیباگ
    console.log('Normalized console map:', consoleMap); // برای دیباگ

    const allNavItems = [
      ...initialData.General,
      ...initialData.Community,
      ...initialData["Mono Service"],
    ];

    const navItems = allNavItems
      .map((item) => ({
        id: item.id,
        title: item.title,
        icon: iconMap[item.icon] || <div>{item.title.charAt(0)}</div>,
        href: item.href,
        para: item.para,
        lock: item.lock,
        pin: item.pin,
      }))
      .filter((item) => {
        const isEnabled = consoleMap[item.id] === true;
        console.log(`Item ${item.id} enabled:`, isEnabled); // برای دیباگ
        return isEnabled;
      });

    setFilteredNav(navItems);
  }, [cons]);

  // برای دیباگ - نمایش وضعیت cons
  useEffect(() => {
    console.log('Current ENVI_CONS:', cons);
    console.log('Filtered nav items:', filteredNav);
  }, [cons, filteredNav]);

  return (
    <aside
      className="min-w-[75px] max-w-[75px] flex flex-col rounded-lg overflow-hidden bg-light text-dark h-full"
      aria-label="Main navigation"
    >
      {/* logo */}
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

      {/* nav list */}
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
                <li key={item.id} className="flex items-center justify-center w-full" role="none">
                  <Link
                    to={item.href}
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
                      {item.icon}
                    </span>
                    <span className={`text-sm font-medium capitalize ${isActive ? "text-primary" : "text-inherit"}`}>
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="text-red-500 text-xs p-2 text-center">
              No navigation items available
              <br />
              <small>ENVI_CONS: {JSON.stringify(cons)}</small>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(Sidebar);