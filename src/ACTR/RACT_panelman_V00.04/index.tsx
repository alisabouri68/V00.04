import dynaman from "ACTR/RACT_dynaman_V00.0/index";
import lodash from "lodash";
import { profileMan } from "ACTR/RACT_profileman_V00.04";
import { BundlBuilder } from "./g1";
import { ComponentLoader } from "./g2";

// تعریف انواع برای بهتر شدن TypeScript
interface PanelManConfig {
  ENVI_GLOB?: any;
  ENVI_CONS?: any;
  ENVI_BUNDL?: any;
  ENVI_CANV?: any;
  ENVI_Profile?: any;
  ENVI_HYB?: any;
}

interface RouteAccessConfig {
  [role: string]: string[];
}

export class PanelMan extends dynaman {
  private bundlBuilder: BundlBuilder;
  private componentLoader: ComponentLoader;
  private readonly routeAccess: RouteAccessConfig;

  constructor(initialState: PanelManConfig = {}) {
    const defaultState = {
      ENVI_GLOB: {},
      ENVI_CONS: {},
      ENVI_BUNDL: {},
      ENVI_CANV: {},
      ENVI_Profile: {},
      ENVI_HYB: {},
    };

    super({ ...defaultState, ...initialState });

    this.bundlBuilder = new BundlBuilder();
    this.componentLoader = new ComponentLoader();

    // تعریف دسترسی‌های روت بر اساس نقش
    this.routeAccess = {
      user: ["home", "hot", "cast", "gasma", "wiki"],
      admin: ["home", "hot", "cast", "gasma", "wiki"],
      guest: ["home", "hot", "cast", "gasma", "wiki"],
      editor: ["home", "hot", "cast", "gasma", "wiki"]
    };
  }

  /**
   * مقداردهی اولیه بر اساس نقش کاربر
   */
  public initByRole(): void {
    try {
      const profile = profileMan.getProfile() || {};
      const role = profile.role || "guest";


      // تولید stateهای مربوط به روت‌ها
      const { bundleState, consState } = this.generateRouteStates(role);

      // تولید state کامپوننت‌ها
      const componentState = this.generateComponentState();

      // اعمال تمام تغییرات
      this.reconfig({
        ...this.getState(),
        ENVI_Profile: profile,
        ENVI_HYB: {
          user: profile,
          role,
          timestamp: Date.now()
        },
        ENVI_CONS: consState,
        ENVI_BUNDL: bundleState,
        ENVI_CANV: componentState
      });

      console.log('ENVI_CONS created:', consState);
      console.log('ENVI_BUNDL created:', bundleState);
      console.log('ENVI_CANV created:', componentState);

    } catch (error) {
      console.error("Error in initByRole:", error);
      this.initGuestMode();
    }
  }

  /**
   * تولید stateهای مربوط به روت‌ها
   */
  private generateRouteStates(role: string): { bundleState: any; consState: any } {
    const bundleState = this.bundlBuilder.generateBundlForRoute();
    const consState: Record<string, any> = {};
    const accessibleRoutes = this.routeAccess[role] || this.routeAccess.guest;

    console.log('Generating routes for role:', role, 'accessible routes:', accessibleRoutes);

    accessibleRoutes.forEach((route) => {
      // برای home از مسیر / استفاده کن، برای بقیه از /route
      const path = route === 'home' ? '/' : `/${route}`;

      consState[route] = {
        id: route,
        path: path, // اینجا اصلاح شده
        name: this.getRouteName(route),
        BUNDL: bundleState[route] || {},
        enabled: true,
        permissions: this.getRoutePermissions(route, role),
        lastAccessed: Date.now()
      };
    });

    return { bundleState, consState };
  }

  /**
   * دریافت نام نمایشی برای روت
   */
  private getRouteName(route: string): string {
    const nameMap: Record<string, string> = {
      home: 'صفحه اصلی',
      hot: 'داغ‌ترین‌ها',
      cast: 'کست',
      gasma: 'گاسما',
      wiki: 'ویکی'
    };
    return nameMap[route] || route;
  }

