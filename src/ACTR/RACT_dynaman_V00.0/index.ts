/************************************
 * Step 01 import dependencies - kernels
 **************************************/

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
  packet_1: {
    filed_1: { id: "theme", value: "light" },
    filed_2: { id: "language", value: "en" },
    filed_3: { id: "dir", value: "ltr" },
  },
  packet_2: {
    filed_1: { id: "homeServiceGeneral", value: true },
    filed_2: { id: "hotserviceGeneral", value: true },
    filed_3: { id: "Cast", value: true },
    filed_4: { id: "Gasma", value: true },
    filed_5: { id: "wikiCnter", value: true },
  },
  packet_3: {
    filed_1: { id: "modal", value: false },
    filed_2: { id: "content1", value: "" },
  },
  packet_4: {
    filed_1: { id: "1", title: "title_1", value: "value_1" },
    filed_2: { id: "2", title: "title_2", value: "value_2" },
    filed_3: { id: "3", title: "title_3", value: "value_3" },
    filed_4: { id: "4", title: "title_4", value: "value_4" },
    filed_5: { id: "5", title: "title_5", value: "value_5" },
  },
  packet_5: {
    filed_1: { id: "1", title: "title_1", value: "value_1" },
    filed_2: { id: "2", title: "title_2", value: "value_2" },
    filed_3: { id: "3", title: "title_3", value: "value_3" },
    filed_4: { id: "4", title: "title_4", value: "value_4" },
    filed_5: { id: "5", title: "title_5", value: "value_5" },
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
