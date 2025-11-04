// routes/layers/middleware/access.middleware.ts
import { Middleware, MiddlewareContext } from './index';
import { panelman } from 'ACTR/RACT_panelman_V00.04/index';

// تعریف اینترفیس‌های دقیق‌تر بر اساس ساختار واقعی envi
interface RouteDisciplines {
  guest?: string[];
  userA?: string[];
  userB?: string[];
  admin?: string[];
}

interface RouteStatus {
  layout: string;
  deciplines: RouteDisciplines;
}

interface RouteGeneral {
  status: RouteStatus;
}

interface PageConfig {
  general: RouteGeneral;
  boxes?: any;
}

// تایپ گارد برای بررسی ساختار routeConfig
const isValidPageConfig = (config: any): config is PageConfig => {
  return config && 
         config.general && 
         config.general.status && 
         config.general.status.deciplines;
};

export const pageAccessMiddleware: Middleware = async (context) => {
  const { user, route, envi, next, redirect } = context;
  
  if (!envi) {
    redirect('/loading');
    return;
  }

  const routeConfig = panelman.getRouteConfig(route.key);
  
  if (!routeConfig) {
    redirect('/not-found', { attemptedPage: route.key });
    return;
  }

  // استفاده از تایپ گارد برای بررسی ساختار
  if (!isValidPageConfig(routeConfig)) {
    console.warn('Invalid page config structure for route:', route.key, routeConfig);
    redirect('/not-found', { attemptedPage: route.key });
    return;
  }

  // حالا TypeScript می‌داند که routeConfig ساختار صحیح دارد
  const pagePermissions = routeConfig.general.status.deciplines[user.role as keyof RouteDisciplines];
  
  if (!pagePermissions || !pagePermissions.includes('read')) {
    redirect('/unauthorized', {
      page: route.key,
      userRole: user.role,
      requiredPermissions: pagePermissions
    });
    return;
  }
  
  next();
};

// نسخه جایگزین با هندلینگ خطای بهتر
export const safePageAccessMiddleware: Middleware = async (context) => {
  const { user, route, envi, next, redirect } = context;
  
  if (!envi) {
    redirect('/loading');
    return;
  }

  try {
    const routeConfig = panelman.getRouteConfig(route.key);
    
    if (!routeConfig) {
      redirect('/not-found', { attemptedPage: route.key });
      return;
    }

    // بررسی ساختار داده‌ها به صورت ایمن
    const disciplines = routeConfig.general?.status?.deciplines;
    
    if (!disciplines || typeof disciplines !== 'object') {
      console.error('Invalid disciplines structure for route:', route.key, disciplines);
      redirect('/not-found', { attemptedPage: route.key });
      return;
    }

    const userPermissions = disciplines[user.role as keyof typeof disciplines];
    
    if (!userPermissions || !Array.isArray(userPermissions) || !userPermissions.includes('read')) {
      redirect('/unauthorized', {
        page: route.key,
        userRole: user.role,
        availableRoles: Object.keys(disciplines),
        requiredPermissions: userPermissions
      });
      return;
    }
    
    next();
  } catch (error) {
    console.error('Error in page access middleware:', error);
    redirect('/error', { 
      message: 'خطا در بررسی دسترسی به صفحه',
      route: route.key 
    });
  }
};

export const maintenanceMiddleware: Middleware = async (context) => {
  const { route, next, redirect } = context;
  
  // چک کردن وضعیت maintenance
  const isMaintenanceMode = localStorage.getItem('maintenance_mode') === 'true';
  const isMaintenanceRoute = route.path === '/maintenance';
  
  if (isMaintenanceMode && !isMaintenanceRoute) {
    redirect('/maintenance');
    return;
  }
  
  if (!isMaintenanceMode && isMaintenanceRoute) {
    redirect('/');
    return;
  }
  
  next();
};

// میدلور جدید برای بررسی دسترسی بر اساس نقش
export const roleBasedAccessMiddleware: Middleware = async (context) => {
  const { user, route, next, redirect } = context;
  
  // نقش‌های مجاز برای هر مسیر - می‌تواند از config بارگذاری شود
  const roleAccessMap: Record<string, string[]> = {
    'home': ['guest', 'userA', 'userB', 'admin'],
    'hot': ['guest', 'userA', 'userB', 'admin'],
    'cast': ['userA', 'userB', 'admin'],
    'wiki': ['userA', 'userB', 'admin'],
    'gasma': ['userB', 'admin'],
    'admin': ['admin']
  };

  const allowedRoles = roleAccessMap[route.key] || ['guest'];
  
  if (!allowedRoles.includes(user.role)) {
    redirect('/unauthorized', {
      page: route.key,
      userRole: user.role,
      allowedRoles
    });
    return;
  }
  
  next();
};

// میدلور برای بررسی دسترسی زمان‌بندی شده
export const timeBasedAccessMiddleware: Middleware = async (context) => {
  const { route, next, redirect } = context;
  
  // زمان‌بندی دسترسی - می‌تواند از config بارگذاری شود
  const timeRestrictions: Record<string, { start?: string; end?: string }> = {
    'hot': { start: '06:00', end: '23:00' }, // فقط از ۶ صبح تا ۱۱ شب
    'admin': { start: '09:00', end: '17:00' } // فقط ساعت اداری
  };

  const restriction = timeRestrictions[route.key];
  
  if (restriction) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // زمان به دقیقه
    
    const [startHour, startMinute] = (restriction.start || '00:00').split(':').map(Number);
    const [endHour, endMinute] = (restriction.end || '23:59').split(':').map(Number);
    
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    
    if (currentTime < startTime || currentTime > endTime) {
      redirect('/unauthorized', {
        page: route.key,
        reason: 'time_restriction',
        allowedTime: `${restriction.start} - ${restriction.end}`,
        currentTime: now.toLocaleTimeString('fa-IR')
      });
      return;
    }
  }
  
  next();
};