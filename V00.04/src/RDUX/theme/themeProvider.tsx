import  { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
const ThemeProvider = ({ children }:{children:ReactNode}) => {
  const { mode, systemTheme } = useSelector((state: RootState) => state.theme);
  
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        root.classList.toggle('dark', newSystemTheme === 'dark');
      }
    };
    
    // Set initial theme
    const currentTheme = mode === 'system' ? systemTheme : mode;
    root.classList.toggle('dark', currentTheme === 'dark');
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [mode, systemTheme]);

  return <>{children}</>;
};

export default ThemeProvider;