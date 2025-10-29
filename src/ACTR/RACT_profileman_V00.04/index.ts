/// Meta    
/// 
///  ID:              RACT_profileman
///  Ver:             V00.01
///  last update:     2025.10.11
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
 * Step.06: Class Definition
 *************************************/
export class ProfileMan extends dynaman {
  constructor(initialState: any = {}) {
    super({
      ENVI_Profile: initialState.ENVI_Profile || {},
    });
  }

  setProfile(profile: any) {
    const newState = lodash.merge({}, this.getState(), { ENVI_Profile: profile });
    this.reconfig(newState);
  }

  getProfile() {
    return this.getState().ENVI_Profile || {};
  }

  updateField(key: string, value: any) {
    const profile = this.getProfile();
    profile[key] = value;
    this.reconfig({ ENVI_Profile: profile });
  }

  removeField(key: string) {
    const profile = this.getProfile();
    delete profile[key];
    this.reconfig({ ENVI_Profile: profile });
  }

  resetProfile() {
    // const reset = { ENVI_Profile: {} };
    this.resetToDefault();
  }

  hasField(key: string): boolean {
    const profile = this.getProfile();
    return Object.prototype.hasOwnProperty.call(profile, key);
  }
}

export const profileMan = new ProfileMan();
