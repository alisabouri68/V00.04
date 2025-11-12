// WIDG/RWDG_test2/index.tsx
import React from "react";
import { twMerge } from "tailwind-merge";

export interface Widget2Props {
    componentId?: string;
    widgetIndex?: number;
    meta?: any;
    geo?: any;
    logic?: any;
    style?: any;
}

const Widget2: React.FC<Widget2Props> = ({
    componentId = "unknown",
    widgetIndex = 0,
    meta = {},
    geo = {},
    logic = {},
    style = {}
}) => {
    // merge با مقادیر پیش‌فرض - دقیقاً مثل ویجت اول
    const finalProps = {
        meta: {
            customTitle: "Statistics Widget",
            customValue: 42,
            showValue: true,
            ...meta
        },
        geo: {
            width: "w-48",
            height: "h-32",
            ...geo
        },
        logic: {
            showTitle: true,
            onClick: () => console.log("Widget 2 clicked"),
            onValueIncrement: null, // لاجیک خاص ویجت دوم
            ...logic
        },
        style: {
            container: "p-4 flex flex-col justify-between",
            title: "text-lg font-semibold text-gray-800 dark:text-white",
            value: "text-2xl font-bold text-gray-800 dark:text-white",
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
        // ارسال event به Assistant - دقیقاً مثل ویجت اول
        window.dispatchEvent(new CustomEvent('widgetClick', {
            detail: {
                componentId: componentId,
                widgetIndex: widgetIndex,
                widgetType: 'widget_2',
                props: finalProps
            }
        }));

        if (finalProps.logic.onClick) {
            finalProps.logic.onClick();
        }
    };

    const handleValueClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // جلوگیری از trigger شدن کلیک والد
        
        // لاجیک خاص ویجت دوم - افزایش مقدار
        if (finalProps.logic.onValueIncrement) {
            finalProps.logic.onValueIncrement();
        } else {
            // رفتار پیش‌فرض اگر تابع custom تعریف نشده
            finalProps.meta.customValue += 1;
            
            // dispatch event برای تغییر مقدار
            window.dispatchEvent(new CustomEvent('widgetValueChange', {
                detail: {
                    componentId: componentId,
                    widgetIndex: widgetIndex,
                    widgetType: 'widget_2',
                    newValue: finalProps.meta.customValue,
                    props: finalProps
                }
            }));
        }
    };

    return (
        <div className={containerClasses} onClick={handleClick}>
            {/* عنوان - مثل ویجت اول */}
            {finalProps.logic.showTitle && (
                <h3 className={finalProps.style.title}>
                    {finalProps.meta.customTitle}
                </h3>
            )}
            
            {/* بخش اصلی ویجت دوم - نمایش مقدار و قابلیت کلیک */}
            <div className="flex-1 flex items-center justify-center">
                {finalProps.meta.showValue && (
                    <div 
                        className={finalProps.style.value}
                        onClick={handleValueClick}
                    >
                        {finalProps.meta.customValue}
                    </div>
                )}
            </div>
            
            {/* footer - مثل ویجت اول */}
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex justify-between items-center">
                <span>Statistics</span>
                <span>Index: #{widgetIndex + 1}</span>
            </div>
        </div>
    );
};

export default Widget2;