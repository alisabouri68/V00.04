import { useState, useRef, useEffect } from 'react';
import { GoSun, GoMoon } from 'react-icons/go';
import { MdKeyboardArrowDown } from 'react-icons/md';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { useAppDispatch, useAppSelector } from '../../RDUX/theme/hook';
import { setTheme } from '../../RDUX/theme/themeSlice';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  
  // Theme options
  const themeOptions = [
    { id: 'light', name: 'Light', icon: <GoSun className="" /> },
    { id: 'dark', name: 'Dark', icon: <GoMoon className="" /> },
    { id: 'system', name: 'System Default', icon: <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" /> }
  ];

  // Get current theme icon
  const getCurrentIcon = () => {
    if (theme === 'dark') return <GoMoon className="text-xl" />;
    if (theme === 'light') return <GoSun className="text-xl" />;
    return <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={themeRef}>
      <button
        className={twMerge(
          classNames(
            'flex items-center space-x-1 p-2 rounded-md',
            'transition-colors focus:outline-none',
            'border border-transparent'
          ),
          className
        )}
        onClick={() => setIsThemeOpen(!isThemeOpen)}
        aria-expanded={isThemeOpen}
        aria-label="Theme selector"
      >
        <span className="">
          {getCurrentIcon()}
        </span>
        <span className="hidden md:inline text-sm font-medium">
          Theme
        </span>
        <MdKeyboardArrowDown className={classNames(
          "text-xl transition-transform duration-200",
          { "rotate-180": isThemeOpen }
        )} />
      </button>

      {/* Theme Dropdown */}
      {isThemeOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-md my-custom-card py-1 z-50 border border-gray-200 dark:border-zinc-800"
          role="menu"
        >
          {themeOptions.map((option) => (
            <button
              key={option.id}
              className={classNames(
                'flex items-center w-full px-4 py-2 text-sm',
                'text-left transition-colors',
                {
                  '': 
                    theme === option.id
                }
              )}
              onClick={() => {
                dispatch(setTheme(option.id as 'light' | 'dark' | 'system'));
                setIsThemeOpen(false);
              }}
              role="menuitem"
            >
              <span className="mr-3">{option.icon}</span>
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;