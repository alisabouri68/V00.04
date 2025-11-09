// config/middlewareConfig.ts
import { middlewareManager } from './middlewareManager';
import { authMiddleware } from './authMiddleware';
import { permissionMiddleware } from './permissionMiddleware';

// ثبت میدلورها با نام
middlewareManager.register(
  'authentication',
  authMiddleware({
    validationEndpoint: '/api/validate-token',
    autoRefresh: true
  })
);

middlewareManager.register(
  'permission',
  permissionMiddleware([], { checkMode: 'every' }) // پرمیژن‌ها بعداً مشخص می‌شوند
);

// میدلورهای قابل استفاده:
// - 'authentication'
// - 'permission'