/************************************
 * Step 01: import dependencies
 ************************************/
import lodash from "lodash";
import { DEFAULT_GLOBAL_STATE } from "./index";

/************************************
 * Step 02: Class Definition
 ************************************/
export class G1 {
  private _state: any;

  constructor(initialState: any = null) {
    const savedState = this.loadFromLocalStorage();

    if (savedState) {
      this._state = { ...DEFAULT_GLOBAL_STATE, ...savedState };
    } else if (initialState) {
      this._state = { ...DEFAULT_GLOBAL_STATE, ...initialState };
      this.saveToLocalStorage();
    } else {
      this._state = this.deepClone(DEFAULT_GLOBAL_STATE);
      this.saveToLocalStorage();
    }
  }

  /**
   * Deep clone helper using lodash
   */
  private deepClone(obj: any): any {
    return lodash.cloneDeep(obj);
  }

  /**
   * Safe load from localStorage (only in browser)
   */
  private loadFromLocalStorage(): any {
    if (typeof window === "undefined" || !window.localStorage) return null;

    try {
      const jsonStr = localStorage.getItem("globalAppState");
      if (!jsonStr) return null;

      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Failed to load state from localStorage:", error);
      return null;
    }
  }

  /**
   * Save to localStorage
   */
  private saveToLocalStorage(): void {
    if (typeof window === "undefined" || !window.localStorage) return;

    try {
      const serializableState = this.cleanStateForStorage(this._state);
      localStorage.setItem("globalAppState", JSON.stringify(serializableState));
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }
  }


  /**
   * clean and reset all envi-var in the local storage
   */

  public cleanStateForStorage(state: any): any {
    const cleanDeep = (obj: any): any => {
      if (obj === null || typeof obj !== "object") return obj;
      if (Array.isArray(obj)) return obj.map(cleanDeep);

      const cleaned: any = {};
      for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

        if (
          key.startsWith("__react") ||
          key.startsWith("_react") ||
          key.includes("Fiber") ||
          key.includes("Node")
        )
          continue;

        const value = obj[key];
        if (
          value instanceof HTMLElement ||
          typeof value === "function" ||
          value instanceof Event
        ) {
          continue;
        }

        cleaned[key] = cleanDeep(value);
      }
      return cleaned;
    };

    return cleanDeep(this.deepClone(state));
  }

  /**
   * enter the configuration from Json file into local storage
   */

  public init(): any {
    return this._state;
  }


  /** 
   * reconfig (any change in the dyna will be updated in local storage)
   */

  public reconfig(newConfig: any): any {
    lodash.merge(this._state, newConfig);
    this.saveToLocalStorage();
    return this._state;
  }


  /**
   * ????
   */

  public getState(): any {
    return this._state;
  }

  /**
   * enter the configuration from Json file into local storage
   */

  public resetToDefault(): any {
    this._state = this.deepClone(DEFAULT_GLOBAL_STATE);
    this.saveToLocalStorage();
    return this._state;
  }
}
