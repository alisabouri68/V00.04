import { RouteObject } from "react-router-dom";
import { DEFAULT_ROUTE_CONFIG, CustomRouteConfig, convertToRouteObject } from "./g1";

export class G2 {
  private routes: CustomRouteConfig[];
  private defaultRoutes: CustomRouteConfig[];

  constructor(initialRoutes: CustomRouteConfig[] | null = null) {
    const routesToUse = initialRoutes || DEFAULT_ROUTE_CONFIG;
    this.defaultRoutes = [...routesToUse];
    this.routes = [...this.defaultRoutes];
    console.log("G2 initialized routes:", this.routes);
  }

  /** مقداردهی اولیه مسیرها */
  public init(): void {
    this.routes = [...this.defaultRoutes];
  }

  /** افزودن مسیر جدید */
  public addRoute(route: CustomRouteConfig): void {
    this.routes.push(route);
  }

  /** دریافت مسیر خاص */
  public getRoute(path: string): CustomRouteConfig | undefined {
    return this.routes.find(route => route.path === path);
  }

  /** دریافت همه مسیرها */
  public getAllRoutes(): CustomRouteConfig[] {
    return [...this.routes];
  }

  /** بازنشانی مسیرها به حالت پیش‌فرض */
  public resetToDefault(): void {
    this.routes = [...this.defaultRoutes];
  }

  /** سریال‌سازی مسیرها به رشته JSON */
  public serialize(): string {
    return JSON.stringify(this.routes);
  }

  /** فشرده‌سازی مسیرها به base64 */
  public compress(): string {
    const json = JSON.stringify(this.routes);
    return btoa(unescape(encodeURIComponent(json)));
  }

  /** بازیابی مسیرها از رشته فشرده‌شده */
  public decompress(data: string): void {
    const json = decodeURIComponent(escape(atob(data)));
    this.routes = JSON.parse(json);
  }

  /** تبدیل مسیرها به RouteObject[] برای استفاده در createBrowserRouter */
  public toRouteObjects(): RouteObject[] {
    return this.routes.map(convertToRouteObject);
  }
}