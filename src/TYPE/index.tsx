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