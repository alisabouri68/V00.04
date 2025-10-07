
/// Meta    
///
///  ID:              RACT_panelman
///  Ver:             V00.04
///  last update:     2025.10.07
///  by:              APPS.68
/************************************
 * Step 01 import dependencies - kernels
 **************************************/
import dynaman from "ACTR/RACT_dynaman_V00.0/index";
import lodash from "lodash";
/************************************
 * Step.02: import dependencies - co-actors
**************************************/
import { regman } from "ACTR/RACT_regman_V00.04/index";
/************************************
 * Step.03: import dependencies - xapp s
 **************************************/
/************************************
 * Step.04: import script groups
 **************************************/
/************************************
 * Step.05: Envi Setups
 **************************************/
/************************************
 * Step.05: Class Definition
 *************************************/
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
   * نقش کاربر را تشخیص میدهیم
   */
  public initByRole() {
    const profile = regman.getUserProfile() || {};
    const token = regman.getAuthToken();
    const role = profile.role || "guest";

    // پروفایل و هیبرید را اپدیت میکنیم
    this.reconfig({
      ...this.getState(),
      ENVI_Profile: profile,
      ENVI_HYB: { token, user: profile },
    });

    //  بر اساس نقش کاربر کنسولارو تولید میکنه
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
      ENVI_CONS: {},
      ENVI_BUNDL: {},
      ENVI_CANV: {},
      ENVI_Profile: {},
      ENVI_HYB: {},
    });
  }
}


export const panelman = new PanelMan();
