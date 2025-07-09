import { memo } from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'COMP/RCMP_menuItem_VAR.01_V00.04';
import SidebarLogo from 'COMP/RCMP_sidebarLogo_VAR.01_V00.04';
import { dataNav } from "../db";

const Sidebar = () => {
  // تابع انتخاب فعال برای مدیریت وضعیت آیتم‌ها
  // const handleItemSelect = useCallback((id) => {
  //   console.log(`Selected item: ${id}`);
  //   // افزودن لاجیک مربوطه (مثلاً آپدیت state یا روتینگ)
  // }, []);

  // اعتبارسنجی داده‌ها قبل از رندر
  const isValidNavData = Array.isArray(dataNav) && dataNav.length > 0;

  return (
    <aside
      className={`
        h-16
        w-full
        md:min-h-full
        md:rounded-xl
        md:w-24
        fixed
        md:static
        bottom-0
        left-0
        right-0
        z-50
        transition-all
        duration-300
        my-custom-card
        `}
      aria-label="Main navigation"
    >


      <nav className="flex md:flex-col items-center h-full">
        <ul
          className="flex
           md:flex-col
           items-center
           gap-1
           w-full
           h-full
           py-2
           md:py-1
           custom-scrollbar
           md:overflow-y-auto"
          role="menubar"
          aria-orientation="horizontal"
        >
          <li className="hidden md:flex items-center justify-center">
            <SidebarLogo />
          </li>
          {isValidNavData ? (
            dataNav.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-center w-full"
                role="none"
              >
                <MenuItem
                  {...item}
                />
              </li>
            ))
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

// اعتبارسنجی props
Sidebar.propTypes = {
  dataNav: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      icon: PropTypes.elementType,
      path: PropTypes.string,
    })
  ),
};

// مقدار پیش‌فرض برای props
Sidebar.defaultProps = {
  dataNav: [],
};

export default memo(Sidebar);
