

/******************************************
AssetID:    	ActorGrp.1
AssetTitle:    	Actor Dyna Manager -scriptGroup-1 
Version:        V00.04

Last Update:    2025.08.22
By:             APPS.00

Description:  This templates is used for developing React Actors based on V00.04
******************************************/








	// Script Group 1


  /**
   *
   * $ init()
   */
  public init-main() {
    return lz.compressToBase64(this.stringify());
  }
  
  
  /**
   *
   * $ help ()
   */
  public help() {
    return lz.compressToBase64(this.stringify());
  }
  
  
  /**
   *
   * $ signature(script-id)
   *
   *   json format - signature of a scrip-id
   */
  public signature() {
    return lz.compressToBase64(this.stringify());
  }








  // Scripts

  //  @returns

  public serialize(): string {
    const cleanState = this.cleanStateForStorage(this._state);
    return lz.compressToBase64(JSON.stringify(cleanState));
  }

  public stringify(): string {
    const cleanState = this.cleanStateForStorage(this._state);
    return JSON.stringify(cleanState);
  }

  // بارگذاری از localStorage
  private loadFromLocalStorage(): any {
    try {
      const compressed = localStorage.getItem('globalAppState');
      if (!compressed) return null;
      
      const jsonStr = lz.decompressFromBase64(compressed);
      if (!jsonStr) return null;
      
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
      return null;
    }
  }

  // ذخیره در localStorage با حذف ساختارهای circular
  private saveToLocalStorage(): void {
    try {
      // تابع برای حذف ساختارهای circular و غیرقابل serialize
      const getSerializableState = (state: any): any => {
        if (state === null || state === undefined) {
          return state;
        }
        
        if (Array.isArray(state)) {
          return state.map(item => getSerializableState(item));
        }
        
        if (typeof state === 'object') {
          // حذف DOM elements و سایر اشیاء غیرقابل serialize
          if (state instanceof HTMLElement || 
              state instanceof Event || 
              state instanceof Node) {
            return undefined;
          }
          
          // حذف توابع و اشیاء پیچیده
          const serializableObj: any = {};
          for (const key in state) {
            if (state.hasOwnProperty(key)) {
              // حذف کلیدهایی که معمولاً مشکل‌ساز هستند
              if (key.startsWith('__react') || 
                  key.startsWith('_react') || 
                  key === 'stateNode' ||
                  key === 'ownerDocument' ||
                  key === 'parentElement') {
                continue;
              }
              
              const value = state[key];
              // حذف توابع و اشیاء پیچیده
              if (typeof value !== 'function' && 
                  !(value instanceof HTMLElement) &&
                  !(value instanceof Event)) {
                serializableObj[key] = getSerializableState(value);
              }
            }
          }
          return serializableObj;
        }
        
        return state;
      };
      
      const serializableState = getSerializableState(this._state);
      const compressed = lz.compressToBase64(JSON.stringify(serializableState));
      localStorage.setItem('globalAppState', compressed);
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }


  // تابع برای تمیز کردن state قبل از ذخیره‌سازی
  public cleanStateForStorage(state: any): any {
    const cleanState = { ...state };
    
    // حذف properties مشکل‌ساز
    delete cleanState.__reactFiber;
    delete cleanState.__reactProps;
    delete cleanState._reactInternals;
    delete cleanState.stateNode;
    
    // تمیز کردن عمیق object
    const cleanDeep = (obj: any): any => {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
      
      if (Array.isArray(obj)) {
        return obj.map(cleanDeep);
      }
      
      const cleaned: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // حذف کلیدهای مشکل‌ساز
          if (key.startsWith('__react') || 
              key.startsWith('_react') || 
              key.includes('Fiber') ||
              key.includes('Node')) {
            continue;
          }
          
          const value = obj[key];
          // حذف DOM elements و توابع
          if (!(value instanceof HTMLElement) && 
              typeof value !== 'function' &&
              !(value instanceof Event)) {
            cleaned[key] = cleanDeep(value);
          }
        }
      }
      return cleaned;
    };
    
    return cleanDeep(cleanState);
  }

  // مقداردهی اولیه (init)
  public init(): any {
    return this._state;
  }

  // پیکربندی مجدد (reconfig)
  public reconfig(newConfig: any): any {
    this._state = lodash.merge({}, this._state, newConfig);
    this.saveToLocalStorage();
    return this._state;
  }

  // دریافت وضعیت فعلی
  public getState(): any {
    return this._state;
  }

  // بازنشانی به حالت پیش‌فرض
  public resetToDefault(): any {
    this._state = structuredClone(DEFAULT_GLOBAL_STATE);
    this.saveToLocalStorage();
    return this._state;
  }

  // سریال‌سازی





