import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import themeReducer, { ThemeState } from "./theme/themeSlice";
import modalReducer from "./modal/modalSlice";
import { ModalState } from './modal/modalSlice'; 
export interface RootState {
  theme: ThemeState;
  modal: ModalState;
}

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
