/******************************************
Component TEXT with Enhanced Shimmer Loading

Last Update:    2025.07.19
By:             APSS.00

Description:  Enhanced text component with professional shimmer loading effect
******************************************/

import { useState, useEffect, CSSProperties } from 'react';

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
type ShimmerType = "single" | "multi" | "paragraph" | "responsive";

interface TextProps {
  children: React.ReactNode;
  size?: Size;
  weight?: Weight;
  align?: Align;
  as?: React.ElementType;
  color?: string;
  className?: string;
  isLoading?: boolean;
  shimmerType?: ShimmerType;
  shimmerLines?: number;
  shimmerColor?: string;
  shimmerToColor?: string;
  shimmerHeight?: string;
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

/**************************************
 * Step 03 Define weight mappings
 **************************************/
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

/**************************************
 * Step 04 Define alignment mappings
 **************************************/
const alignMap: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**************************************
 * Step 05 Component Declaration
 **************************************/
export default function Text({
  children,
  size = "base",
  weight = "normal",
  align = "left",
  as = "span",
  color = "inherit",
  className = "",
  isLoading = false,
  shimmerType = "responsive",
  shimmerLines = 3,
  shimmerColor = "#f5f5f5",
  shimmerToColor = "#eaeaea",
  shimmerHeight = "1em",
  ...props
}: TextProps) {
  /**************************************
   * Step 06 Define the element tag
   **************************************/
  const Comp = as;

  /**************************************
   * Step 07 Build className string
   **************************************/
  const combinedClassName = [
    sizeMap[size],
    weightMap[weight],
    alignMap[align],
    color,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /**************************************
   * Step 08 Calculate shimmer styles
   **************************************/
  const shimmerBaseStyle: CSSProperties = {
    background: `linear-gradient(90deg, ${shimmerColor} 8%, ${shimmerToColor} 18%, ${shimmerColor} 33%)`,
    backgroundSize: '1200% 100%',
    animation: 'shimmer 1.5s infinite linear',
    borderRadius: '4px',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: shimmerHeight,
  };

  /**************************************
   * Step 09 Render shimmer effect
   **************************************/
  const renderShimmer = () => {
    // Responsive shimmer automatically adapts to content
    if (shimmerType === "responsive") {
      return (
        <span 
          className="w-full h-full block shimmer-mask"
          style={{
            ...shimmerBaseStyle,
            maxWidth: '100%',
            minWidth: '50%',
          }}
        />
      );
    }

    // Single line shimmer
    if (shimmerType === "single") {
      return (
        <span 
          style={{
            ...shimmerBaseStyle,
            width: '100%',
          }}
        />
      );
    }
    
    // Multi-line shimmer
    if (shimmerType === "multi") {
      return (
        <div className="w-full flex flex-col gap-2">
          {Array.from({ length: shimmerLines }).map((_, index) => (
            <div
              key={index}
              style={{
                ...shimmerBaseStyle,
                width: index === shimmerLines - 1 ? '80%' : '100%',
                height: shimmerHeight,
              }}
            />
          ))}
        </div>
      );
    }
    
    // Paragraph-style shimmer
    return (
      <div className="w-full flex flex-col gap-2">
        <div style={{ ...shimmerBaseStyle, width: '100%', height: shimmerHeight }} />
        <div style={{ ...shimmerBaseStyle, width: '100%', height: shimmerHeight }} />
        <div style={{ ...shimmerBaseStyle, width: '95%', height: shimmerHeight }} />
        <div style={{ ...shimmerBaseStyle, width: '92%', height: shimmerHeight }} />
        <div style={{ ...shimmerBaseStyle, width: '85%', height: shimmerHeight }} />
      </div>
    );
  };

  /**************************************
   * Step 10 Render element with styles
   **************************************/
  return (
    <>
      {isLoading ? (
        <Comp 
          className={`${combinedClassName} inline-block shimmer-container`} 
          aria-busy="true"
          {...props}
        >
          {renderShimmer()}
        </Comp>
      ) : (
        <Comp className={combinedClassName} {...props}>
          {children}
        </Comp>
      )}
    </>
  );
}