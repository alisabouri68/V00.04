// middlewares/middlewareManager.ts

// این اینترفیس رو اضافه کن - مشابه AuthContext و PermissionContext
export interface MiddlewareContext {
  navigate: (path: string, options?: any) => void; // required instead of optional
  location: {
    pathname: string;
    search?: string;
    hash?: string;
  };
  user?: any;
  [key: string]: any;
}

export interface MiddlewareResult {
  success: boolean;
  data?: any;
  error?: Error;
}

export interface ExecutionResult {
  results: { [key: string]: MiddlewareResult };
  context: MiddlewareContext;
}

export interface RegisteredMiddleware {
  name: string;
  middleware: (context: MiddlewareContext) => Promise<any>;
  enabled: boolean;
}

// این تایپ رو با MiddlewareContext جدید تعریف کن
type Middleware = (context: MiddlewareContext) => Promise<any>;

export class MiddlewareManager {
  private middlewares: Map<string, RegisteredMiddleware>;
  private context: MiddlewareContext;

  constructor() {
    this.middlewares = new Map();
    // مقدار پیش‌فرض برای context
    this.context = {
      navigate: () => {}, // تابع خالی به عنوان پیش‌فرض
      location: { pathname: '/' }
    };
  }

  // ثبت میدلور با نام
  register(name: string, middleware: Middleware, enabled: boolean = true): void {
    this.middlewares.set(name, {
      name,
      middleware,
      enabled
    });
  }

  // حذف میدلور
  unregister(name: string): boolean {
    return this.middlewares.delete(name);
  }

  // فعال/غیرفعال کردن میدلور
  setMiddlewareStatus(name: string, enabled: boolean): boolean {
    const middleware = this.middlewares.get(name);
    if (middleware) {
      middleware.enabled = enabled;
      return true;
    }
    return false;
  }

  // دریافت لیست میدلورهای ثبت شده
  getRegisteredMiddlewares(): RegisteredMiddleware[] {
    return Array.from(this.middlewares.values());
  }

  setContext(context: Partial<MiddlewareContext>): this {
    this.context = { ...this.context, ...context };
    return this;
  }

  // اجرای میدلورها بر اساس نام‌های ثبت شده
  async executeByName(
    middlewareNames: string[], 
    localContext: Partial<MiddlewareContext> = {}
  ): Promise<ExecutionResult> {
    const middlewares: Middleware[] = [];
    
    for (const name of middlewareNames) {
      const registered = this.middlewares.get(name);
      if (registered && registered.enabled) {
        middlewares.push(registered.middleware);
      } else if (!registered) {
        throw new Error(`Middleware '${name}' is not registered`);
      }
    }

    return this.execute(middlewares, localContext);
  }

  // اجرای مستقیم آرایه‌ای از میدلورها
  async execute(
    middlewares: Middleware[], 
    localContext: Partial<MiddlewareContext> = {}
  ): Promise<ExecutionResult> {
    // مطمئن شو که navigate و location وجود دارند
    const executionContext: MiddlewareContext = { 
      ...this.context, 
      ...localContext 
    } as MiddlewareContext;

    const results: { [key: string]: MiddlewareResult } = {};

    for (const [index, middleware] of middlewares.entries()) {
      const middlewareName = this.getMiddlewareName(middleware) || `middleware_${index}`;
      
      try {
        const result = await middleware(executionContext);
        
        if (result && typeof result === 'object') {
          Object.assign(executionContext, result);
        }
        
        results[middlewareName] = { success: true, data: result };
      } catch (error) {
        results[middlewareName] = { 
          success: false, 
          error: error as Error 
        };
        throw error;
      }
    }

    return { results, context: executionContext };
  }

  // پیدا کردن نام میدلور از میان میدلورهای ثبت شده
  private getMiddlewareName(middleware: Middleware): string | null {
    for (const [name, registered] of this.middlewares.entries()) {
      if (registered.middleware === middleware) {
        return name;
      }
    }
    return null;
  }

  clearContext(): void {
    this.context = {
      navigate: () => {},
      location: { pathname: '/' }
    };
  }

  getContext(): MiddlewareContext {
    return { ...this.context };
  }
}

export const middlewareManager = new MiddlewareManager();