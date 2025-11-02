import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import { useEffect } from "react";

const DebugState = () => {
  const { envi } = initDyna();
  useEffect(() => {
    console.log("🌍 Current ENVI:", envi);
  }, [envi]);
  return null;
};

export default DebugState;
