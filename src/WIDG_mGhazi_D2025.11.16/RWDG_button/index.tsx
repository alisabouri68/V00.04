/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { Button as FlowbiteButton, type ButtonProps } from "flowbite-react";
import { Send } from "iconsax-react";
import React from "react";

export interface Props extends Omit<ButtonProps, "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    content?: React.ReactNode;
    icon?: React.ElementType;
    iconPosition?: "left" | "right";
  };
  style?: CSSObject; // جایگزین style اصلی
}

// --- داده‌ی پیش‌فرض ---
export const defaultLogic = {
  content: "Click Me",
  icon: Send,
  iconPosition: "left" as const,
};

const Button: React.FC<Props> = ({
  geometric,
  logic = defaultLogic,
  style = {},
  children,
  ...props
}) => {
  const componentCss: CSSObject = {
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  const { icon: IconComponent, iconPosition } = logic;
  const finalContent = children ?? logic.content;

  const iconElement = IconComponent && (
    <span
      className={
        finalContent ? (iconPosition === "left" ? "mr-2" : "ml-2") : ""
      }
    >
      <IconComponent size="1.2em" />
    </span>
  );

  return (
    <FlowbiteButton {...props} css={componentCss}>
      {iconPosition === "left" && iconElement}
      {finalContent}
      {iconPosition === "right" && iconElement}
    </FlowbiteButton>
  );
};

export default Button;