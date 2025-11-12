// WIDG/RWDG_test1/index.tsx
import React from "react";
import { twMerge } from "tailwind-merge";

export interface Widget1Props {
    componentId?: string;
    widgetIndex?: number;
    meta?: any;
    geo?: any;
    logic?: any;
    style?: any;
}

const Widget1: React.FC<Widget1Props> = ({
    componentId = "unknown",
    widgetIndex = 0,
    meta = {},
    geo = {},
    logic = {},
    style = {}
}) => {
    // merge با مقادیر پیش‌فرض
    const finalProps = {
        meta: {
            customTitle: "Widget 1",
            customDescription: "Simple text widget",
            ...meta
        },
        geo: {
            width: "w-48",
            height: "h-32",
            ...geo
        },
        logic: {
            showTitle: true,
            onClick: () => console.log("Widget clicked"),
            ...logic
        },
        style: {
            container: "p-4",
            title: "text-lg font-semibold text-gray-800 dark:text-white",
            description: "text-sm text-gray-600 dark:text-gray-400 mt-2",
            background: "bg-white dark:bg-gray-800",
            border: "border border-gray-200 dark:border-gray-700 rounded-lg",
            ...style
        }
    };

    const containerClasses = twMerge(
        finalProps.geo.width,
        finalProps.geo.height,
        finalProps.style.background,
        finalProps.style.border,
        finalProps.style.container,
        "shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
    );

    const handleClick = () => {
        // ارسال event به Assistant
        window.dispatchEvent(new CustomEvent('widgetClick', {
            detail: {
                componentId: componentId,
                widgetIndex: widgetIndex,
                widgetType: 'widget_1',
                props: finalProps
            }
        }));

        if (finalProps.logic.onClick) {
            finalProps.logic.onClick();
        }
    };

    return (
        <div className={containerClasses} onClick={handleClick}>
            {finalProps.logic.showTitle && (
                <h3 className={finalProps.style.title}>
                    {finalProps.meta.customTitle}
                </h3>
            )}
            <p className={finalProps.style.description}>
                {finalProps.meta.customDescription}
            </p>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Index: #{widgetIndex + 1}
            </div>
        </div>
    );
};

export default Widget1;