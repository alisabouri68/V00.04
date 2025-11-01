// COMP/RCMP_bioicon_V00.04/index.tsx
//@ts-nocheck
import { useState, useEffect, useRef } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import schmJson from "./.schm.json?raw"

export interface IconProps {
  geo?: { width?: string; height?: string };
  logic?: { onClick?: 0 | 1; id: string; isAssistant: boolean; addToLocall: boolean };
  style?: { fontSize?: string; color?: string; margin?: string; cursor?: string };
  children: React.ReactNode;
}

const BioIcon = ({ geo, logic, style, children }: IconProps) => {
  const [isActive, setIsActive] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const assistantRef = useRef<HTMLDivElement>(null);

  const parsJson = JSON.parse(schmJson)?.sections?.id?.meta || {};
  const { envi, reconfigDyna } = initDyna();
  const id = logic?.id || "";
  
  // دیباگ برای دیدن وضعیت فعلی
  console.log("🔍 BioIcon Debug:", {
    id,
    currentState: envi?.ENVI_GLOB?.globalState?.[id],
    isAssistantActive: envi?.ENVI_GLOB?.globalState?.[id]?.logic?.isAssistant
  });

  const handleClick = () => {
    if (!id) return;

    console.log("🔄 BioIcon clicked:", id);

    reconfigDyna((prevState: any) => {
      const currentContent = prevState.ENVI_GLOB?.globalState?.[id] || {};
      const currentAssistant = prevState.ENVI_GLOB?.globalState?.assistant || {};
      
      // وضعیت جدید برای Assistant
      const newAssistantState = {
        ...currentAssistant,
        id: id,
        envimng: false,
        section: "meta" // اضافه کردن section پیش‌فرض
      };

      // وضعیت جدید برای کامپوننت
      const newComponentState = {
        ...currentContent,
        meta: { ...parsJson, ...currentContent.meta },
        geo: { ...currentContent.geo, ...geo },
        logic: { 
          ...currentContent.logic, 
          ...logic, 
          isAssistant: true, // همیشه true شود
          addToLocall: true 
        },
        style: { ...currentContent.style, ...style }
      };

      console.log("📝 Setting new state:", {
        assistant: newAssistantState,
        component: newComponentState
      });

      return {
        ...prevState,
        ENVI_GLOB: {
          ...prevState.ENVI_GLOB,
          globalState: {
            ...prevState.ENVI_GLOB?.globalState,
            [id]: newComponentState,
            assistant: newAssistantState
          },
        },
      };
    });
    
    setIsActive(true);
  };

  // Effect برای sync شدن با state全局
  useEffect(() => {
    if (id) {
      const componentState = envi?.ENVI_GLOB?.globalState?.[id];
      const assistantState = envi?.ENVI_GLOB?.globalState?.assistant;
      
      const shouldBeActive = 
        componentState?.logic?.isAssistant && 
        assistantState?.id === id;
      
      setIsActive(shouldBeActive);
      
      console.log("🔄 BioIcon effect update:", {
        id,
        shouldBeActive,
        componentAssistant: componentState?.logic?.isAssistant,
        assistantId: assistantState?.id
      });
    }
  }, [envi, id]);

  return (
    <div
      ref={iconRef}
      onClick={handleClick}
      className={`flex items-center cursor-pointer ${isActive ? 'ring-2 ring-blue-500 rounded-md' : ''}`}
    >
      <span style={style}>{children}</span>
    </div>
  );
};

export default BioIcon;