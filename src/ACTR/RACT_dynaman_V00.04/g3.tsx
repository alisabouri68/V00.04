

/******************************************
AssetID:    	ActorGrp.3
AssetTitle:    	Actor Dyna Manager -scriptGroup-3 
Version:        V00.04

Last Update:    2025.08.22
By:             APPS.00

Description:  This templates is used for developing React Actors based on V00.04
******************************************/








	// Script Group 3



// ایجاد context
const GlobalStateContext = createContext<any>(null);

// initialState پیش‌فرض
const initialState = DEFAULT_GLOBAL_STATE;

// reducer برای مدیریت وضعیت
function globalStateReducer(state: any, action: any) {
  switch (action.type) {
    case 'INIT_STATE':
      return { ...state, ...action.payload };
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    case 'RESET_STATE':
      return { ...initialState };
    default:
      return state;
  }
}

// تابع برای تمیز کردن state از ساختارهای circular
const cleanStateForStorage = (state: any): any => {
  if (state === null || typeof state !== 'object') {
    return state;
  }
  
  if (Array.isArray(state)) {
    return state.map(cleanStateForStorage);
  }
  
  const cleaned: any = {};
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      // حذف properties مشکل‌ساز مربوط به React
      if (key.startsWith('__react') || 
          key.startsWith('_react') || 
          key.includes('Fiber') ||
          key.includes('Node') ||
          key === 'stateNode' ||
          key === 'ownerDocument' ||
          key === 'parentElement') {
        continue;
      }
      
      const value = state[key];
      // حذف DOM elements، توابع و اشیاء پیچیده
      if (!(value instanceof HTMLElement) && 
          typeof value !== 'function' &&
          !(value instanceof Event) &&
          !(value instanceof Node)) {
        cleaned[key] = cleanStateForStorage(value);
      }
    }
  }
  return cleaned;
};

// provider component
export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);
  const dynamanRef = React.useRef<Dynaman | null>(null);

  // مقداردهی اولیه
  useEffect(() => {
    // ایجاد نمونه Dynaman
    dynamanRef.current = new Dynaman();

    // بارگذاری وضعیت از localStorage
    const savedState = dynamanRef.current.init();

    if (savedState) {
      dispatch({ type: 'INIT_STATE', payload: savedState });
    }
  }, []);

  // ذخیره در localStorage هنگام تغییر
  useEffect(() => {
    if (dynamanRef.current) {
      // تمیز کردن state قبل از ذخیره‌سازی
      const cleanState = cleanStateForStorage(state);
      dynamanRef.current.reconfig(cleanState);
    }
  }, [state]);

  // توابع برای به‌روزرسانی وضعیت
  const updateGlobalState = (newState: any) => {
    // تمیز کردن state جدید قبل از dispatch
    const cleanState = cleanStateForStorage(newState);
    dispatch({ type: 'UPDATE_STATE', payload: cleanState });
  };

  const resetGlobalState = () => {
    dispatch({ type: 'RESET_STATE' });
    if (dynamanRef.current) {
      dynamanRef.current.resetToDefault();
    }
  };

  const value = {
    globalState: state,
    updateGlobalState,
    resetGlobalState
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const globalStateReducerFn = globalStateReducer;
export default GlobalStateProvider;