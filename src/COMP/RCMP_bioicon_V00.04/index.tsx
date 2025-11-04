//@ts-nocheck
import { useState, useEffect, useRef } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import schmJson from "./.schm.json?raw";

export interface IconProps {
  geo?: { width?: string; height?: string };
  logic?: { onClick?: 0 | 1; id: string; isAssistant: boolean; addToLocall: boolean };
  style?: { fontSize?: string; color?: string; margin?: string; cursor?: string };
  children: React.ReactNode;
}

const BioIcon = ({ geo, logic, style, children }: IconProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(style || {});
  const [currentGeo, setCurrentGeo] = useState(geo || {});
  const { envi, reconfigDyna } = initDyna();
  const id = logic?.id || "";
  const parsJson = JSON.parse(schmJson)?.sections?.id?.meta || {};

  // 🟢 گوش دادن به تغییرات state گلوبال برای این آیکون
  useEffect(() => {
    const interval = setInterval(() => {
      if (!id) return;
      const comp = envi?.ENVI_GLOB?.globalState?.[id];
      const assist = envi?.ENVI_GLOB?.globalState?.assistant;

      const active = comp?.logic?.isAssistant && assist?.id === id;
      setIsActive(active);

      // 🟢 آپدیت استایل و geo از state گلوبال
      if (comp?.style) {
        setCurrentStyle(prev => ({ ...prev, ...comp.style }));
      }
      if (comp?.geo) {
        setCurrentGeo(prev => ({ ...prev, ...comp.geo }));
      }
    }, 400);

    return () => clearInterval(interval);
  }, [id, envi]);

  const handleClick = () => {
    if (!id) return;

    reconfigDyna((prevState: any) => {
      const currentContent = prevState.ENVI_GLOB?.globalState?.[id] || {};
      const currentAssistant = prevState.ENVI_GLOB?.globalState?.assistant || {};

      const newAssistantState = {
        ...currentAssistant,
        id: id,
        envimng: false,
        section: "meta",
      };

      const newComponentState = {
        ...currentContent,
        meta: { ...parsJson, ...currentContent.meta },
        geo: { ...currentContent.geo, ...currentGeo },
        logic: {
          ...currentContent.logic,
          ...logic,
          isAssistant: true,
          addToLocall: true,
        },
        style: { ...currentContent.style, ...currentStyle },
      };

      return {
        ...prevState,
        ENVI_GLOB: {
          ...prevState.ENVI_GLOB,
          globalState: {
            ...prevState.ENVI_GLOB?.globalState,
            [id]: newComponentState,
            assistant: newAssistantState,
          },
        },
      };
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-200 ${isActive ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-gray-800" : ""
        }`}
      style={currentStyle} // 🟢 استفاده از currentStyle به جای style
    >
      {children}
    </div>
  );
};

export default BioIcon;