import  { memo } from 'react';
import PropTypes from 'prop-types';

// Assets
import logoDash from 'ASST/images/logo-dash.png';

const SidebarLogo = () => {
    return (
        <div className="hidden md:flex flex-col items-center py-3 select-none">
            {/* لوگو با لودینگ بهینه و اندازه‌های responsive */}
            <img
                src={logoDash}
                alt="Dashboard Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300 hover:scale-105"
                loading="lazy"
                width={48}
                height={48}
            />

            {/* عنوان با حروف‌چینی مناسب و حالت hover */}
            <span className="font-bold text-xs md:text-sm mt-2 md:mt-3 text-gray-800 dark:text-gray-200 tracking-wide hover:text-primary-500 transition-colors">
                RAAD HL
            </span>

            {/* خط جداکننده با انیمیشن */}
            <div className="w-10/12 h-px bg-gray-200 dark:bg-gray-600 rounded-full mt-2 md:mt-3 transition-all duration-500 group-hover:w-full" />
        </div>
    );
};

// اعتبارسنجی props
SidebarLogo.propTypes = {
    logo: PropTypes.string, // در صورت نیاز به پاس دادن لوگو به عنوان prop
    title: PropTypes.string, // در صورت نیاز به تغییر عنوان
};

// مقادیر پیش‌فرض
SidebarLogo.defaultProps = {
    logo: logoDash,
    title: "RAAD HL",
};

export default memo(SidebarLogo);