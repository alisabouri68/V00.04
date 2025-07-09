import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "ghost"
    | "link";

type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    buttunTitle?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    loadingSpinner?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            leftIcon,
            rightIcon,
            title,
            variant = "ghost",
            size = "md",
            fullWidth = false,
            isLoading = false,
            loadingText,
            loadingSpinner,
            className,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        // Variant styles
        const variantStyles = {
            primary: "text-primary",              //hover:bg-blue-700
            secondary: "bg-gray-200  text-gray-800",              //hover:bg-gray-300
            danger: "bg-red-600  text-white",              //hover:bg-red-700
            success: "bg-green-600  text-white",              //hover:bg-green-700
            warning: "bg-yellow-500  text-white",              //hover:bg-yellow-600
            ghost: "bg-transparent  custom-card",              //hover:bg-gray-100
            link: "bg-transparent  text-blue-600 p-0",              //hover:underline
        };

        // Size styles
        const sizeStyles = {
            xs: "",
            sm: "py-1 px-2 text-sm",
            md: "py-2 px-3 text-base",
            lg: "py-3 px-4 text-lg",
        };

        // Loading spinner (default)
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

        return (
            <button
                ref={ref}
                className={twMerge(
                    "flex items-center justify-center gap-3 rounded-md font-medium text-sm transition-colors",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth && "w-full",
                    className
                )}
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
                            <span className={`flex items-center text-2xl`} >{leftIcon}</span>
                        )}
                        {title || children}
                        {rightIcon && (
                            <span className={`${title || children ? "ml-2" : ""} flex items-center text-2xl`}>{rightIcon}</span>
                        )}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;