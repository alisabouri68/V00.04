import React from "react";
import { GlobalStateProvider, useGlobalState } from "../../RDUX/dynamanContext";
export function cleanStateForStorage(state: any): any {
  if (state === null || typeof state !== "object") return state;
  if (Array.isArray(state)) return state.map(cleanStateForStorage);

  const cleaned: any = {};

  for (const key in state) {
    if (!Object.prototype.hasOwnProperty.call(state, key)) continue;

    if (
      key.startsWith("__react") ||
      key.startsWith("_react") ||
      key.includes("Fiber") ||
      key.includes("Node") ||
      key === "stateNode"
    )
      continue;

    const value = state[key];

    const isDom =
      typeof window !== "undefined" &&
      (value instanceof HTMLElement ||
        value instanceof Event ||
        value instanceof Node);

    if (!isDom && typeof value !== "function") {
      cleaned[key] = cleanStateForStorage(value);
    }
  }

  return cleaned;
}

// کامپوننت اصلی DynaCtrl
const DynaCtrl: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  try {
    localStorage.setItem("testKey", "testValue");
    console.log(localStorage.getItem("testKey")); // باید 'testValue' باشه
  } catch (e) {
    console.error("localStorage is not available:", e);
  }

  return <GlobalStateProvider>{children}</GlobalStateProvider>;
};

// کامپوننت برای اعمال تم بر اساس state
export const GlobalStateApplier: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { globalState } = useGlobalState();

  React.useEffect(() => {
    if (globalState.theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [globalState.theme]);

  return <>{children}</>;
};

// هوک برای دسترسی سریع به state و آپدیت ایمن
export const useDynaCtrl = () => {
  const { globalState, updateGlobalState, resetGlobalState } = useGlobalState();

  const safeUpdateGlobalState = React.useCallback(
    (newState: any) => {
      const cleanState = cleanStateForStorage(newState);
      updateGlobalState(cleanState); // merge با state فعلی و ذخیره در Dynaman
    },
    [updateGlobalState]
  );

  return {
    globalState,
    updateGlobalState: safeUpdateGlobalState,
    resetGlobalState,
  };
};

export default DynaCtrl;
