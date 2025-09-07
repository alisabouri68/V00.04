import React, { createContext, useContext, useReducer, useEffect } from "react";
import Dynaman, { DEFAULT_GLOBAL_STATE } from "../ACTR/RACT_dynaman_V00.0";
import lodash from "lodash";

const GlobalStateContext = createContext<any>(null);

const initialState = lodash.cloneDeep(DEFAULT_GLOBAL_STATE);

function globalStateReducer(state: any, action: any) {
  switch (action.type) {
    case "INIT_STATE":
      return { ...state, ...action.payload };
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
    case "RESET_STATE":
      return { ...action.payload };
    default:
      return state;
  }
}

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);
  const dynamanRef = React.useRef<Dynaman | null>(null);

  useEffect(() => {
    dynamanRef.current = new Dynaman();
    const savedState = dynamanRef.current.init();

    if (savedState) {
      dispatch({ type: "INIT_STATE", payload: savedState });
    }
  }, []);





const updateGlobalState = (newStateOrFn: any) => {
  const newState =
    typeof newStateOrFn === "function" ? newStateOrFn(state) : newStateOrFn;

  const mergedState = lodash.merge(lodash.cloneDeep(state), newState);
  dispatch({ type: "UPDATE_STATE", payload: mergedState });

  if (dynamanRef.current) {
    dynamanRef.current.reconfig(mergedState);
  }
};


  const resetGlobalState = () => {
    if (dynamanRef.current) {
      const resetState = dynamanRef.current.resetToDefault();
      dispatch({ type: "RESET_STATE", payload: resetState });
      dynamanRef.current.reconfig(resetState);
    }
  };

  const value = {
    globalState: state,
    updateGlobalState,
    resetGlobalState,
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
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export const globalStateReducerFn = globalStateReducer;
export default GlobalStateProvider;
