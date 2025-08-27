//@ts-nocheck
/******************************************
 * Component:      Button
 * Last Update:    2025.08.09
 * By:             apps.68
 *
 * Description:
 *   A multi-variant React button component supporting:
 *     - Different visual variants (filled, outlined, text, etc.)
 *     - Multiple sizes
 *     - Optional icons on left/right
 *     - Loading states with spinner
 *     - Full-width option
 *     - Link integration with React Router
 ******************************************/

/*------------------------------------------------------------
 * Meta Data
 * ID:             RCMP_button 
 * Title:          Component Button - React Version
 * Version:        V00.04
 * VAR:            01
 * last-update:    D2025.08.09
 * owner:          apps.68
 * Description:    React-based button component with variant, size,
 *                 icon, loading, and link support.
 ------------------------------------------------------------*/

/**************************************
 * Step 01: Import core dependencies
 *   - ReactNode: Type for valid React children
 *   - ButtonHTMLAttributes: Native button attribute support
 *   - forwardRef: Forwarding refs for DOM access
 *   - Link: React Router link component for navigation
 **************************************/
import {
  ReactNode,
  ButtonHTMLAttributes,
  forwardRef,
} from "react";
import { Link } from "react-router-dom";

/**************************************
 * Step 02: Import widget dependencies
 *   - Text: Unified typography component
 *   - Icon: Icon rendering component
 **************************************/
import Text from "../../../../WIDG/RWID_text_V00.04";
import Icon from "../../WIDG/RWID_icon_V00.04/index";

/**************************************
 * Step 03: Co-actor dependencies
 *   - None for this component
 **************************************/

/**************************************
 * Step 05: Define property interface
 *
 * ButtonVariant:
 *   - Defines the visual style of the button.
 *
 * ButtonSize:
 *   - Defines the padding and font size of the button.
 *
 * ButtonProps:
 *   - Extends native HTML button attributes
 *   - Adds custom props for variant, size, icons, loading state, etc.
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
  leftIcon?: ReactNode;         // Optional icon before text
  rightIcon?: ReactNode;        // Optional icon after text
  buttunTitle?: ReactNode | string; // Main button label (note: typo in "button")
  variant?: ButtonVariant;      // Visual style of the button
  size?: ButtonSize;            // Size preset
  fullWidth?: boolean;          // Expands button to container width
  isLoading?: boolean;          // Displays loading spinner and disables interaction
  loadingText?: string;         // Text to display while loading
  loadingSpinner?: ReactNode;   // Custom loading spinner
  to?: string;                  // If provided, renders as <Link>
}

/**************************************
 * Step 06: Calculation / Logic helpers
 *   - None in this component
 **************************************/

/**************************************
 * Step 07: Component definition
 *   - forwardRef used to expose DOM element ref
 *   - Dynamically renders either <button> or <Link>
 *   - Applies variant & size styles
 *   - Supports loading and icons
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
    /******************************************
     * Step 07-1: Static assignments
     *   - isLink: Determines rendering type
     *   - variantStyles: Predefined Tailwind style sets
     *   - sizeStyles: Predefined padding & font size sets
     ******************************************/
    const isLink = typeof to === "string";

    const variantStyles = {
      filled: "bg-primary text-white rounded-md",
      outlined: "bg-transparent text-dark rounded-md border border-stone-300 dark:border-stone-800",
      text: "bg-transparent text-dark-custom border-none",
      filledActive: "bg-primary text-dark rounded-md",
      outlinedActive: "bg-transparent text-primary rounded-md border border-primary hover:border-primary hover:text-primary",
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

    /******************************************
     * Step 07-2: Content rendering logic
     *   - Loading state: spinner + loading text
     *   - Default state: left icon + text + right icon
     ******************************************/
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
          {leftIcon && (<Icon size="base">{leftIcon}</Icon>)}
          {(buttunTitle || children) && <Text size="sm">{buttunTitle || children}</Text>}
          {rightIcon && (<Icon size="base">{rightIcon}</Icon>)}
        </>
      );
    };

    /******************************************
     * Step 07-3: Component rendering
     *   - If `to` is provided: render as <Link>
     *   - Else: render as <button>
     ******************************************/
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

Button.displayName = "Button";
export default Button;
