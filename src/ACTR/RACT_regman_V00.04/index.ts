
/// Meta    
///
///  ID:              RACT_regman
///  Ver:             V00.04
///  last update:     2025.10.07
///  by:              APPS.68
/************************************
 * Step 01 import dependencies - kernels
 **************************************/
import lodash from "lodash";
/************************************
 * Step.02: import dependencies - co-actors
**************************************/
import dynaman from "ACTR/RACT_dynaman_V00.0/index";
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
export class RegMan extends dynaman {
  constructor(initialState: any = {}) {
    super({
      ENVI_Profile: initialState.ENVI_Profile || {},
      ENVI_HYB: initialState.ENVI_HYB || {},
    });
  }

  setAuthToken(token: string) {
    const newState = lodash.merge({}, this.getState(), { ENVI_HYB: { token } });
    this.reconfig(newState);
  }

  getAuthToken() {
    return this.getState().ENVI_HYB?.token || null;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token && typeof token === "string" && token.length > 0;
  }

  logout() {
    const resetState = lodash.merge({}, this.getState(), { ENVI_HYB: { token: null, user: null } });
    this.reconfig(resetState);
  }

  setUserProfile(profile: any) {
    const newState = lodash.merge({}, this.getState(), { ENVI_Profile: profile });
    this.reconfig(newState);
  }

  getUserProfile() {
    return this.getState().ENVI_Profile || {};
  }

  updateProfileField(key: string, value: any) {
    const profile = this.getUserProfile();
    profile[key] = value;
    this.reconfig({ ENVI_Profile: profile });
  }

  resetUserData() {
    const reset = { ENVI_Profile: {}, ENVI_HYB: {} };
    this.reconfig(reset);
  }
}

export const regman = new RegMan();
