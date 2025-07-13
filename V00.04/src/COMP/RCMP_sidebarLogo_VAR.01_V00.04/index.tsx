import { memo } from "react";

import logoDash from "ASST/images/Asset 5.svg";

const SidebarLogo = () => {
  return (
    <div className="hidden md:flex flex-col items-center py-3 select-none">
      <img
        src={logoDash}
        alt="Dashboard Logo"
        className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300 hover:scale-105"
        loading="lazy"
        width={80}
        height={80}
      />
      <div className="w-10/12 h-px rounded-full mt-2 md:mt-3 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default memo(SidebarLogo);
