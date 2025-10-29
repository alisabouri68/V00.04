// LAYOUT/ResponsiveLayout.tsx
import React, { useState, useEffect } from 'react';
import layoutMobile from './layoutMobile';
import layoutDesktop from './layoutDesktop';

interface ResponsiveLayoutProps {
  children?: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    // تابع برای تشخیص دستگاه
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    // بررسی اولیه
    checkDevice();

    // گوش دادن به تغییر سایز پنجره
    window.addEventListener('resize', checkDevice);

    // تمیز کردن event listener
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  const LayoutComponent = isMobile ? layoutMobile : layoutDesktop;

  return <LayoutComponent />;
};

export default ResponsiveLayout;