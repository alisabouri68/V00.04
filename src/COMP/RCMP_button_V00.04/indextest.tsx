//@ts-nocheck
/******************************************
 * Component:      Button
 * Last Update:    2025.09.20
 * By:             apps.68 
 ******************************************/

import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Text from "../RCMP_biotext_V0004";
import Icon from "../RCMP_bioicon_V00.04";

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
    methode?: object;
    event?: {
        isLoading?: boolean;
        loadingText?: string;
        disabled?: boolean;
    };
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        geo = {},
        logic = {},
        style = {},
        meta = {},
        methode = {},
        event = {},
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
        to,
        isLoading: logicIsLoading = false,
        disabled: logicDisabled = false,
    } = logic;

    const {
        isLoading: eventIsLoading = false,
        loadingText,
        disabled: eventDisabled = false,
    } = event;

    const isLoading = logicIsLoading || eventIsLoading;
    const disabled = logicDisabled || eventDisabled || rest.disabled;

    const isLink = typeof to === "string";

    const variantStyles = {
        filled: `
            bg-gradient-to-br from-[#1D9EBD] to-[#1D9EBD]/70
            text-white font-medium
            rounded-xl
            transition-all duration-300 ease-out
            ${!disabled || !isLoading 
                ? "hover:from-[#1D9EBD]/80 hover:to-[#1D9EBD] shadow-sm hover:shadow-md border border-[#1D9EBD]/80" 
                : "border border-[#1D9EBD]/50"
            }
        `,
        outlined: `
            bg-light dark:bg-gray-800
            border border-[#1D9EBD]/40 dark:border-[#1D9EBD]/50
            text-[#1D9EBD] dark:text-[#1D9EBD]/80
            rounded-xl
            transition-all duration-300 ease-out
            ${!disabled || !isLoading 
                ? "hover:bg-[#1D9EBD]/10 dark:hover:bg-[#1D9EBD]/20 hover:border-[#1D9EBD]/60 dark:hover:border-[#1D9EBD]/70 shadow-sm hover:shadow-md" 
                : ""
            }
        `,
        text: `
            bg-transparent
            text-[#1D9EBD] dark:text-[#1D9EBD]/70
            rounded-lg
            transition-all duration-300 ease-out
            ${!disabled && !isLoading 
                ? "hover:bg-[#1D9EBD]/10 dark:hover:bg-[#1D9EBD]/20 hover:text-[#1D9EBD]/90 dark:hover:text-[#1D9EBD]" 
                : ""
            }
        `,
    };

    const sizeStyles = {
        mini: "px-3 py-1.5 text-xs rounded-lg gap-2",
        small: "px-4 py-2 text-sm rounded-xl gap-2",
        default: "px-6 py-3 text-base rounded-xl gap-3",
        large: "px-8 py-4 text-lg rounded-2xl gap-3",
        xlarge: "px-10 py-5 text-xl rounded-2xl gap-4",
    };

    const spinnerColors = {
        filled: "#ffffff",
        outlined: "#1D9EBD",
        text: "#1D9EBD",
    };

    const defaultSpinner = <PuffLoader size={24} color={spinnerColors[variant]} />;

    const finalClassName = [
        "flex items-center justify-center font-medium relative",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-[#1D9EBD]/30",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "w-auto",
        !isLoading && !disabled ? "hover:scale-[1.02] active:scale-[0.98]" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, ' ') 
        .trim();

    const renderContent = () => {
        const showContent = !isLoading;
        const showLoading = isLoading;

        return (
            <>
                {showLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-2">
                            {defaultSpinner}
                            {loadingText && (
                                <Text size="sm" className="text-current">
                                    {loadingText}
                                </Text>
                            )}
                        </div>
                    </div>
                )}

                <div className={`flex items-center justify-center gap-3 transition-opacity duration-200 ${
                    showLoading ? "opacity-0" : "opacity-100"
                }`}>
                    {leftIcon && (
                        <Icon size="base" className="shrink-0">
                            {leftIcon}
                        </Icon>
                    )}

                    {buttonTitle && (
                        <Text 
                            size="sm" 
                            className="whitespace-nowrap font-medium"
                        >
                            {buttonTitle}
                        </Text>
                    )}

                    {rightIcon && (
                        <Icon size="base" className="shrink-0">
                            {rightIcon}
                        </Icon>
                    )}
                </div>
            </>
        );
    };

    if (isLink && !disabled) {
        return (
            <Link
                to={to}
                className={finalClassName}
                {...rest}
            >
                {renderContent()}
            </Link>
        );
    }

    return (
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