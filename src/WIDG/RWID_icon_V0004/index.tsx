import { useState, useEffect } from "react";
import { useGlobalState } from "RDUX/dynamanContext";

export interface IconProps {
  geo?: { width?: number; height?: number };
  logic?: { onClick?: 0 | 1; rotate?: boolean };
  style?: { fontSize?: string; color?: string; margin?: string };
  children: React.ReactNode;
}

const IconComponent = ({ geo, logic, style, children }: IconProps) => {
  const { globalState, updateGlobalState } = useGlobalState();

  const value = globalState?.ENVI_glob?.glob_Packet_4?.filed_1?.value;
  const storedStyle = globalState?.ENVI_glob?.glob_Packet_4?.filed_2

  const [dynamicStyle, setDynamicStyle] = useState<React.CSSProperties>({
    ...style,
    width: geo?.width ? `${geo.width}px` : "auto",
    height: geo?.height ? `${geo.height}px` : "auto",
    cursor: logic?.onClick ? "pointer" : "default",
  });
  useEffect(() => {
    if (storedStyle) {
      setDynamicStyle((prev) => ({ ...prev, ...storedStyle }));
    }
  }, [storedStyle]);
  const handleClick = () => {
    updateGlobalState((prevState: any) => ({
      ...prevState,
      ENVI_glob: {
        ...prevState.ENVI_glob,
        glob_Packet_4: {
          ...prevState.ENVI_glob.glob_Packet_4,
          filed_1: {
            ...prevState.ENVI_glob.glob_Packet_4.filed_1,
            value: !value,
          },
        },
      },
    }));
  };
  return (
    <div onClick={handleClick} className="flex items-center">
      <span style={dynamicStyle}>{children}</span>
    </div>
  );
};

export default IconComponent;
