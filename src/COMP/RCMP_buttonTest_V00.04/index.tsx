//@ts-nocheck
/******************************************
 * Component:      Button
 * Last Update:    2025.08.30
 * By:             apps.68
 ******************************************/

import schmRaw from ".schm.json?raw";
import {
  ReactNode,
  ButtonHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "RDUX/dynamanContext";
import Text from "../../WIDG/RWID_TEXT_V0004";
import Icon from "../../WIDG/RWID_icon_V0004";

type ButtonVariant = "filled" | "outlined" | "text";

type ButtonSize = "mini" | "small" | "default" | "large" | "xlarge";
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
    const { globalState, updateGlobalState } = useGlobalState();
    const schmJsona: JsonFile = JSON.parse(schmRaw);
    const [finalStyle, setFinalStyle] = useState<any>({});
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (jsonAdd) {
        updateGlobalState({ filed6: schmJsona });
      }
      if (onClick) onClick(e);
    };
    useEffect(() => {
      const logic = globalState?.filed6?.sections?.LOGIC;
      if (!logic) return;

      const sizeStyles = logic.geo?.sizeStyles ?? {};
      const variantStyles = logic.style?.variantStyles ?? {};
      const generalStyle = logic.style?.generalStyle ?? "";
      const fullWidthClass = logic.geo?.fullWidth ?? "";

      const finalClass = [
        generalStyle,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? fullWidthClass : "",
        className,
      ]
        .filter(Boolean)
        .join(" ");

      setFinalStyle(finalClass);
    }, [globalState, variant, size, fullWidth, className]);

    const isLink = typeof to === "string";

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
        className={finalStyle}
        onClick={handleClick}
        {...(props as any)}
      >
        {renderContent()}
      </Link>
    ) : (
      <button
        ref={ref}
        className={finalStyle}
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
