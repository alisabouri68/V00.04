/************************************
 * Step 01 import dependencies - kernels
 **************************************/
import lodash from "lodash";
import lz from "lz-string";
/************************************
 * Step.02: import dependencies - co-actors
 **************************************/

/************************************
 * Step.03: import dependencies - xapp s
 **************************************/
/************************************
 * Step.04: import script groups
 **************************************/
import { G1 } from "./g1";
/************************************
 * Step.05: Envi Setups
 **************************************/
export const DEFAULT_GLOBAL_STATE = {
abcd:{
    id:"",
    name:"",
    value:""
  },
  theme: "light",
  language: "en",
  direction: "rtl",
  modal: {
    isOpen: false,
    content: "ConsoleBasket",
  },
  userPreferences: {
    fontSize: "medium",
    reduceAnimations: false,
    highContrast: false,
  },
  notifications: {
    enabled: true,
    sound: true,
    vibration: false,
  },
  consoleItem: {
    homeServiceGeneral: true,
    hotserviceGeneral: true,
    Cast: false,
    Gasma: false,
    wikiCnter: false,
  },
  privacy: {
    analytics: false,
    cookies: false,
    tracking: false,
  },
};
/************************************
 * Step.05: Class Definition
 *************************************/
class dynaman {
  private g1: G1;

  constructor(initialState: any = null) {
    this.g1 = new G1(initialState);
  }

  public init(): any {
    return this.g1.init();
  }

  public reconfig(newConfig: any): any {
    return this.g1.reconfig(newConfig);
  }

  public getState(): any {
    return this.g1.getState();
  }

  public resetToDefault(): any {
    return this.g1.resetToDefault();
  }

  // public serialize(): string {
  //   return this.g1.serialize();
  // }

  // public stringify(): string {
  //   return this.g1.stringify();
  // }
}

export default dynaman;
