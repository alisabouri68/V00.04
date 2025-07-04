import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export type MenuItemProps = {
    title: string;
    icon: React.ReactNode;
    path?: string; // Optional custom path
};

const MenuItem = ({ icon, title, path: customPath }: MenuItemProps) => {
    const location = useLocation();

    // Calculate path with custom path support and home handling
    const getPath = () => {
        if (customPath) return customPath;
        return title.toLowerCase() === 'home' ? '/' : `/${title.toLowerCase()}`;
    };

    const path = getPath();
    const isActive = location.pathname === path ||
        (title.toLowerCase() === 'home' && location.pathname === '/');

    return (
        <li className="flex items-center justify-center w-full">
            <Link
                to={path}
                className="flex flex-col items-center justify-center p-2 w-full group"
                aria-current={isActive ? 'page' : undefined}
            >
                <span
                    className={`
            flex items-center justify-center
            text-2xl p-2 rounded-full
            transition-all duration-300
            ${isActive
                            ? 'bg-danger text-white md:bg-transparent md:text-primary'
                            : 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary'
                        }
          `}
                    aria-hidden="true"
                >
                    {icon}
                </span>
                <span
                    className={`
            mt-1 text-xs md:text-sm font-medium capitalize
            transition-colors duration-300
            ${isActive
                            ? 'text-primary'
                            : 'text-gray-600 group-hover:text-primary dark:text-gray-300 dark:group-hover:text-primary'
                        }
          `}
                >
                    {title}
                </span>
            </Link>
        </li>
    );
};

export default memo(MenuItem);