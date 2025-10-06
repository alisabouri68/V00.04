import { G2 } from "./g2";
import { CustomRouteConfig } from "./g1";
import { RouteObject } from "react-router-dom";

class panelman {
  private g2: G2;

  constructor(initialRoutes: CustomRouteConfig[] | null = null) {
    this.g2 = new G2(initialRoutes);
  }

  /** مقداردهی اولیه مسیرها */
  public init(): void {
    return this.g2.init();
  }

  /** افزودن مسیر جدید */
  public addRoute(route: CustomRouteConfig): void {
    this.g2.addRoute(route);
  }

  /** دریافت مسیر خاص */
  public getRoute(path: string): CustomRouteConfig | undefined {
    return this.g2.getRoute(path);
  }

  /** دریافت همه مسیرها */
  public getAllRoutes(): CustomRouteConfig[] {
    return this.g2.getAllRoutes();
  }

  /** بازنشانی مسیرها به حالت پیش‌فرض */
  public resetToDefault(): void {
    return this.g2.resetToDefault();
  }

  /** سریال‌سازی مسیرها */
  public serialize(): string {
    return this.g2.serialize();
  }

  /** فشرده‌سازی مسیرها */
  public compress(): string {
    return this.g2.compress();
  }

  /** بازیابی مسیرها از رشته فشرده‌شده */
  public decompress(data: string): void {
    return this.g2.decompress(data);
  }

  /** تبدیل مسیرها به RouteObject[] برای استفاده در createBrowserRouter */
  public toRouteObjects(): RouteObject[] {
    return this.g2.toRouteObjects();
  }
}

export default panelman;