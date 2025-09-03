//@ts-nocheck
/******************************************
 * Component:      Button
 * Last Update:    2025.08.31
 * By:             apps.68 + ChatGPT
 *
 * Description:
 *   A multi-variant React button component supporting:
 *     - Different visual variants (filled, outlined, text, etc.)
 *     - Multiple sizes
 *     - Optional icons on left/right
 *     - Loading states with spinner (keeps button width)
 *     - Full-width option
 *     - Link integration with React Router
 ******************************************/

/*------------------------------------------------------------
 * Meta Data
 * ID:             RCMP_button 
 * Title:          Component Button - React Version
 * Version:        V00.05
 * VAR:            01
 * last-update:    D2025.08.31
 * owner:          apps.68
 * Description:    React-based button component with variant, size,
 *                 icon, loading, and link support.
 ------------------------------------------------------------*/

/**************************************
 * Step 01: Import core dependencies
 **************************************/
import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";

/**************************************
 * Step 02: Import widget dependencies
 **************************************/
import Text from "../../WIDG/RWID_TEXT_V0004";
import Icon from "../../WIDG/RWID_icon_V0004";

/**************************************
 * Step 05: Define property interface
 **************************************/
type ButtonVariant = "filled" | "outlined" | "text";

type ButtonSize = "mini" | "small" | "default" | "large" | "xlarge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode; // Optional icon before text
  rightIcon?: ReactNode; // Optional icon after text
  buttunTitle?: ReactNode | string; // Main button label (note: typo in "button")
  variant?: ButtonVariant; // Visual style of the button
  size?: ButtonSize; // Size preset
  fullWidth?: boolean; // Expands button to container width
  isLoading?: boolean; // Displays loading spinner and disables interaction
  loadingText?: string; // Text to display while loading
  to?: string; // If provided, renders as <Link>
}

/**************************************
 * Step 07: Component definition
 **************************************/
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      buttunTitle,
      variant = "outlined",
      size = "default",
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
     ******************************************/
    const isLink = typeof to === "string";

    const variantStyles = {
      filled: "bg-primary text-light rounded-small shadow-mini shadow-primary",
      outlined:
        "bg-transparent text-dark rounded-small border border-primary shadow-mini shadow-primary",
      text: "bg-transparent text-dark border-none",
    };

    const sizeStyles = {
      mini: "py-mini px-mini text-h1",
      small: "py-small px-small text-h1",
      default: "py-small px-default text-h1",
      large: "py-small px-large text-h1",
      xlarge: "py-small px-xlarge text-h1",
    };

    const defaultSpinner = <PuffLoader size={15} color="#58a6b7"/>;
    const interactiveClasses = !isLoading && variant !== "text"
      ? "transition-all duration-200 ease-in-out hover:scale-[1.01] active:scale-[0.10]"
      : "";

    const finalClassName = [
      "flex items-center justify-center gap-3 rounded-small font-medium text-sm relative",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? "w-full" : "",
      interactiveClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    /******************************************
     * Step 07-2: Content rendering logic
     ******************************************/
    const renderContent = () => {
      return (
        <div className="flex items-center justify-center gap-2 w-full relative">
          {isLoading && (
            <span className="absolute left-1/2 -translate-x-1/2">
              {defaultSpinner}
            </span>
          )}

          {leftIcon && (
            <Icon size="base" className={isLoading ? "opacity-0" : ""}>
              {leftIcon}
            </Icon>
          )}

          {(buttunTitle || children) && (
            <Text size="sm" className={isLoading ? "opacity-0" : ""}>
              {isLoading
                ? loadingText || buttunTitle || children
                : buttunTitle || children}
            </Text>
          )}

          {rightIcon && (
            <Icon size="base" className={isLoading ? "opacity-0" : ""}>
              {rightIcon}
            </Icon>
          )}
        </div>
      );
    };

    /******************************************
     * Step 07-3: Component rendering
     ******************************************/
    return isLink ? (
      <Link to={to} className={finalClassName} {...(props as any)}>
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
