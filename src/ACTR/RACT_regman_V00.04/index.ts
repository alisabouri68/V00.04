import dynaman from "ACTR/RACT_dynaman_V00.0/index";
import lodash from "lodash";

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
