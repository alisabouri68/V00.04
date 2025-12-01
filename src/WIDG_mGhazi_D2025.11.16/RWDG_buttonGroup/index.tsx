/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { Message, Setting2, User } from "iconsax-react";
import React from "react";
import DynamicButton, { Props as DynamicButtonProps } from "WIDG_mGhazi_D2025.11.16/RWDG_button/index";

// --- تعریف داده‌ی هر دکمه ---
interface ButtonData extends Omit<DynamicButtonProps, "children"> {
  id: string | undefined;
  label: React.ReactNode;
}

// --- تعریف Props برای ButtonGroup ---
export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    buttons: ButtonData[];
  };
  style?: CSSObject; // جایگزین style اصلی
}

// --- داده‌ی پیش‌فرض برای دکمه‌ها ---
export const defaultLogic: { buttons: ButtonData[] } = {
  buttons: [
    { id: "profile", label: "Profile", logic: { icon: User } },
    { id: "settings", label: "Settings", logic: { icon: Setting2 } },
    { id: "messages", label: "Messages", logic: { icon: Message } },
  ],
};

// --- کامپوننت اصلی ---
const ButtonGroup: React.FC<Props> = ({
  geometric,
  logic = defaultLogic,
  style = {},
  ...props
}) => {
  const componentCss: CSSObject = {
    display: "inline-flex",
    width: geometric?.width,
    height: geometric?.height,
    ...style,
  };

  return (
    <div css={componentCss} {...props}>
      {logic?.buttons?.map(({ id, label, ...buttonProps }) => (
        <DynamicButton key={id} {...buttonProps}>
          {label}
        </DynamicButton>
      ))}
    </div>
  );
};

export default ButtonGroup;