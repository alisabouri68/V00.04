import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import themeReducer, { ThemeState } from "./theme/themeSlice";
import modalReducer from "./modal/modalSlice";
import { ModalState } from './modal/modalSlice'; 
import quickAccessReducer from "./quickAccessSlice/quickAccessSlice";
import {QuickAccessState} from "./quickAccessSlice/quickAccessSlice"
export interface RootState {
  theme: ThemeState;
  modal: ModalState;
  quickAccess: QuickAccessState;
}

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal: modalReducer,
    quickAccess: quickAccessReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
