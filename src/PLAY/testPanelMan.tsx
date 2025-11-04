// PLAY/testPanelMan.tsx
import React from "react";
import { usePanelMan } from "ACTR/RACT_panelman_V00.04";

export const PanelManTester: React.FC = () => {
  const panelMan = usePanelMan();

  React.useEffect(() => {
    if (panelMan && panelMan.envi) {
      console.log("🧪 PanelMan Tester Debug:", {
        accessibleRoutes: panelMan.getAccessibleRoutes(),
        hasBODY: !!panelMan.envi.BODY,
        BODYKeys: Object.keys(panelMan.envi.BODY || {})
      });
    }
  }, [panelMan]);

  if (!panelMan) {
    return <div>❌ PanelMan not available</div>;
  }

  const routes = panelMan.getAccessibleRoutes();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">🧪 PanelMan Tester</h3>
      <div className="text-sm">
        <div>✅ PanelMan: {panelMan ? "Loaded" : "Not loaded"}</div>
        <div>📋 Routes: {routes.join(", ") || "None"}</div>
        <div>🏠 Home exists: {routes.includes("home") ? "✅" : "❌"}</div>
      </div>
    </div>
  );
};