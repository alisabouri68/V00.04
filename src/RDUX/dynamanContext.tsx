import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Dynaman, { DEFAULT_GLOBAL_STATE } from '../ACTR/RACT_dynaman_V00.0';
import lodash from "lodash";

// ایجاد context
const GlobalStateContext = createContext<any>(null);

// initialState پیش‌فرض (clone برای جلوگیری از reference مشکل‌زا)
const initialState = lodash.cloneDeep(DEFAULT_GLOBAL_STATE);

// reducer برای مدیریت وضعیت
function globalStateReducer(state: any, action: any) {
  switch (action.type) {
    case 'INIT_STATE':
      return { ...state, ...action.payload };
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    case 'RESET_STATE':
      return { ...action.payload }; 
    default:
      return state;
  }
}

// provider component
export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);
  const dynamanRef = React.useRef<Dynaman | null>(null);

  // مقداردهی اولیه
  useEffect(() => {
    dynamanRef.current = new Dynaman();
    const savedState = dynamanRef.current.init();

    if (savedState) {
      console.log(savedState)
      dispatch({ type: 'INIT_STATE', payload: savedState });
    }
  }, []);

  // اعمال تم بر اساس وضعیت
  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [state.theme]);

  // تابع به‌روزرسانی state و ذخیره همزمان در Dynaman / localStorage
  const updateGlobalState = (newState: any) => {
    const mergedState = { ...state, ...newState };
    dispatch({ type: 'UPDATE_STATE', payload: newState });

    if (dynamanRef.current) {
      dynamanRef.current.reconfig(mergedState); // فقط ذخیره، dispatch نکن
    }
  };

  // تابع ریست state
  const resetGlobalState = () => {
    if (dynamanRef.current) {
      const resetState = dynamanRef.current.resetToDefault();
      dispatch({ type: 'RESET_STATE', payload: resetState });
      dynamanRef.current.reconfig(resetState); // ذخیره در localStorage
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

// هوک دسترسی به context
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const globalStateReducerFn = globalStateReducer;
export default GlobalStateProvider;