  /**
   * دریافت دسترسی‌های روت
   */
  private getRoutePermissions(route: string, role: string): string[] {
    const permissionMap: Record<string, string[]> = {
      home: ['guest', 'user', 'editor', 'admin'],
      hot: ['guest', 'user', 'editor', 'admin'],
      cast: ['user', 'editor', 'admin', 'user'],
      gasma: ['user', 'editor', 'admin', 'guest'],
      wiki: ['editor', 'admin', 'guest', 'user']
    };

    return permissionMap[route] || ['guest'];
  }

  /**
   * تولید state کامپوننت‌ها
   */
  private generateComponentState(): any {
    const allComponents = this.componentLoader.getAllComponents();
    const componentNames: Record<string, string> = {};

    Object.keys(allComponents).forEach((key) => {
      componentNames[key] = key;
    });

    return {
      COMPONENTS: componentNames,
      totalComponents: Object.keys(componentNames).length,
      loadedAt: Date.now()
    };
  }

  /**
   * حالت fallback برای مهمان
   */
  private initGuestMode(): void {
    console.warn("Falling back to guest mode");

    const { bundleState, consState } = this.generateRouteStates("guest");
    const componentState = this.generateComponentState();

    this.reconfig({
      ENVI_CONS: consState,
      ENVI_BUNDL: bundleState,
      ENVI_CANV: componentState,
      ENVI_HYB: {
        token: '',
        user: null,
        role: 'guest',
        timestamp: Date.now(),
        isGuest: true
      }
    });
  }

  /**
   * بررسی دسترسی به روت
   */
  public hasRouteAccess(route: string): boolean {
    const currentRole = this.getState().ENVI_HYB?.role || "guest";
    const accessibleRoutes = this.routeAccess[currentRole] || this.routeAccess.guest;
    return accessibleRoutes.includes(route);
  }

  /**
   * دریافت تمام روت‌های قابل دسترسی
   */
  public getAccessibleRoutes(): string[] {
    const currentRole = this.getState().ENVI_HYB?.role || "guest";
    return this.routeAccess[currentRole] || this.routeAccess.guest;
  }

  /**
   * دریافت وضعیت روت
   */
  public getRouteState(route: string): boolean {
    const routeConfig = this.getState().ENVI_CONS?.[route];
    return routeConfig?.enabled ?? false;
  }

  /**
   * دریافت پیکربندی روت
   */
  public getRouteConfig(route: string): any {
    return this.getState().ENVI_CONS?.[route] || null;
  }

  /**
   * دریافت تمام روت‌های موجود
   */
  public getAllRoutes(): any {
    return this.getState().ENVI_CONS || {};
  }

  /**
   * دریافت مسیر بر اساس route key
   */
  public getRoutePath(route: string): string {
    const routeConfig = this.getRouteConfig(route);
    return routeConfig?.path || `/${route}`;
  }

  // بقیه متدها بدون تغییر...
  public getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';

    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  public getLayoutComponent() {
    const deviceType = this.getDeviceType();
    const layoutMap = {
      mobile: 'layoutMobile',
      tablet: 'layoutMobile',
      desktop: 'layoutDesktop'
    };

    return layoutMap[deviceType];
  }

  /* =============================
   * CONS MANAGEMENT
   * ============================= */
  public setRouteState(route: string, value: boolean, metadata: any = {}): void {
    const currentState = this.getState().ENVI_CONS?.[route] || {};

    const newState = lodash.merge({}, this.getState(), {
      ENVI_CONS: {
        [route]: {
          id: route,
          value,
          ...currentState,
          ...metadata,
          updatedAt: Date.now()
        }
      },
    });
    this.reconfig(newState);
  }

