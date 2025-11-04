import {
    Avatar as FlowbiteAvatar,
    AvatarProps,
    useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// Define a custom interface to extend Flowbite's AvatarProps
export interface Props extends Omit<AvatarProps, "style"> {
    geometric?: {
        width?: string;
        height?: string;
        rounding?: string;
    };
    logic: {
        // Custom badge/content that appears on the avatar
        badge?: React.ReactNode;
        // Badge position
        badgePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        // Loading state
        isLoading?: boolean;
        // Fallback content when image fails to load
        fallback?: React.ReactNode;
    };
    style?: {
        // Root Styles
        root_base?: string;
        root_bordered?: string;
        root_rounded?: string;
        root_ringColor?: string;

        // Size Variants
        size_xs?: string;
        size_sm?: string;
        size_md?: string;
        size_lg?: string;
        size_xl?: string;

        // Status Indicator Styles
        status_online?: string;
        status_offline?: string;
        status_busy?: string;
        status_away?: string;
        status_position_topRight?: string;
        status_position_topLeft?: string;
        status_position_bottomRight?: string;
        status_position_bottomLeft?: string;

        // Placeholder Styles
        placeholder_base?: string;
        placeholder_initials_fontSize?: string;
        placeholder_initials_fontWeight?: string;

        // Image Styles
        img_base?: string;
        img_rounded?: string;

        // Custom Badge Styles
        badge_base?: string;
        badge_rounded?: string;
        badge_size?: string;
        badge_position_topRight?: string;
        badge_position_topLeft?: string;
        badge_position_bottomRight?: string;
        badge_position_bottomLeft?: string;

        // Loading Skeleton
        loading_bgColor?: string;
        loading_animation?: string;
    };
}

/**
 * An enhanced Avatar component based on Flowbite's Avatar
 * with additional geometric, logic, and style customization
 */
const Avatar: React.FC<Props> = ({
    geometric = {
        width: "w-10",
        height: "h-10",
        rounding: "rounded-full"
    },
    logic = {},
    style = {
        // Root Styles
        root_base: "relative",
        root_bordered: "border-2 border-white",
        root_rounded: "rounded-full",
        root_ringColor: "ring-2 ring-gray-300",

        // Size Variants
        size_xs: "w-6 h-6",
        size_sm: "w-8 h-8",
        size_md: "w-10 h-10",
        size_lg: "w-20 h-20",
        size_xl: "w-36 h-36",

        // Status Indicator Styles
        status_online: "bg-green-400",
        status_offline: "bg-gray-400",
        status_busy: "bg-red-400",
        status_away: "bg-yellow-400",
        status_position_topRight: "top-0 right-0",
        status_position_topLeft: "top-0 left-0",
        status_position_bottomRight: "bottom-0 right-0",
        status_position_bottomLeft: "bottom-0 left-0",

        // Placeholder Styles
        placeholder_base: "absolute flex items-center justify-center bg-gray-100 text-gray-600",
        placeholder_initials_fontSize: "text-sm",
        placeholder_initials_fontWeight: "font-medium",

        // Image Styles
        img_base: "object-cover",
        img_rounded: "rounded-full",

        // Custom Badge Styles
        badge_base: "absolute flex items-center justify-center bg-blue-500 text-white",
        badge_rounded: "rounded-full",
        badge_size: "w-4 h-4",
        badge_position_topRight: "top-0 right-0 transform translate-x-1/2 -translate-y-1/2",
        badge_position_topLeft: "top-0 left-0 transform -translate-x-1/2 -translate-y-1/2",
        badge_position_bottomRight: "bottom-0 right-0 transform translate-x-1/2 translate-y-1/2",
        badge_position_bottomLeft: "bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2",

        // Loading Skeleton
        loading_bgColor: "bg-gray-200",
        loading_animation: "animate-pulse",
    },
    children,
    ...props
}) => {
    const { theme } = useThemeProvider();
    const defaultTheme = theme?.avatar;

    // Theme mapping for Avatar component
    const themeMap: { [key in keyof typeof style]?: string[] } = {
        // Root Styles
        root_base: ["root", "base"],
        root_bordered: ["root", "bordered"],
        root_rounded: ["root", "rounded"],
        root_ringColor: ["root", "ring"],

        // Size Variants
        size_xs: ["root", "size", "xs"],
        size_sm: ["root", "size", "sm"],
        size_md: ["root", "size", "md"],
        size_lg: ["root", "size", "lg"],
        size_xl: ["root", "size", "xl"],

        // Status Indicator Styles
        status_online: ["status", "online"],
        status_offline: ["status", "offline"],
        status_busy: ["status", "busy"],
        status_away: ["status", "away"],
        status_position_topRight: ["status", "position", "top-right"],
        status_position_topLeft: ["status", "position", "top-left"],
        status_position_bottomRight: ["status", "position", "bottom-right"],
        status_position_bottomLeft: ["status", "position", "bottom-left"],

        // Placeholder Styles
        placeholder_base: ["placeholder", "base"],
        placeholder_initials_fontSize: ["placeholder", "initials", "fontSize"],
        placeholder_initials_fontWeight: ["placeholder", "initials", "fontWeight"],

        // Image Styles
        img_base: ["img", "base"],
        img_rounded: ["img", "rounded"],
    };

    /**
     * Helper function to merge a value into a nested property of an object
     */
    function mergeNestedProperty(targetObj: any, path: string[], value: string) {
        let current = targetObj;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]] = current[path[i]] || {};
        }
        const lastKey = path[path.length - 1];
        current[lastKey] = twMerge(current[lastKey], value);
    }

    // Merge themes
    const mergedTheme = useMemo(() => {
        const appearance = style || {};
        const newTheme = JSON.parse(JSON.stringify(defaultTheme || {}));

        for (const key in appearance) {
            if (Object.prototype.hasOwnProperty.call(themeMap, key)) {
                const path = themeMap[key as keyof typeof style];
                const value = appearance[key as keyof typeof style];

                if (path && value) {
                    mergeNestedProperty(newTheme, path, value);
                }
            }
        }

        return newTheme;
    }, [defaultTheme, style]);

    // Container classes
    const containerClasses = twMerge(
        geometric.width,
        geometric.height,
        geometric.rounding
    );

    // Badge position classes
    const getBadgePositionClass = () => {
        const position = logic.badgePosition || "top-right";
        switch (position) {
            case "top-right":
                return style.badge_position_topRight;
            case "top-left":
                return style.badge_position_topLeft;
            case "bottom-right":
                return style.badge_position_bottomRight;
            case "bottom-left":
                return style.badge_position_bottomLeft;
            default:
                return style.badge_position_topRight;
        }
    };

    // Loading state
    if (logic.isLoading) {
        return (
            <div
                className={twMerge(
                    containerClasses,
                    style.loading_bgColor,
                    style.loading_animation
                )}
            />
        );
    }

    return (
        <div className={twMerge("relative inline-block", containerClasses)}>
            <FlowbiteAvatar
                className={containerClasses}
                {...props}
                theme={mergedTheme as any}
            >
                {children}
            </FlowbiteAvatar>

            {/* Custom badge */}
            {logic.badge && (
                <div
                    className={twMerge(
                        style.badge_base,
                        style.badge_rounded,
                        style.badge_size,
                        getBadgePositionClass()
                    )}
                >
                    {logic.badge}
                </div>
            )}

            {/* Fallback content */}
            {logic.fallback && !props.img && !children && (
                <div className={twMerge(style.placeholder_base, containerClasses)}>
                    {logic.fallback}
                </div>
            )}
        </div>
    );
};

export default Avatar;