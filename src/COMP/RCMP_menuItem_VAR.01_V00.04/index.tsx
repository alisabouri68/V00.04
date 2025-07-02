import React, { memo } from 'react';
import { Link } from 'react-router-dom';
// Type declaration for menu items
export type MenuItemType = {
    title: string
    icon: React.ReactNode
    isActive?: boolean;
};

function Index({ icon, title, isActive }: MenuItemType) {
    return (
        <li >
            <Link to={`/${title === "home" ? "" : title.toLocaleLowerCase()}`} className="flex flex-col items-center">
                <span
                    className={`text-2xl ${isActive ? 'text-[#78C4D6]' : ''}`}
                >
                    {icon}
                </span>
                <span
                    className={`text-sm mt-3 font-bold capitalize tracking-wider  ${isActive ? 'text-[#78C4D6]' : ''}`}>
                    {title}
                </span>
            </Link>
        </li>
    );
}

export default memo(Index);