  /* =============================
   * BUNDL MANAGEMENT
   * ============================= */
  public setBundle(bundle: string, data: any): void {
    const newState = lodash.merge({}, this.getState(), {
      ENVI_BUNDL: { [bundle]: { ...data, updatedAt: Date.now() } },
    });
    this.reconfig(newState);
  }

  public getBundle(bundle: string): any {
    return this.getState().ENVI_BUNDL?.[bundle] || null;
  }

  public getAllBundles(): any {
    return this.getState().ENVI_BUNDL || {};
  }

  /* =============================
   * CANV MANAGEMENT
   * ============================= */
  public setCanvasElement(bundle: string, key: string, value: any): void {
    const state = this.getState();
    const currentCanv = lodash.cloneDeep(state.ENVI_CANV?.[bundle] || {});

    const newState = lodash.merge({}, state, {
      ENVI_CANV: {
        [bundle]: {
          ...currentCanv,
          [key]: value,
          _metadata: {
            lastModified: Date.now(),
            modifiedBy: state.ENVI_HYB?.user?.id || 'system'
          }
        },
      },
    });

    this.reconfig(newState);
  }

  public getCanvasElement(bundle: string, key: string): any {
    return lodash.get(this.getState(), ["ENVI_CANV", bundle, key], null);
  }

  public getCanvasBundle(bundle: string): any {
    return this.getState().ENVI_CANV?.[bundle] || {};
  }

  /* =============================
   * GLOBAL SETTINGS
   * ============================= */
  public setGlobalSetting(key: string, value: any): void {
    const newState = lodash.merge({}, this.getState(), {
      ENVI_GLOB: {
        [key]: value,
        _metadata: {
          lastModified: Date.now(),
          version: '1.0'
        }
      },
    });
    this.reconfig(newState);
  }

  public getGlobalSetting(key: string): any {
    return lodash.get(this.getState(), ["ENVI_GLOB", key], null);
  }

  public getAllGlobalSettings(): any {
    return this.getState().ENVI_GLOB || {};
  }

  /* =============================
   * UTILITY METHODS
   * ============================= */

  /**
   * دریافت وضعیت کلی پنل
   */
  public getPanelStatus(): any {
    const state = this.getState();
    return {
      role: state.ENVI_HYB?.role || 'guest',
      accessibleRoutes: this.getAccessibleRoutes().length,
      totalRoutes: Object.keys(state.ENVI_CONS || {}).length,
      totalBundles: Object.keys(state.ENVI_BUNDL || {}).length,
      totalComponents: Object.keys(state.ENVI_CANV?.COMPONENTS || {}).length,
      profile: state.ENVI_Profile ? 'loaded' : 'not-loaded',
      lastUpdate: state.ENVI_HYB?.timestamp || null
    };
  }

  /**
   * بررسی سالم بودن پنل
   */
  public isPanelHealthy(): boolean {
    try {
      const state = this.getState();
      return !!(state.ENVI_CONS && state.ENVI_BUNDL && state.ENVI_CANV);
    } catch (error) {
      return false;
    }
  }

  /**
   * ریست انتخابی
   */
  public resetSection(section: keyof PanelManConfig): void {
    const resetValue = Array.isArray(this.getState()[section]) ? [] : {};
    this.reconfig({
      [section]: resetValue
    });
  }

  /* =============================
   * RESET
   * ============================= */
  public resetPanel(): void {
    this.reconfig({
      ENVI_CONS: {},
      ENVI_BUNDL: {},
      ENVI_CANV: {},
      ENVI_Profile: {},
      ENVI_HYB: {},
      ENVI_GLOB: this.getState().ENVI_GLOB
    });
  }

  /**
   * ریست کامل
   */
  public hardReset(): void {
    this.reconfig({
      ENVI_GLOB: {},
      ENVI_CONS: {},
      ENVI_BUNDL: {},
      ENVI_CANV: {},
      ENVI_Profile: {},
      ENVI_HYB: {},
    });
  }
}

export const panelman = new PanelMan();