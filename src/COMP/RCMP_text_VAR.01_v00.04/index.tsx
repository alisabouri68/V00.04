/******************************************
Component TEXT

Last Update:    2025.07.19
By:             APSS.00

Description:  This component renders styled text elements based on size, weight, alignment, and semantic HTML tag. It supports theming, customization, and reusable UI design in React applications using Smart-Comp Architecture.
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_text 
Title:          Component Template - React Version
Version:        V00.04
VAR:            01 

last-update:    D2025.07.19
owner:          APSS.00

Description:    Here ...
------------------------------------------------------------*/

/**************************************
 * Step 01 import dependencies 
 **************************************/


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
type ElementType = keyof JSX.IntrinsicElements;

interface TextProps {
    children: React.ReactNode;
    size?: Size;
    weight?: Weight;
    align?: Align;
    as?: ElementType;
    color?: string;
    className?: string;
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
    color = "text-text-light-custom",
    className = "",
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
     * Step 08 Render element with styles
     **************************************/
    return <Comp className={combinedClassName}>{children}</Comp>;
}