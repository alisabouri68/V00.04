// 📁 ACTR/RACT_panelman_V00.04/index.ts
import dynaman from "ACTR/RACT_dynaman_V00.0/index";
import lodash from "lodash";
import { regman } from "ACTR/RACT_regman_V00.04/index";

export class PanelMan extends dynaman {
  constructor(initialState: any = {}) {
    super({
      ENVI_GLOB: initialState.ENVI_GLOB || {},
      ENVI_CONS: initialState.ENVI_CONS || {},
      ENVI_BUNDL: initialState.ENVI_BUNDL || {},
      ENVI_CANV: initialState.ENVI_CANV || {},
      ENVI_Profile: initialState.ENVI_Profile || {},
      ENVI_HYB: initialState.ENVI_HYB || {},
    });
  }

  /**
   * پر کردن وضعیت پنل بر اساس نقش کاربر
   */
  public initByRole() {
    const profile = regman.getUserProfile() || {};
    const token = regman.getAuthToken();
    const role = profile.role || "guest";

    // 1️⃣ ری‌کانفیگ ENVI_Profile و ENVI_HYB
    this.reconfig({
      ...this.getState(),
      ENVI_Profile: profile,
      ENVI_HYB: { token, user: profile },
    });

    // 2️⃣ پر کردن ENVI_CONS بر اساس نقش
    const ROUTE_ACCESS: Record<string, string[]> = {
      user: ["home", "hot"],
      admin: ["home", "hot", "cast", "gasma", "wiki"],
      guest: [],
    };

    const consState: Record<string, any> = {};
    ROUTE_ACCESS[role]?.forEach((route) => {
      consState[route] = { id: route, value: true };
    });

    this.reconfig({
      ...this.getState(),
      ENVI_CONS: consState,
    });
  }

  /* =============================
   * CONS MANAGEMENT (کنسول‌ها)
   * ============================= */
  public setRouteState(route: string, value: boolean) {
    const newState = lodash.merge({}, this.getState(), {
      ENVI_CONS: { [route]: { id: route, value } },
    });
    this.reconfig(newState);
  }

  public getRouteState(route: string): boolean {
    return this.getState().ENVI_CONS?.[route]?.value ?? false;
  }

  /* =============================
   * BUNDL MANAGEMENT (شیت‌ها)
   * ============================= */
  public setBundle(bundle: string, data: any) {
    const newState = lodash.merge({}, this.getState(), {
      ENVI_BUNDL: { [bundle]: data },
    });
    this.reconfig(newState);
  }

  public getBundle(bundle: string): any {
    return this.getState().ENVI_BUNDL?.[bundle] || null;
  }

  /* =============================
   * CANV MANAGEMENT (spk‌ها)
   * ============================= */
  public setCanvasElement(bundle: string, key: string, value: any) {
    const canvases = lodash.get(this.getState(), ["ENVI_CANV", bundle], {});
    canvases[key] = value;

    const newState = lodash.merge({}, this.getState(), {
      ENVI_CANV: { [bundle]: canvases },
    });
    this.reconfig(newState);
  }

  public getCanvasElement(bundle: string, key: string): any {
    return lodash.get(this.getState(), ["ENVI_CANV", bundle, key], null);
  }

  /* =============================
   * GLOBAL SETTINGS
   * ============================= */
  public setGlobalSetting(key: string, value: any) {
    const newState = lodash.merge({}, this.getState(), {
      ENVI_GLOB: { [key]: value },
    });
    this.reconfig(newState);
  }

  public getGlobalSetting(key: string): any {
    return lodash.get(this.getState(), ["ENVI_GLOB", key], null);
  }

  /* =============================
   * RESET
   * ============================= */
  public resetPanel() {
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
