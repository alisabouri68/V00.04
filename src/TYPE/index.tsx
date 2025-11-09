// types/environment.ts
export interface RouteConfig {
  path: string;
  name?: string;
  component?: string;
  [key: string]: any;
}

export interface EnvironmentConfig {
  ENVI_CONS: {
    [key: string]: RouteConfig;
  };
}
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  isAuthenticated: boolean;
  profile?: any;
  lastLogin?: Date;
}

export interface AuthCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
// routes/layers/auth/types.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  isAuthenticated: boolean;
  profile?: any;
  lastLogin?: Date;
}

export interface AuthCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
// routes/layers/routing/types.ts
export interface RouteDefinition {
  key: string;
  path: string;
  component?: React.ComponentType;
  middleware?: string[];
  meta?: {
    title?: string;
    description?: string;
    requiresAuth?: boolean;
    requiredRole?: string;
    requiredPermissions?: string[];
    layout?: string;
    breadcrumb?: string;
    icon?: string;
  };
}

export interface RouteConfigs {
  [key: string]: RouteDefinition;
}



export enum DisplayType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop'
}

export interface ILayoutManager {
  getDisplayType(): DisplayType;
  subscribe(callback: (type: DisplayType) => void): () => void;
  destroy(): void;
}

export interface ILayoutConfig {
  breakpoint: number;
  debounceTime: number;
}
// types/middleware.ts
export interface MiddlewareContext {
  navigate: (path: string, options?: any) => void;
  location: {
    pathname: string;
    search?: string;
    hash?: string;
  };
  user?: {
    id?: string;
    email?: string;
    roles: string[];
    permissions: string[];
  };
  [key: string]: any;
}

export type Middleware = (context: MiddlewareContext) => Promise<any>;

export interface MiddlewareResult {
  success: boolean;
  data?: any;
  error?: Error;
}

export interface ExecutionResult {
  results: { [key: string]: MiddlewareResult };
  context: MiddlewareContext;
}
