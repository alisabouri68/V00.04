// globalStateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import lodash from "lodash";
import Dynaman, { DEFAULT_GLOBAL_STATE } from "../ACTR/RACT_dynaman_V00.0/index";

// Types
type GlobalState = typeof DEFAULT_GLOBAL_STATE;

// Initial state (safe clone)
const initialState: GlobalState = lodash.cloneDeep(DEFAULT_GLOBAL_STATE);

// Dynaman instance
const dynaman = new Dynaman();

// Load initial state from localStorage if available
const savedState = dynaman.init();
const initialGlobalState: GlobalState = savedState
  ? { ...initialState, ...savedState }
  : initialState;

const globalStateSlice = createSlice({
  name: "globalState",
  initialState: initialGlobalState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<GlobalState>>) => {
      Object.assign(state, action.payload);
      
      dynaman.reconfig(state);
    },
    resetState: (state) => {
      Object.assign(state, lodash.cloneDeep(DEFAULT_GLOBAL_STATE));
      dynaman.reconfig(state);
    },
  },
});

export const { updateState, resetState } = globalStateSlice.actions;
export default globalStateSlice.reducer;
