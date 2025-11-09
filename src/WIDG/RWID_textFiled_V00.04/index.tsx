import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiEye, FiEyeOff } from "react-icons/fi";

/**
 * TextField - a professional, template-compatible input component
 * Props follow the same 3-part pattern as your Dropdown: geometric, logic, style
 * - geometric: layout hints (width, sizeAlias)
 * - logic: behavior (type, value, onChange, label, iconLeft, iconRight, disabled, placeholder, errorText, helperText, variant, color)
 * - style: full list of tailwind class overrides (see defaults below)
 *
 * Features:
 * - variants: "solid" | "outline" | "light"
 * - colors: matches Dropdown's color keys (default, blue, cyan, dark, gray, green, indigo, light, lime, pink, purple, red, teal, yellow)
 * - sizes: "sm" | "md" | "lg"
 * - icons (left / right) with proper padding
 * - password visibility toggle when type === "password"
 * - textarea support when logic.type === "textarea"
 * - accessible labels, helperText, errorText
 */

export type TextFieldLogic = {
  label?: React.ReactNode;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "search"
    | "date"
    | "textarea";
  value?: string | number;
  onChange?: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode; // if password, will be replaced by eye toggle unless provided and keepEye=false
  keepEye?: boolean; // keep iconRight as-is even for password
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "light";
  color?:
    | "default"
    | "alternative"
    | "blue"
    | "cyan"
    | "dark"
    | "gray"
    | "green"
    | "indigo"
    | "light"
    | "lime"
    | "pink"
    | "purple"
    | "red"
    | "teal"
    | "yellow";
};

export interface TextFieldStyle {
  base_container?: string;
  base_label?: string;
  base_input?: string;
  base_helper?: string;
  base_error?: string;
  disabled_opacity?: string;
  // sizes
  size_sm?: string;
  size_md?: string;
  size_lg?: string;
  // variants/colors (solid)
  colorDefault_bgColor?: string;
  colorDefault_textColor?: string;
  colorDefault_hover_bgColor?: string;
  colorDefault_focus_ringColor?: string;
  colorIndigo_bgColor?: string;
  colorIndigo_textColor?: string;
  colorIndigo_hover_bgColor?: string;
  colorIndigo_focus_ringColor?: string;
  colorGreen_bgColor?: string;
  colorGreen_textColor?: string;
  colorGreen_hover_bgColor?: string;
  colorGreen_focus_ringColor?: string;
  colorRed_bgColor?: string;
  colorRed_textColor?: string;
  colorRed_hover_bgColor?: string;
  colorRed_focus_ringColor?: string;
  // outline variants
  outlineColorDefault_borderColor?: string;
  outlineColorDefault_textColor?: string;
  outlineColorDefault_hover_bgColor?: string;
  outlineColorDefault_hover_textColor?: string;
  outlineColorIndigo_borderColor?: string;
  outlineColorIndigo_textColor?: string;
  outlineColorIndigo_hover_bgColor?: string;
  outlineColorIndigo_hover_textColor?: string;
  outlineColorGreen_borderColor?: string;
  outlineColorGreen_textColor?: string;
  outlineColorGreen_hover_bgColor?: string;
  outlineColorGreen_hover_textColor?: string;
}

export interface TextFieldProps {
  geometric?: { width?: string; size?: string; rounded?: string };
  logic?: TextFieldLogic;
  style?: TextFieldStyle;
}

const DEFAULT_STYLE: TextFieldStyle = {
  base_container: "flex flex-col gap-1",
  base_label: "text-sm font-medium text-gray-700",
  base_input:
    "w-full border placeholder-gray-400 focus:outline-none transition-colors duration-150",
  base_helper: "text-xs text-gray-500",
  base_error: "text-xs text-red-600",
  disabled_opacity: "opacity-50 cursor-not-allowed",
  size_sm: "text-sm py-1 px-2",
  size_md: "text-sm py-2 px-3",
  size_lg: "text-base py-3 px-4",

  // solid / default
  colorDefault_bgColor: "bg-white",
  colorDefault_textColor: "text-gray-700",
  colorDefault_hover_bgColor: "hover:bg-gray-50",
  colorDefault_focus_ringColor: "focus:ring-primary-300",

  // indigo solid
  colorIndigo_bgColor: "bg-indigo-600",
  colorIndigo_textColor: "text-white",
  colorIndigo_hover_bgColor: "hover:bg-indigo-700",
  colorIndigo_focus_ringColor: "focus:ring-indigo-300",

  // green solid
  colorGreen_bgColor: "bg-green-600",
  colorGreen_textColor: "text-white",
  colorGreen_hover_bgColor: "hover:bg-green-700",
  colorGreen_focus_ringColor: "focus:ring-green-300",

  // red solid
  colorRed_bgColor: "bg-red-600",
  colorRed_textColor: "text-white",
  colorRed_hover_bgColor: "hover:bg-red-700",
  colorRed_focus_ringColor: "focus:ring-red-300",

  // outline defaults
  outlineColorDefault_borderColor: "border border-gray-300",
  outlineColorDefault_textColor: "text-gray-700",
  outlineColorDefault_hover_bgColor: "hover:bg-gray-50",
  outlineColorDefault_hover_textColor: "hover:text-gray-900",

  outlineColorIndigo_borderColor: "border border-indigo-600",
  outlineColorIndigo_textColor: "text-indigo-700",
  outlineColorIndigo_hover_bgColor: "hover:bg-indigo-50",
  outlineColorIndigo_hover_textColor: "hover:text-indigo-800",

  outlineColorGreen_borderColor: "border border-green-600",
  outlineColorGreen_textColor: "text-green-700",
  outlineColorGreen_hover_bgColor: "hover:bg-green-50",
  outlineColorGreen_hover_textColor: "hover:text-green-800",
};

const TextField: React.FC<TextFieldProps> = ({
  geometric = { width: "w-full", size: "md", rounded: "rounded-lg" },
  logic = { type: "text", size: "md", variant: "outline", color: "default" },
  style = DEFAULT_STYLE,
}) => {
  const { label } = logic;
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // if disabled focus etc handled by attributes
  }, []);

  const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

  // derive size class
  const sizeClass = logic.size === "sm" ? style.size_sm : logic.size === "lg" ? style.size_lg : style.size_md;

  // derive variant/color classes
  const getSolid = (colorName: string) => {
    const C = cap(colorName);
    return twMerge((style as any)[`color${C}_bgColor`] ?? "", (style as any)[`color${C}_textColor`] ?? "", (style as any)[`color${C}_hover_bgColor`] ?? "");
  };
  const getOutline = (colorName: string) => {
    const C = cap(colorName);
    return twMerge((style as any)[`outlineColor${C}_borderColor`] ?? "", (style as any)[`outlineColor${C}_textColor`] ?? "");
  };

  const variant = logic.variant || "outline";
  const color = logic.color || "default";

  const variantClasses = variant === "solid" ? getSolid(color) : getOutline(color);

  const baseInput = twMerge(
    style.base_input,
    sizeClass,
    geometric.width,
    geometric.rounded,
    variantClasses,
    focused ? (style.colorIndigo_focus_ringColor ?? style.colorDefault_focus_ringColor) : "",
    logic?.disabled ? style.disabled_opacity : ""
  );

  const hasError = !!logic.errorText;

  // compute padding offsets if icons present
  const withLeftIcon = !!logic.iconLeft;
  const withRightIcon = !!logic.iconRight || (logic.type === "password" && !logic.keepEye);

  const inputClassWithIcons = twMerge(baseInput, withLeftIcon ? "pl-10" : "", withRightIcon ? "pr-10" : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    logic.onChange?.(e.target.value);
  };

  // render input or textarea
  const renderField = () => {
    if (logic.type === "textarea") {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={logic.value ?? ""}
          onChange={handleChange}
          placeholder={logic.placeholder}
          className={inputClassWithIcons}
          disabled={logic.disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={hasError}
          aria-describedby={hasError ? "tf-error" : logic.helperText ? "tf-help" : undefined}
        />
      );
    }

    const actualType = logic.type === "password" ? (showPassword ? "text" : "password") : (logic.type as string);

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={actualType}
        value={logic.value ?? ""}
        onChange={handleChange}
        placeholder={logic.placeholder}
        className={inputClassWithIcons}
        disabled={logic.disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={hasError}
        aria-describedby={hasError ? "tf-error" : logic.helperText ? "tf-help" : undefined}
      />
    );
  };

  return (
    <div className={twMerge(style.base_container, "relative")}> 
      {label && <label className={style.base_label}>{label}</label>}

      <div className="relative flex items-center">
        {withLeftIcon && <span className="absolute left-3 text-gray-400">{logic.iconLeft}</span>}

        {renderField()}

        {/* right icon area: custom iconRight or password toggle */}
        {logic.type === "password" && !logic.keepEye ? (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 inline-flex items-center justify-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        ) : logic.iconRight ? (
          <span className="absolute right-3 text-gray-400">{logic.iconRight}</span>
        ) : null}
      </div>

      {logic.helperText && !hasError && <div id="tf-help" className={style.base_helper}>{logic.helperText}</div>}
      {hasError && <div id="tf-error" className={style.base_error}>{logic.errorText}</div>}
    </div>
  );
};

export default TextField;

// ------------------- Example usages -------------------
export const TextFieldExamples: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const geometric = { width: "w-full", rounded: "rounded-md" };

  const style: TextFieldStyle = {
    ...DEFAULT_STYLE,
    // override or extend defaults here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-medium mb-4">TextField — Examples</h3>

      <TextField
        geometric={geometric}
        logic={{ label: "ایمیل", type: "email", value: email, onChange: setEmail, placeholder: "example@email.com", iconLeft: <span className="text-gray-500">@</span>, helperText: "ایمیل کاری" }}
        style={style}
      />

      <TextField
        geometric={geometric}
        logic={{ label: "رمز عبور", type: "password", value: password, onChange: setPassword, placeholder: "رمز را وارد کنید" }}
        style={style}
      />

      <TextField
        geometric={geometric}
        logic={{ label: "بیو/توضیحات", type: "textarea", value: bio, onChange: setBio, placeholder: "چند خط درباره خودتان بنویسید" }}
        style={style}
      />
    </div>
  );
};
