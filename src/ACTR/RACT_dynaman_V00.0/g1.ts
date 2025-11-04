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
   * Clean and reset all envi-var in the local storage
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
   * Initialize the configuration from JSON file into local storage
   */
  public init(): any {
    return this._state;
  }

  /** 
   * Reconfig (any change in the dyna will be updated in local storage)
   */
  public reconfig(newConfig: any): any {
    lodash.merge(this._state, newConfig);
    this.saveToLocalStorage();
    return this._state;
  }

  /**
   * Get current state
   */
  public getState(): any {
    return this._state;
  }

  /**
   * Reset to default configuration
   */
  public resetToDefault(): any {
    this._state = this.deepClone(DEFAULT_GLOBAL_STATE);
    this.saveToLocalStorage();
    return this._state;
  }

  /**
   * @method dynaSetup
   * @description Dynamic environment setup with advanced configuration options
   * 
   * This method provides comprehensive dynamic environment configuration:
   * - Environment-specific setup (development, production, testing)
   * - Module-specific initialization
   * - Feature flag management
   * - Runtime configuration validation
   * - Dependency injection setup
   * 
   * @param {Object} setupConfig - Dynamic setup configuration
   * @param {string} [setupConfig.environment='development'] - Runtime environment
   * @param {Object} [setupConfig.modules={}] - Module-specific configurations
   * @param {Object} [setupConfig.featureFlags={}] - Feature toggle management
   * @param {Object} [setupConfig.dependencies={}] - Dependency configurations
   * @param {boolean} [setupConfig.enableValidation=true] - Enable config validation
   * @param {boolean} [setupConfig.persistConfig=true] - Persist setup to localStorage
   * 
   * @returns {Object} Updated global state with dynamic setup
   * 
   * @example
   * // Basic environment setup
   * dynaSetup({
   *   environment: 'production',
   *   modules: {
   *     auth: { require2FA: true },
   *     analytics: { trackingEnabled: true }
   *   }
   * });
   * 
   * @example
   * // Advanced setup with feature flags
   * dynaSetup({
   *   environment: 'development',
   *   featureFlags: {
   *     newDashboard: true,
   *     experimentalFeatures: false,
   *     betaComponents: true
   *   },
   *   dependencies: {
   *     api: { baseURL: 'https://api.example.com' },
   *     websocket: { autoReconnect: true }
   *   }
   * });
   */
  public dynaSetup(setupConfig: {
    environment?: 'development' | 'production' | 'testing' | 'staging';
    modules?: { [key: string]: any };
    featureFlags?: { [key: string]: boolean };
    dependencies?: { [key: string]: any };
    enableValidation?: boolean;
    persistConfig?: boolean;
  } = {}): any {

    // Default configuration
    const defaultSetup = {
      environment: 'development',
      modules: {},
      featureFlags: {},
      dependencies: {},
      enableValidation: true,
      persistConfig: true
    };

    // Merge with provided configuration
    const config = { ...defaultSetup, ...setupConfig };

    // Validate configuration if enabled
    if (config.enableValidation) {
      this.validateDynaSetup(config);
    }

    // Create dynamic setup state
    const dynaState = {
      environment: config.environment,
      modules: config.modules,
      featureFlags: config.featureFlags,
      dependencies: config.dependencies,
      setupTimestamp: new Date().toISOString(),
      setupHash: this.generateSetupHash(config)
    };

    // Merge with existing state
    this._state = {
      ...this._state,
      dyna: {
        ...this._state.dyna,
        ...dynaState
      }
    };

    // Persist to localStorage if enabled
    if (config.persistConfig) {
      this.saveToLocalStorage();
    }
    return this._state;
  }

  /**
   * @method validateDynaSetup
   * @description Validate dynamic setup configuration
   * @private
   */
  private validateDynaSetup(config: any): void {
    const validEnvironments = ['development', 'production', 'testing', 'staging'];

    if (!validEnvironments.includes(config.environment)) {
      throw new Error(`Invalid environment: ${config.environment}. Must be one of: ${validEnvironments.join(', ')}`);
    }

    // Validate modules configuration
    if (config.modules && typeof config.modules !== 'object') {
      throw new Error('Modules configuration must be an object');
    }

    // Validate feature flags
    if (config.featureFlags) {
      for (const [flag, value] of Object.entries(config.featureFlags)) {
        if (typeof value !== 'boolean') {
          throw new Error(`Feature flag '${flag}' must be a boolean value`);
        }
      }
    }

    // Validate dependencies
    if (config.dependencies && typeof config.dependencies !== 'object') {
      throw new Error('Dependencies configuration must be an object');
    }
  }

  /**
   * @method generateSetupHash
   * @description Generate unique hash for setup configuration
   * @private
   */
  private generateSetupHash(config: any): string {
    const configString = JSON.stringify(config);
    let hash = 0;

    for (let i = 0; i < configString.length; i++) {
      const char = configString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(36);
  }

  /**
   * @method getDynaConfig
   * @description Get specific dynamic configuration section
   * 
   * @param {string} section - Configuration section to retrieve
   * @returns {any} Requested configuration section or undefined
   */
  public getDynaConfig(section: string): any {
    return this._state.dyna?.[section];
  }

  /**
   * @method updateFeatureFlag
   * @description Update a specific feature flag
   * 
   * @param {string} flag - Feature flag name
   * @param {boolean} value - New flag value
   * @returns {boolean} Success status
   */
  public updateFeatureFlag(flag: string, value: boolean): boolean {
    if (!this._state.dyna) {
      this._state.dyna = {};
    }

    if (!this._state.dyna.featureFlags) {
      this._state.dyna.featureFlags = {};
    }

    this._state.dyna.featureFlags[flag] = value;
    this.saveToLocalStorage();

    console.log(`🚩 Feature flag updated: ${flag} = ${value}`);
    return true;
  }

  /**
   * @method isFeatureEnabled
   * @description Check if a feature flag is enabled
   * 
   * @param {string} flag - Feature flag name
   * @returns {boolean} Feature flag status
   */
  public isFeatureEnabled(flag: string): boolean {
    return Boolean(this._state.dyna?.featureFlags?.[flag]);
  }

  /**
   * @method getEnvironment
   * @description Get current environment
   * 
   * @returns {string} Current environment
   */
  public getEnvironment(): string {
    return this._state.dyna?.environment || 'development';
  }

  /**
   * @method isDevelopment
   * @description Check if current environment is development
   * 
   * @returns {boolean} True if development environment
   */
  public isDevelopment(): boolean {
    return this.getEnvironment() === 'development';
  }

  /**
   * @method isProduction
   * @description Check if current environment is production
   * 
   * @returns {boolean} True if production environment
   */
  public isProduction(): boolean {
    return this.getEnvironment() === 'production';
  }
}