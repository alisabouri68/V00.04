/******************************************
Component TEXT (Clean Version)

Last Update:    2025.08.27
By:             APSS.00

Description:  Simple text component with size, weight, align and color
******************************************/

import { CSSProperties } from "react";

/**************************************
 * Step 01 Define types and interfaces
 **************************************/

type Size = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type Weight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";
type Align = "left" | "center" | "right" | "justify";

interface TextProps {
  children: React.ReactNode;
  size?: Size;
  weight?: Weight;
  align?: Align;
  as?: React.ElementType;
  color?: string; // hex, rgb یا اسم رنگ
  className?: string;
  style?: CSSProperties;
}

/**************************************
 * Step 02 Define style maps
 **************************************/
const sizeMap: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const weightMap: Record<Weight, string> = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const alignMap: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**************************************
 * Step 03 Component Declaration
 **************************************/
function Text({
  children,
  size = "base",
  weight = "normal",
  align = "left",
  as = "span",
  color = "inherit",
  className = "",
  style,
  ...props
}: TextProps) {
  const Comp = as;

  const combinedClassName = [
    sizeMap[size],
    weightMap[weight],
    alignMap[align],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Comp
      className={combinedClassName}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default Text;
