
import { configureStore } from '@reduxjs/toolkit';
import  globalStateReducer  from './dynamanSlice';

export const store = configureStore({
  reducer: {
    globalState: globalStateReducer,
   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;












































// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import themeReducer,{ThemeState} from "./theme/themeSlice";
// import modalReducer from "./modal/modalSlice";
// import { ModalState } from './modal/modalSlice'; 
// import quickAccessReducer from "./quickAccessSlice/quickAccessSlice";
// import {QuickAccessState} from "./quickAccessSlice/quickAccessSlice"
// export interface RootState {
//   theme: ThemeState;
//   modal: ModalState;
//   quickAccess: QuickAccessState;
// }

// export const store = configureStore({
//   reducer: {
//     theme: themeReducer,
//     modal: modalReducer,
//     quickAccess: quickAccessReducer,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;








