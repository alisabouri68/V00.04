
/******************************************
Play- Dynactrl

Last Update:    2025.10.05
By:             APPS.68

Description:  This templates is used for developing React PLAY based on V00.04
******************************************/



// *************************************
// Meta Data
/*----------------------------------------------------------

ID:             Dynactrl 
Title:          PLAY Dynactrl - React Version
Version:        V00.04
VAR:            01 (remarks ....)
last-update:    D2025.10.05
owner:          APPS.68

Description:    Here ...

------------------------------------------------------------*/
// ************************************
//  Step 01 import dependencies - kernels
// ************************************
import React, { createContext, useContext, useReducer, useEffect } from "react";
import Dynaman, { DEFAULT_GLOBAL_STATE } from "../../ACTR/RACT_dynaman_V00.0";
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

const DynamanProvider: React.FC<{ children: React.ReactNode }> = ({
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





  const reconfigDyna = (newStateOrFn: any) => {
    const newState = typeof newStateOrFn === "function" ? newStateOrFn(state) : newStateOrFn;
    const mergedState = lodash.merge(lodash.cloneDeep(state), newState);
    dispatch({ type: "UPDATE_STATE", payload: mergedState });
    if (dynamanRef.current) {
      dynamanRef.current.reconfig(mergedState);
    }
  };
  const resetDyna = () => {
    if (dynamanRef.current) {
      const resetState = dynamanRef.current.resetToDefault();
      dispatch({ type: "RESET_STATE", payload: resetState });
      dynamanRef.current.reconfig(resetState);
    }
  };
  const value = {
    envi: state,
    reconfigDyna,
    resetDyna,
  };
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
export const initDyna = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("initDyna must be used within a GlobalStateProvider");
  }
  return context;
};

export const globalStateReducerFn = globalStateReducer;
export default DynamanProvider;
