import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from '../theme/themeSlice';

// تعریف RootState
export interface RootState {
  theme: ThemeState;
}

// ایجاد استور با تعریف صریح انواع
export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// صادر کردن انواع برای استفاده در کامپوننت‌ها
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;