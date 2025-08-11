import { setItems } from "./quickAccessSlice";
import { AppDispatch } from "../store";

export const loadQuickAccessFromLocalStorage = () => (dispatch: AppDispatch) => {
  const stored = localStorage.getItem("basketData_v2");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const quickAccessData = parsed["Quick Access"] || [];
      dispatch(setItems(quickAccessData));
    } catch {
      dispatch(setItems([]));
    }
  } else {
    dispatch(setItems([]));
  }
};
