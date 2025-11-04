export interface MiddlewareContext {
  user: any;
  envi: any;
  route: any;
  next: (result?: MiddlewareResult) => void;
  redirect: (path: string, state?: any) => void;
  abort: (reason: string) => void;
}

export interface MiddlewareResult {
  allowed: boolean;
  redirectTo?: string;
  abortReason?: string;
  metadata?: any;
}

export type Middleware = (context: MiddlewareContext) => Promise<void> | void;

export class MiddlewarePipeline {
  private middlewares: Middleware[] = [];

  constructor(middlewares: Middleware[] = []) {
    this.middlewares = middlewares;
  }

  async execute(context: Omit<MiddlewareContext, 'next' | 'redirect' | 'abort'>): Promise<MiddlewareResult> {
    return new Promise((resolve) => {
      let currentIndex = 0;
      
      // تعریف تابع runMiddleware قبل از استفاده
      const runMiddleware = (index: number) => {
        if (index >= this.middlewares.length) {
          resolve({ allowed: true });
          return;
        }

        try {
          const middleware = this.middlewares[index];
          const middlewareContext: MiddlewareContext = {
            ...context,
            next: (result?: MiddlewareResult) => {
              currentIndex++;
              if (currentIndex >= this.middlewares.length) {
                resolve(result || { allowed: true });
              } else {
                runMiddleware(currentIndex);
              }
            },
            redirect: (path: string, state?: any) => {
              resolve({ 
                allowed: false, 
                redirectTo: path,
                metadata: { redirectState: state }
              });
            },
            abort: (reason: string) => {
              resolve({ 
                allowed: false, 
                abortReason: reason 
              });
            }
          };

          const result = middleware(middlewareContext);
          
          if (result instanceof Promise) {
            result.catch(error => {
              middlewareContext.abort(`Middleware error: ${error.message}`);
            });
          }
        } catch (error:any) {
          resolve({ 
            allowed: false, 
            abortReason: `Middleware execution error: ${error.message}`
          });
        }
      };

      // شروع اجرای میدلورها
      if (this.middlewares.length > 0) {
        runMiddleware(0);
      } else {
        resolve({ allowed: true });
      }
    });
  }

  use(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  // متد جدید برای بررسی وجود میدلور
  hasMiddleware(middlewareName: string): boolean {
    return this.middlewares.some(mw => 
      mw.name === middlewareName || mw.constructor.name === middlewareName
    );
  }

  // متد جدید برای گرفتن لیست میدلورها
  getMiddlewareNames(): string[] {
    return this.middlewares.map(mw => mw.name || mw.constructor.name);
  }

  // متد جدید برای حذف میدلور
  removeMiddleware(middlewareName: string): boolean {
    const initialLength = this.middlewares.length;
    this.middlewares = this.middlewares.filter(mw => 
      !(mw.name === middlewareName || mw.constructor.name === middlewareName)
    );
    return this.middlewares.length !== initialLength;
  }
}