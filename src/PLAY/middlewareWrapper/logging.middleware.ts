<<<<<<< HEAD
// routes/layers/middleware/logging.middleware.ts
import { Middleware } from './index';

// تعریف تایپ برای window.gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const loggingMiddleware: Middleware = async (context) => {
  const { user, route } = context;
  
  // لاگ کردن دسترسی - با بررسی وجود username
  const username = user.username || 'guest';
  console.log(`🛣️ Route Access: ${username} (${user.role}) -> ${route.key}`);
  
  // ارسال به سرویس آنالیتیکس - با بررسی وجود gtag
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: route.key,
      user_role: user.role,
      user_id: username
    });
  }
  
  context.next();
};

export const performanceMiddleware: Middleware = async (context) => {
  const startTime = performance.now();
  
  // فراخوانی next با پارامتر صحیح
  context.next({
    allowed: true, // اضافه کردن property الزامی
    metadata: {
      performance: {
        startTime,
        endTime: performance.now(),
        duration: performance.now() - startTime
      }
    }
  });
};

// میدلور جدید برای خطاها
export const errorLoggingMiddleware: Middleware = async (context) => {
  const originalNext = context.next;
  
  // بازنویسی متد next برای گرفتن خطاها
  context.next = (result?: any) => {
    if (result && !result.allowed) {
      // لاگ کردن دسترسی رد شده
      console.warn(`🚫 Access Denied: ${context.user.role} -> ${context.route.key}`, {
        reason: result.abortReason,
        redirectTo: result.redirectTo
      });
      
      // ارسال به سرویس آنالیتیکس
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'access_denied', {
          page_title: context.route.key,
          user_role: context.user.role,
          reason: result.abortReason
        });
      }
    }
    
    originalNext(result);
  };
  
  context.next();
};

// میدلور برای لاگ کردن عملکرد کاربر
export const userBehaviorMiddleware: Middleware = async (context) => {
  const { user, route } = context;
  
  // ذخیره آخرین صفحه بازدید شده
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('last_visited_page', route.key);
      localStorage.setItem('last_visit_time', new Date().toISOString());
    } catch (error) {
      console.warn('Failed to save user behavior data:', error);
    }
  }
  
  // ارسال داده‌های کاربر به analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_navigation', {
      page_title: route.key,
      user_role: user.role,
      user_status: user.isAuthenticated ? 'authenticated' : 'guest',
      timestamp: new Date().toISOString()
    });
  }
  
  context.next();
};
=======

>>>>>>> f80cd735f2a895ea2c515a4defac99e0249832a1
