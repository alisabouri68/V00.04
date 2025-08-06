/******************************************
 * Component:      Button
 * Last Update:    2025.07.28
 * By:             APPS.00 (Edited by ChatGPT)
 * Description:    دکمه چندحالته قابل استفاده برای دکمه‌های معمولی یا لینک مسیریابی (React Router)
 ******************************************/

import {
  ReactNode,
  ButtonHTMLAttributes,
  forwardRef,
} from "react";
import { Link } from "react-router-dom";
import Text from "../RCMP_text_VAR.01_v00.04";

/**************************************
 * تعریف نوع حالت‌های ظاهری و اندازه دکمه
 **************************************/
type ButtonVariant =
  | "filled"
  | "outlined"
  | "text"
  | "filledActive"
  | "outlinedActive"
  | "textActive";

type ButtonSize = "xs" | "sm" | "md" | "lg";

/**************************************
 * تعریف نوع ویژگی‌های ورودی (Props)
 **************************************/
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  buttunTitle?: ReactNode|string; 
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  loadingSpinner?: ReactNode;
  to?: string; 
}

/**************************************
 * تعریف کامپوننت Button
 **************************************/
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
      to,
      ...props
    },
    ref
  ) => {
    // اگر prop مربوط به مسیر (to) وجود داشته باشد، یعنی باید <Link> باشیم
    const isLink = typeof to === "string";

    // حالت‌های ظاهری دکمه
    const variantStyles = {
      filled: "bg-primary text-white rounded-md",
      outlined: "bg-transparent text-gray-500 dark:text-gray-400 rounded-md border border-gray-300 dark:border-gray-800",
      text: "bg-transparent text-dark-custom border-none",
      filledActive: "bg-primary text-gray-500 dark:text-gray-400 rounded-md",
      outlinedActive: "bg-transparent text-primary rounded-md border border-primary hover:border-primary hover:text-primary",
      textActive: "bg-transparent text-primary-active border-none",
    };

    // سایزبندی دکمه
    const sizeStyles = {
      xs: "py-0.5 px-1 text-xs",
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-3 text-base",
      lg: "py-3 px-4 text-lg",
    };

    // اسپینر پیش‌فرض در حالت Loading
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

    // کلاس نهایی دکمه با توجه به استایل‌ها
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

    // تابع محتوای داخلی دکمه
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
          {leftIcon && <Text size="2xl">{leftIcon}</Text>}
          {(buttunTitle || children) && <Text size="sm">{buttunTitle || children}</Text>}
          {rightIcon && (
            <Text size="2xl" className={`${buttunTitle || children ? "ms-2" : ""}`}>
              {rightIcon}
            </Text>
          )}
        </>
      );
    };

    // رندر نهایی دکمه یا لینک
    return isLink ? (
      <Link
        to={to}
        className={finalClassName}
        {...(props as any)} 
      >
        {renderContent()}
      </Link>
    ) : (
      <button
        ref={ref}
        className={finalClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

// نام قابل نمایش برای دیباگینگ
Button.displayName = "Button";

// خروجی نهایی کامپوننت
export default Button;
