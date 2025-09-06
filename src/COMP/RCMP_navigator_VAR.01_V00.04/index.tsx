import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDash from "ASST/images/Asset 5.svg";
import { iconMap, initialData } from "COMP/RCMP_consoleBasket_VAR.01_V00.04";
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

// هر filed در packet_2
interface PacketItem {
  id: string;
  value: boolean;
}

// packet_2: { filed_1: PacketItem; filed_2: PacketItem; ... }
type Packet2 = Record<string, PacketItem>;

const Sidebar = () => {
  const location = useLocation();
  const { globalState } = useGlobalState();
  const packet_2: Packet2 | undefined = globalState?.packet_2;

  const [filteredNav, setFilteredNav] = useState<DataNav[]>([]);

  // گرفتن آیکون از iconMap
  const getIconComponent = (iconName: string, title: string) => {
    return iconMap[iconName] || <div>{title.charAt(0)}</div>; // fallback
  };

  // تبدیل packet_2 به map ساده { id: value }
  const normalizePacket = (packet: Packet2 | undefined): Record<string, boolean> => {
    if (!packet) return {};
    return Object.values(packet).reduce<Record<string, boolean>>((acc, filed) => {
      acc[filed.id] = filed.value;
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!packet_2) {
      setFilteredNav([]);
      return;
    }

    const consoleMap = normalizePacket(packet_2);

    // ترکیب همه آیتم‌ها
    const allNavItems = [
      ...initialData.General,
      ...initialData.Community,
      ...initialData["Mono Service"],
    ];

    // مپ و فیلتر کردن
    const navItems = allNavItems
      .map((item) => ({
        id: item.id,
        title: item.title,
        icon: getIconComponent(item.icon, item.title),
        href: item.href,
        para: item.para,
        lock: item.lock,
        pin: item.pin,
      }))
      .filter((item) => consoleMap[item.id] === true);

    setFilteredNav(navItems);
  }, [packet_2]);

  return (
    <aside
      className="
       w-full
       flex flex-col
       rounded-lg
       overflow-hidden
       dark:border dark:border-stone-950
       bg-light text-dark
       h-full
      "
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
                <li
                  key={item.id}
                  className="flex items-center justify-center w-full"
                  role="none"
                >
                  <Link
                    to={item.href}
                    className={`
                       ${isActive ? "border-s-primary" : "border-s-transparent"}
                       border-s-4 flex flex-col
                       items-center justify-center
                       p-1 w-full
                       bg-light text-dark hover:text-primary
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
                         text-sm font-medium capitalize
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
