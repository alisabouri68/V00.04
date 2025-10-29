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