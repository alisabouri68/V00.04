import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";
export interface ModalState {
  isOpen: boolean;
  content: ReactNode;
}
const initialState = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload.content;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
