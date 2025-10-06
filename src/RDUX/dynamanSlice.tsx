// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import lodash from "lodash";
// import Dynaman, {
//   DEFAULT_GLOBAL_STATE,
// } from "../ACTR/RACT_dynaman_V00.0/index";

// type GlobalState = typeof DEFAULT_GLOBAL_STATE;

// const initialState: GlobalState = lodash.cloneDeep(DEFAULT_GLOBAL_STATE);

// const dynaman = new Dynaman();

// const savedState = dynaman.init();
// const initialGlobalState: GlobalState = savedState
//   ? { ...initialState, ...savedState }
//   : initialState;

// const globalStateSlice = createSlice({
//   name: "globalState",
//   initialState: initialGlobalState,
//   reducers: {
//     updateState: (state, action: PayloadAction<Partial<GlobalState>>) => {
//       Object.assign(state, action.payload);

//       dynaman.reconfig(state);
//     },
//     resetState: (state) => {
//       Object.assign(state, lodash.cloneDeep(DEFAULT_GLOBAL_STATE));
//       dynaman.reconfig(state);
//     },
//   },
// });

// export const { updateState, resetState } = globalStateSlice.actions;
// export default globalStateSlice.reducer;
