import { useGlobalState } from "../../RDUX/dynamanContext";
import schmRaw from ".schm.json?raw";
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
type JsonFile = Record<string, any>;
interface TextProps {
  children: React.ReactNode;
  size?: Size;
  weight?: Weight;
  align?: Align;
  as?: React.ElementType;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  jsonAdd?: boolean; // اضافه کردن jsonAdd به interface
}

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

function Text({
  children,
  size = "base",
  weight = "normal",
  align = "left",
  as = "span",
  className = "",
  onClick,
  jsonAdd, // اضافه کردن jsonAdd به پارامترهای تابع
  ...props // دریافت سایر props
}: TextProps) {
  const { updateGlobalState } = useGlobalState();
  const schmJson: JsonFile = JSON.parse(schmRaw);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("Text clicked!");
    if (jsonAdd) {
      updateGlobalState({ filed6: schmJson });
    }
    if (onClick) {
      onClick(e);
    }
  };
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
      onClick={handleClick} 
      {...props} 
    >
      {children}
    </Comp>
  );
}

export default Text;