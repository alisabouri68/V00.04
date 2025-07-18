import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// تعریف و صادر کردن انواع
export type ThemeMode = 'light' | 'dark' | 'system';

// صادر کردن interface برای استفاده در store
export interface ThemeState {
  mode: ThemeMode;
  systemTheme: 'light' | 'dark';
}

const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
};

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    return savedTheme || 'system';
  }
  return 'system';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
  systemTheme: getSystemTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
      
      if (action.payload === 'system') {
        state.systemTheme = getSystemTheme();
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;