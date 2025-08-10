import { ReactNode } from "react";

type Size = "xs" | "sm" | "base" | "lg" | "xl";

interface TextProps {
  children: ReactNode;
  classNames?: string;
  size?: Size;
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function Text({ 
  children, 
  classNames = "", 
  size = "base" 
}: TextProps) {
  const combinedClassName = [
    sizeClasses[size],
    classNames
  ].filter(Boolean)
  .join(" ");

  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
}