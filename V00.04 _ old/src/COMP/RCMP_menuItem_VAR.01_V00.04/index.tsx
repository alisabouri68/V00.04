import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Type declaration for menu items
export type MenuItemType = {
    icon: any;
    label: string;
    isActive?: boolean;
};

function Index({ icon, label, isActive }: MenuItemType) {
    return (
        <div className="flex flex-col items-center">
            <FontAwesomeIcon
                className={`w-8 h-8 ${isActive ? 'text-blue-400' : 'text-gray-400'}`}
                icon={icon}
            />
            <span
                className={`text-sm mt-3 font-bold ${
                    isActive ? 'text-blue-400' : 'text-gray-400'
                }`}>
                {label}
            </span>
        </div>
    );
}

export default memo(Index);
