import { useState, useEffect, useRef } from 'react';
import Container from "../COMP/RCOM_container";
import { GrMoreVertical } from "react-icons/gr";
import Logo from "../ASST/images/logo-dash.png";
import Avatar from "../ASST/images/avatar.png";
import { GoSun, GoMoon } from "react-icons/go";
import { MdKeyboardArrowDown, MdNotifications } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import Modal from "../BOX/BOX_modal";
import { FiLogOut, FiSettings, FiUser, FiMail } from "react-icons/fi";
import HeaderSwitch from "../COMP/RCOM_switch-header"
const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const unreadNotifications = 3

    const themeRef = useRef<HTMLDivElement>(null);
    const languageRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // Handle dark mode toggle
    // const toggleDarkMode = () => {
    //     const newDarkMode = !darkMode;
    //     setDarkMode(newDarkMode);
    //     document.documentElement.classList.toggle('dark', newDarkMode);
    //     localStorage.setItem('darkMode', newDarkMode.toString());
    // };

    // Initialize dark mode from localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
        document.documentElement.classList.toggle('dark', savedDarkMode);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
                setIsThemeOpen(false);
            }
            if (languageRef.current && !languageRef.current.contains(e.target as Node)) {
                setIsLanguageOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdowns when pressing Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsThemeOpen(false);
                setIsLanguageOpen(false);
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Theme options
    const themeOptions = [
        { id: 'light', name: 'Light', icon: <GoSun className="text-yellow-500" /> },
        { id: 'dark', name: 'Dark', icon: <GoMoon className="text-indigo-500" /> },
        { id: 'system', name: 'System Default', icon: <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div> }
    ];

    // Language options
    const languageOptions = [
        { id: 'en', name: 'English' },
        { id: 'fa', name: 'فارسی (Persian)' },
        { id: 'es', name: 'Español (Spanish)' },
        { id: 'fr', name: 'Français (French)' }
    ];

    return (
        <>
            <header className="w-full shadow-md bg-white dark:bg-gray-800 transition-colors duration-300 sticky top-0 z-40">
                <div className="h-16 flex items-center">
                    <Container>
                        <div className="w-full flex items-center justify-between">
                            {/* Left Section */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <img
                                        src={Logo}
                                        alt="Raad Health Logo"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        mono (mono)
                                    </span>
                                </div>
                                <button
                                    aria-label="More options"
                                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <GrMoreVertical className="text-xl text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            {/* Right Section */}
                            <div className="flex items-center space-x-4">
                                {/* Notifications */}
                                <div className="relative">
                                    <button
                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                                        aria-label="Notifications"
                                    >
                                        <MdNotifications className="text-xl text-gray-600 dark:text-gray-400" />
                                        {unreadNotifications > 0 && (
                                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {unreadNotifications}
                                            </span>
                                        )}
                                    </button>
                                </div>

                                {/* Theme Selector */}
                                <div className="relative" ref={themeRef}>
                                    <button
                                        className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setIsThemeOpen(!isThemeOpen)}
                                        aria-expanded={isThemeOpen}
                                        aria-label="Theme selector"
                                    >
                                        {darkMode ? (
                                            <GoMoon className="text-xl text-gray-600 dark:text-gray-400" />
                                        ) : (
                                            <GoSun className="text-xl text-gray-600 dark:text-gray-400" />
                                        )}
                                        <span className="hidden md:inline text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Theme
                                        </span>
                                        <MdKeyboardArrowDown className="text-xl text-gray-600 dark:text-gray-400" />
                                    </button>

                                    {/* Theme Dropdown */}
                                    {isThemeOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                            {themeOptions.map((theme) => (
                                                <button
                                                    key={theme.id}
                                                    className={`flex items-center w-full px-4 py-2 text-sm text-left ${(darkMode && theme.id === 'dark') ||
                                                        (!darkMode && theme.id === 'light')
                                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                                        }`}
                                                    onClick={() => {
                                                        if (theme.id === 'light') setDarkMode(false);
                                                        if (theme.id === 'dark') setDarkMode(true);
                                                        setIsThemeOpen(false);
                                                    }}
                                                >
                                                    <span className="mr-3">{theme.icon}</span>
                                                    {theme.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Language Selector */}
                                <div className="relative" ref={languageRef}>
                                    <button
                                        className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                        aria-expanded={isLanguageOpen}
                                        aria-label="Language selector"
                                    >
                                        <GrLanguage className="text-xl text-gray-600 dark:text-gray-400" />
                                        <span className="hidden md:inline text-sm font-medium text-gray-600 dark:text-gray-300">
                                            English
                                        </span>
                                        <MdKeyboardArrowDown className="text-xl text-gray-600 dark:text-gray-400" />
                                    </button>

                                    {/* Language Dropdown */}
                                    {isLanguageOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                            {languageOptions.map((lang) => (
                                                <button
                                                    key={lang.id}
                                                    className={`w-full px-4 py-2 text-sm text-left ${lang.id === 'en'
                                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                                        }`}
                                                    onClick={() => setIsLanguageOpen(false)}
                                                >
                                                    {lang.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* User Profile */}
                                <div className="relative" ref={profileRef}>
                                    <button
                                        className="flex items-center space-x-3 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        aria-expanded={isProfileOpen}
                                        aria-label="User menu"
                                    >
                                        <div className="flex-shrink-0 relative">
                                            <img
                                                src={Avatar}
                                                alt="User avatar"
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-800"></span>
                                        </div>
                                        <div className="hidden md:flex flex-col items-start">
                                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                Hana Rezaei
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                Tehran
                                            </span>
                                        </div>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Hana Rezaei</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">hana.rezaei@example.com</p>
                                            </div>
                                            <div className="py-1">
                                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                                    <FiUser className="mr-3" /> Profile
                                                </button>
                                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                                    <FiMail className="mr-3" /> Messages
                                                </button>
                                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                                    <FiSettings className="mr-3" /> Settings
                                                </button>
                                            </div>
                                            <div className="py-1 border-t border-gray-100 dark:border-gray-700">
                                                <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                                                    <FiLogOut className="mr-3" /> Sign out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="custom-styles"
            >
                <HeaderSwitch onCloseClick={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default Header;