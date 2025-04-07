import React, { memo } from 'react';
import {
    faBriefcase,
    faHome,
    faLocationCrosshairs,
    faPhoneVolume,
    faPodcast,
} from '@fortawesome/free-solid-svg-icons';
import MenuItem, { MenuItemType } from 'COMP/RCMP_menuItem_VAR.01_V00.04';
import ActiveIndicator from 'COMP/RCMP_seperator_VAR.01_V00.04';
import SidebarLogo from 'COMP/RCMP_sidebarLogo_VAR.01_V00.04';

/**
 * Sidebar Navigation Component
 *
 * A vertical navigation sidebar featuring:
 * - Application logo at the top
 * - Icon-based menu items
 * - Active item indicator
 * - Memoized for performance optimization
 *
 * @component
 * @example
 * <Sidebar />
 */
const Sidebar = () => {
    /**
     * Menu configuration array
     * @type {MenuItemType[]}
     * @property {IconDefinition} icon - FontAwesome icon
     * @property {string} label - Display text for menu item
     * @property {boolean} [isActive] - Marks active menu item
     */
    const menuItems: MenuItemType[] = [
        { icon: faHome, label: 'Home' },
        { icon: faPhoneVolume, label: 'Comm' },
        { icon: faBriefcase, label: 'Desk', isActive: true },
        { icon: faPodcast, label: 'Cast' },
        { icon: faLocationCrosshairs, label: 'Hot' },
    ];

    return (
        /**
         * Sidebar Container
         * - Uses truncate to handle overflow
         * - Fixed width (implied by layout)
         */
        <aside className="truncate">
            {/* Application Logo */}
            <SidebarLogo />

            {/* Navigation Menu */}
            <nav className="flex flex-col items-center gap-6 mb-6">
                {menuItems.map((item) => (
                    <div key={item.label} className="flex items-center" role="menuitem">
                        {/* Active Item Indicator */}
                        {item.isActive && <ActiveIndicator />}

                        {/* Menu Item Component */}
                        <MenuItem {...item} />
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default memo(Sidebar);
