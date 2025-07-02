import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Type declaration for menu items
export type MenuItemType = {
    title: string;
    icon: React.ReactNode;
};

function Index({ icon, title }: MenuItemType) {
    const location = useLocation();
    const path = `/${title === 'home' ? '' : title.toLowerCase()}`;

    const isActive = location.pathname === path;

    return (
        <li>
            <Link to={path} className="flex flex-col items-center">
                <span className={`text-2xl duration-300 p-2 ${isActive ? 'bg-[#78C4D6] md:bg-transparent md:text-[#78C4D6] rounded-full text-white' : ''}`}>
                    {icon}
                </span>
                <span
                    className={`text-sm mt-3 font-bold capitalize tracking-wider duration-300 ${isActive ? 'text-[#78C4D6]' : ''
                        }`}
                >
                    {title}
                </span>
            </Link>
        </li>
    );
}

export default memo(Index);
