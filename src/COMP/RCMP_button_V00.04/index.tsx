/******************************************
 * Component:      Button
 * Last Update:    2025.07.14
 * By:             APPS.00
 * Description:    This is a flexible and reusable button component with
 *                 support for multiple variants, sizes, icons, loading state, and full-width layout.
 ******************************************/

/*------------------------------------------------------------
 * Meta Data
 *
 * ID:             RCOM_button
 * Title:          Component button - React Version
 * Version:        V00.04
 * VAR:            Filled Outlined Text
 * Last Update:    D2025.04.04
 * Owner:          APPS.00
 * Description:    A universal button component used across all pages and modules.
 *------------------------------------------------------------*/

/**************************************
 * Step 01 - Import Dependencies
 * ------------------------------------
 * - React core: forwardRef for ref forwarding.
 * - ReactNode: for supporting JSX in props like icons.
 * - ButtonHTMLAttributes: inherit native button props.
 **************************************/
import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import Text from "../RCMP_text_VAR.01_v00.04";
/**************************************
 * Step 02 - Define Component Properties (Props)
 * ------------------------------------
 * - ButtonVariant: defines available visual styles.
 * - ButtonSize: defines spacing and font size.
 * - ButtonProps: complete prop structure for the component.
 **************************************/
/**************************************
 * Step 05 - define property interface for this BioWidget
 **************************************/
type ButtonVariant =
  | "filled"
  | "outlined"
  | "text"
  | "filledActive"
  | "outlinedActive"
  | "textActive";

type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode; // Optional icon on the left
  rightIcon?: ReactNode; // Optional icon on the right
  buttunTitle?: ReactNode; // [Typo?] Not used in the code – can be removed or corrected
  variant?: ButtonVariant; // Visual style variant
  size?: ButtonSize; // Size variant
  fullWidth?: boolean; // Stretch to full container width
  isLoading?: boolean; // Loading state indicator
  loadingText?: string; // Custom text to show while loading
  loadingSpinner?: ReactNode; // Custom spinner component
}

/**************************************
 * Step 06 - Define Button Component
 * ------------------------------------
 * - Uses forwardRef to support refs passed to <button>
 * - Flexible props to support visual and functional variations
 **************************************/
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      title,
      variant = "outlined",
      size = "md",
      fullWidth = false,
      isLoading = false,
      loadingText,
      loadingSpinner,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    /**************************************
      Define Class Styles for Variants and Sizes
     **************************************/

    const variantStyles = {
      filled: "bg-primary text-white rounded rounded-md",
      outlined:
        "bg-transparent  text-gray-500 dark:text-gray-400 rounded-md border border-text-light-custom",
      text: "bg-transparent text-dark-custom border-none",
      filledActive: "bg-primary  text-gray-500 dark:text-gray-400 rounded rounded-md",
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

    /**************************************
      Default Spinner for Loading State
     **************************************/
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

    /**************************************
      Combine All Class Names into One String
     **************************************/
    const finalClassName = [
      "flex items-center justify-center gap-3 rounded-md font-medium text-sm transition-colors",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantStyles[variant], // Apply variant style
      sizeStyles[size], // Apply size style
      fullWidth ? "w-full" : "", // Stretch if fullWidth is true
      className, // Custom classes from props
    ]
      .filter(Boolean) // Remove falsy values
      .join(" "); // Join into a single class string

    /**************************************
     Render the Button JSX
     * ------------------------------------
     * - Shows spinner if loading
     * - Includes optional icons and children/title
     **************************************/
    return (
      <button
        ref={ref}
        className={finalClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            {loadingSpinner || defaultSpinner}
            {loadingText || "Processing..."}
          </>
        ) : (
          <>
            {leftIcon && (
              <Text size="2xl" >{leftIcon}</Text>
            )}
            {title || children && (<Text size="2xl">{title || children}</Text>)}
            {rightIcon && (
              <Text size="2xl"
                className={`${title || children ? "ms-2" : ""
                  } `}
              >
                {rightIcon}
              </Text>
            )}
          </>
        )}
      </button>
    );
  }
);

/**************************************
Set Display Name (for debugging/dev tools)
 **************************************/
Button.displayName = "Button";

/**************************************
Export Component
 **************************************/
export default Button;
