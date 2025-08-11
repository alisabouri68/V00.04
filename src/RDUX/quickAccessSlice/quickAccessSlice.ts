// src/store/quickAccessSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BasketItem {
  id: string;
  icon: string;
  href: string;
  title: string;
  para?: boolean;
  lock?: boolean;
  pin?: boolean;
}

export interface QuickAccessState {
  items: BasketItem[];
}

const initialState: QuickAccessState = {
  items: [],
};

const quickAccessSlice = createSlice({
  name: "quickAccess",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<BasketItem[]>) {
      state.items = action.payload;
    },
    addItem(state, action: PayloadAction<BasketItem>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
 
  },
});

export const { setItems, addItem, removeItem } = quickAccessSlice.actions;
export default quickAccessSlice.reducer;
