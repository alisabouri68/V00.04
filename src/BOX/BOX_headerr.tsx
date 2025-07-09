import { useState, useEffect, useRef } from 'react';
import Container from "../COMP/RCOM_container";
import { GrMoreVertical } from "react-icons/gr";
import Logo from "../ASST/images/logo-dash.svg";
import Avatar from "../ASST/images/avatar.png";
import { MdKeyboardArrowDown} from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import Modal from "../BOX/BOX_modal";
import { FiLogOut, FiSettings, FiUser, FiMail } from "react-icons/fi";
import HeaderSwitch from "../COMP/RCOM_switch-header"
import ThemeSelect from "../COMP/RCMP_them-switcher"
const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    // const [darkMode, setDarkMode] = useState<boolean>(false);
    const languageRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
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
                setIsLanguageOpen(false);
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);
    // Language options
    const languageOptions = [
        { id: 'en', name: 'English' },
        { id: 'fa', name: 'فارسی (Persian)' },
        { id: 'es', name: 'Español (Spanish)' },
        { id: 'fr', name: 'Français (French)' }
    ];

    return (
        <>
            <header className="w-full shadow-sm dark:shadow-sm-light custom-card">
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
                                    <span className="font-medium">
                                        mono (mono)
                                    </span>
                                </div>
                                <button
                                    aria-label="More options"
                                    className="p-1 rounded-md transition-colors"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <GrMoreVertical className="text-xl" />
                                </button>
                            </div>

                            {/* Right Section */}
                            <div className="flex items-center space-x-4">
                                {/* Notifications */}
                                {/* <div className="relative">
                                    <button
                                        className="p-2 rounded-full relative"
                                        aria-label="Notifications"
                                    >
                                        <MdNotifications className="text-xl" />
                                        {unreadNotifications > 0 && (
                                            <span className="absolute top-0 right-0 text-xs rounded-full h-5 w-5 flex items-center justify-center bg-danger text-white!">
                                                {unreadNotifications}
                                            </span>
                                        )}
                                    </button>
                                </div> */}

                                <ThemeSelect className='cccc' />
                                {/* Language Selector */}
                                <div className="relative" ref={languageRef}>
                                    <button
                                        className="flex items-center space-x-1 p-2 rounded-md transition-colors"
                                        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                        aria-expanded={isLanguageOpen}
                                        aria-label="Language selector"
                                    >
                                        <GrLanguage className="text-xl" />
                                        <span className="hidden md:inline text-sm font-medium">
                                            English
                                        </span>
                                        <MdKeyboardArrowDown className="text-xl" />
                                    </button>

                                    {/* Language Dropdown */}
                                    {isLanguageOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md my-custom-card py-1 z-50 border border-gray-200 dark:border-zinc-800">
                                            {languageOptions.map((lang) => (
                                                <button
                                                    key={lang.id}
                                                    className={`w-full px-4 py-2 text-sm text-left ${lang.id === 'en'
                                                        ? ' text-primary'
                                                        : ''
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
                                        className="flex items-center space-x-3 p-1 rounded-md transition-colors"
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
                                            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full border bg-success"></span>
                                        </div>
                                        <div className="hidden md:flex flex-col items-start">
                                            <span className="text-sm font-semibold">
                                                Hana Rezaei
                                            </span>
                                            <span className="text-xs ">
                                                Tehran
                                            </span>
                                        </div>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-56 my-custom-card py-1 z-50 border border-gray-200 dark:border-zinc-800">
                                            <div className="px-4 py-3 border-b border-b-zinc-500 ">
                                                <p className="text-sm font-medium">Hana Rezaei</p>
                                                <p className="text-xs truncate">hana.rezaei@example.com</p>
                                            </div>
                                            <div className="py-1">
                                                <button className="flex items-center w-full px-4 py-2 text-sm">
                                                    <FiUser className="mr-3" /> Profile
                                                </button>
                                                <button className="flex items-center w-full px-4 py-2 text-sm">
                                                    <FiMail className="mr-3" /> Messages
                                                </button>
                                                <button className="flex items-center w-full px-4 py-2 text-sm">
                                                    <FiSettings className="mr-3" /> Settings
                                                </button>
                                            </div>
                                            <div className="py-1 border-t border-t-zinc-500 bg-red-100 dark:bg-transparent text-red-500">
                                                <button className="flex items-center w-full px-4 py-2 text-sm">
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