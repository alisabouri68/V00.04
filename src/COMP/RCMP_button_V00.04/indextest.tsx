//@ts-nocheck
/******************************************
 * Component:      Button
 * Last Update:    2025.09.20
 * By:             apps.68 
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
import Text from "../RCMP_biotext_V0004";
import Icon from "../RCMP_bioicon_V00.04";

/**************************************
 * Step 05: Define property interface
 **************************************/
type ButtonVariant = "filled" | "outlined" | "text";

type ButtonSize = "mini" | "small" | "default" | "large" | "xlarge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    geo?: {
        size?: ButtonSize;
        fullWidth?: boolean;
    };
    logic?: {
        leftIcon?: ReactNode;
        rightIcon?: ReactNode;
        buttonTitle?: ReactNode | string;
        variant?: ButtonVariant;
        isLoading?: boolean;
        loadingText?: string;
        to?: string;
        disabled?: boolean;

    };
    style?: object;
    meta?: object;
    children?: ReactNode;
}

/**************************************
 * Step 07: Component definition
 **************************************/
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    /******************************************
     * Step 07-1: Static assignments
     ******************************************/
    const {
        geo = {},
        logic = {},
        style = {},
        meta = {},
        children,
        className = "",
        ...rest
    } = props;

    const {
        size = "default",
        fullWidth = false,
    } = geo;

    const {
        leftIcon,
        rightIcon,
        buttonTitle,
        variant = "filled",
        isLoading = false,
        loadingText,
        to,
        disabled = false,
    } = logic;

    const isLink = typeof to === "string";

    const variantStyles = {
        filled: `
            bg-gradient-to-r from-primary to-primary/80 
            text-white font-semibold 
            shadow-md hover:shadow-lg 
            rounded-xl
        `,
        outlined: `
            bg-transparent 
            border border-primary text-primary 
            hover:bg-primary/10 
            rounded-xl
            transition-colors
        `,
        text: `
            bg-transparent 
            text-primary 
            hover:underline 
            rounded-lg
        `,
    };

    const sizeStyles = {
        mini: "px-2 py-1 text-xs rounded-md",
        small: "px-3 py-1.5 text-sm rounded-lg",
        default: "px-4 py-2 text-base rounded-xl",
        large: "px-5 py-2.5 text-lg rounded-2xl",
        xlarge: "px-6 py-3 text-xl rounded-2xl",
    };

    const defaultSpinner = <PuffLoader size={15} color="#58a6b7" />;

    const interactiveClasses =
        !isLoading && variant !== "text"
            ? "transition-all duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97]"
            : "";

    const finalClassName = [
        "flex items-center justify-center gap-3 font-medium relative",
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
            <>
                {isLoading && (
                    <span className="absolute left-1/2 -translate-x-1/2">
                        {defaultSpinner}
                    </span>
                )}

                {leftIcon && (
                    <Icon size="base" className={isLoading ? "opacity-0" : ""}>
                        {logic?.leftIcon&&}
                    </Icon>
                )}

                {(buttonTitle || children) && (
                    <Text size="sm" className={isLoading ? "opacity-0" : ""}>
                        {isLoading
                            ? loadingText || buttonTitle || children
                            : buttonTitle || children}
                    </Text>
                )}

                {rightIcon && (
                    <Icon size="base" className={isLoading ? "opacity-0" : ""}>
                        {rightIcon}
                    </Icon>
                )}
            </>
        );
    };

    /******************************************
     * Step 07-3: Component rendering
     ******************************************/
    return isLink ? (
        <Link
            to={to}
            className={finalClassName}
            {...rest}
        >
            {renderContent()}
        </Link>
    ) : (
        <button
            ref={ref}
            className={finalClassName}
            disabled={disabled || isLoading}
            {...rest}
        >
            {renderContent()}
        </button>
    );
});

Button.displayName = "Button";
export default Button;