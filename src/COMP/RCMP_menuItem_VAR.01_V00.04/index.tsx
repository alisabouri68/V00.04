import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
// Type declaration for menu items
export type MenuItemType = {
    icon: any;
    label: string;
    isActive?: boolean;
};

function Index({ icon, label, isActive }: MenuItemType) {
    return (
        <li >
            <Link to={label} className="flex flex-col items-center">
            <FontAwesomeIcon
                className={`w-7 h-7 ${isActive ? 'text-[#78C4D6]' : 'text-gray-400'}`}
                icon={icon}
            />
            <span
                className={`text-sm mt-3 font-bold ${isActive ? 'text-[#78C4D6]' : 'text-gray-400'
                    }`}>
                {label}
            </span>
            </Link>
        </li>
    );
}

export default memo(Index);
