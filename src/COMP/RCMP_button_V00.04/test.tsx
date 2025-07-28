import React from "react";
import { Link, LinkProps } from "react-router-dom";


const config = {
    geo: {
        size: {
            xs: "px-2 py-1 text-xs",
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-5 py-2.5 text-lg",
            full: "w-full",
        },
    },
    style: {
        variant: {
            filled: "text-white bg-blue-600 hover:bg-blue-700",
            outlined: "text-gray-500 dark:text-gray-300 border border-gray-500 dark:border-gray-300 bg-transparent hover:bg-blue-50",
            text: "text-blue-600 bg-transparent hover:underline",
        },
        color: {
            primary: "text-blue-600",
            danger: "text-red-600",
            success: "text-green-600",
            info: "text-cyan-600",
        },
        borderRadius: {
            xs: "rounded-sm",
            sm: "rounded",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
        },
    },
};

type Size = keyof typeof config.geo.size;
type Variant = keyof typeof config.style.variant;
type Color = keyof typeof config.style.color;
type BorderRadius = keyof typeof config.style.borderRadius;

type AsType = "button" | "link" | "a";

interface BaseProps {
    as?: AsType;
    size?: Size;
    variant?: Variant;
    color?: Color;
    borderRadius?: BorderRadius;
    className?: string;
    children: React.ReactNode;
}

type ButtonProps = BaseProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as?: "button";
    };

type LinkButtonProps = BaseProps &
    LinkProps & {
        as: "link";
        to: string;
    };

type AnchorButtonProps = BaseProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        as: "a";
        href: string;
    };

type BioButtonProps = ButtonProps | LinkButtonProps | AnchorButtonProps;

function BioButton(props: BioButtonProps) {
    const {
        as = "button",
        size = "md",
        variant = "filled",
        color = "primary",
        borderRadius = "md",
        className = "",
        children,
        ...rest
    } = props;

    const finalClassName = [
        "inline-flex items-center justify-center font-medium transition-colors duration-200",
        config.geo.size[size],
        config.style.variant[variant],
        config.style.borderRadius[borderRadius],
        config.style.color[color],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (as === "link") {
        const { to, ...linkProps } = rest as LinkButtonProps;
        return (
            <Link to={to} className={finalClassName} {...linkProps}>
                {children}
            </Link>
        );
    }

    if (as === "a") {
        const { href, ...anchorProps } = rest as AnchorButtonProps;
        return (
            <a href={href} className={finalClassName} {...anchorProps}>
                {children}
            </a>
        );
    }

    const buttonProps = rest as ButtonProps;
    return (
        <button className={finalClassName} {...buttonProps}>
            {children}
        </button>
    );
}

export default BioButton;