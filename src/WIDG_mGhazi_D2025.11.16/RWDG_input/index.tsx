/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/serialize";
import {
  TextInput as FlowbiteTextInput,
  type TextInputProps as FlowbiteTextInputProps,
} from "flowbite-react";
import React from "react";

// Props برای کامپوننت سفارشی
export interface Props extends Omit<FlowbiteTextInputProps, "children" | "style"> {
  geometric?: {
    width?: string;
    height?: string;
  };
  logic?: {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
  };
  style?: CSSObject; // جایگزین style اصلی
}

// --- داده‌ی پیش‌فرض ---
export const defaultLogic = {
  label: "Username",
  helperText: "Must be unique and at least 8 characters long.",
};

const TextInput: React.FC<Props> = ({
  geometric = { width: "100%" },
  logic = defaultLogic,
  style = {},
  id = "default-dynamic-textinput",
  ...props
}) => {
  const componentCss: CSSObject = {
    width: geometric.width,
    height: geometric.height,
    ...style,
  };

  const { label, helperText } = logic;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <FlowbiteTextInput id={id} {...props} css={componentCss} />
      {helperText && (
        <p className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextInput;