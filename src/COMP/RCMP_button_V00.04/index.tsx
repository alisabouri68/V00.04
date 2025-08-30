//@ts-nocheck
/******************************************
 * Component:      Button
 * Last Update:    2025.08.30
 * By:             apps.68
 ******************************************/

import schmRaw from ".schm.json?raw";
import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "RDUX/dynamanContext";
import Text from "../../WIDG/RWID_TEXT_V0004/index";
import Icon from "../../WIDG/RWID_icon_V0004/index";

type ButtonVariant =
  | "filled"
  | "outlined"
  | "text"
  | "filledActive"
  | "outlinedActive"
  | "textActive";

type ButtonSize = "xs" | "sm" | "md" | "lg";

type JsonFile = {
  head: {
    id: string;
    title: string;
    type: string;
    ver: string;
    rem: string;
    create: string;
  };
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  buttunTitle?: ReactNode | string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  loadingSpinner?: ReactNode;
  to?: string;
  jsonAdd?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      buttunTitle,
      variant = "outlined",
      size = "xs",
      fullWidth = false,
      isLoading = false,
      loadingText,
      loadingSpinner,
      className = "",
      disabled,
      children,
      jsonAdd,
      to,
      onClick,
      ...props
    },
    ref
  ) => {
    const { updateGlobalState } = useGlobalState();

    const schmJson: JsonFile = JSON.parse(schmRaw);

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (jsonAdd) {
        updateGlobalState({ filed6: { head: schmJson.head } });
      }
      if (onClick) onClick(e);
    };

    const isLink = typeof to === "string";

    const variantStyles = {
      filled: "bg-primary text-white rounded-md",
      outlined:
        "bg-transparent text-dark rounded-md border border-stone-300 dark:border-stone-800",
      text: "bg-transparent text-dark-custom border-none",
      filledActive: "bg-primary text-dark rounded-md",
      outlinedActive:
        "bg-transparent text-primary rounded-md border border-primary hover:border-primary hover:text-primary",
      textActive: "bg-transparent text-primary-active border-none",
    };

    const sizeStyles = {
      xs: "py-0.5 px-1 text-xs",
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-3 text-base",
      lg: "py-3 px-4 text-lg",
    };

    const defaultSpinner = (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    const finalClassName = [
      "flex items-center justify-center gap-3 rounded-md font-medium text-sm transition-colors",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const renderContent = () => {
      if (isLoading) {
        return (
          <>
            {loadingSpinner || defaultSpinner}
            {loadingText || "Processing..."}
          </>
        );
      }
      return (
        <>
          {leftIcon && <Icon size="base">{leftIcon}</Icon>}
          {(buttunTitle || children) && (
            <Text size="sm">{buttunTitle || children}</Text>
          )}
          {rightIcon && <Icon size="base">{rightIcon}</Icon>}
        </>
      );
    };

    return isLink ? (
      <Link
        to={to}
        className={finalClassName}
        onClick={handleClick}
        {...(props as any)}
      >
        {renderContent()}
      </Link>
    ) : (
      <button
        ref={ref}
        className={finalClassName}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
