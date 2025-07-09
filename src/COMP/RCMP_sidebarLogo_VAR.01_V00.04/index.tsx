import  { memo } from 'react';
import PropTypes from 'prop-types';

// Assets
import logoDash from 'ASST/images/Asset 5.svg';

const SidebarLogo = () => {
    return (
        <div className="hidden md:flex flex-col items-center py-3 select-none">
            {/* لوگو با لودینگ بهینه و اندازه‌های responsive */}
            <img
                src={logoDash}
                alt="Dashboard Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300 hover:scale-105"
                loading="lazy"
                width={68}
                height={68}
            />
            {/* خط جداکننده با انیمیشن */}
            <div className="w-10/12 h-px rounded-full mt-2 md:mt-3 transition-all duration-500 group-hover:w-full" />
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