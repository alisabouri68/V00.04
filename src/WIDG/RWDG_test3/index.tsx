// WIDG/RWDG_test3/index.tsx
import React from "react";
import { twMerge } from "tailwind-merge";

export interface Widget3Props {
  componentId?: string;
  widgetIndex?: number;
  meta?: any;
  geo?: any;
  logic?: any;
  style?: any;
}

const Widget3: React.FC<Widget3Props> = ({
  componentId = "unknown",
  widgetIndex = 0,
  meta = {},
  geo = {},
  logic = {},
  style = {}
}) => {
  const finalProps = {
    meta: {
      customTitle: "Status Widget",
      status: "online", // online | offline
      statusMessage: "System is running normally",
      showStatus: true,
      ...meta
    },
    geo: {
      width: "w-48",
      height: "h-32",
      ...geo
    },
    logic: {
      showTitle: true,
      onClick: () => console.log("Widget 3 clicked"),
      onStatusToggle: null, // لاجیک خاص ویجت سوم
      ...logic
    },
    style: {
      container: "p-4",
      title: "text-lg font-semibold text-gray-800 dark:text-white",
      status: "text-sm font-medium",
      message: "text-sm text-gray-600 dark:text-gray-400 mt-2",
      online: "text-green-600 dark:text-green-400",
      offline: "text-red-600 dark:text-red-400",
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
    // ارسال event به Assistant - دقیقاً مثل ویجت اول و دوم
    window.dispatchEvent(new CustomEvent('widgetClick', {
      detail: {
        componentId: componentId,
        widgetIndex: widgetIndex,
        widgetType: 'widget_3',
        props: finalProps
      }
    }));

    if (finalProps.logic.onClick) {
      finalProps.logic.onClick();
    }
  };

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // جلوگیری از trigger شدن کلیک والد

    // لاجیک خاص ویجت سوم - toggle status
    if (finalProps.logic.onStatusToggle) {
      finalProps.logic.onStatusToggle();
    } else {
      // رفتار پیش‌فرض اگر تابع custom تعریف نشده
      const newStatus = finalProps.meta.status === "online" ? "offline" : "online";
      finalProps.meta.status = newStatus;

      // dispatch event برای تغییر status
      window.dispatchEvent(new CustomEvent('widgetStatusChange', {
        detail: {
          componentId: componentId,
          widgetIndex: widgetIndex,
          widgetType: 'widget_3',
          newStatus: newStatus,
          props: finalProps
        }
      }));
    }
  };

  const statusClass = finalProps.meta.status === "online"
    ? finalProps.style.online
    : finalProps.style.offline;

  const statusMessage = finalProps.meta.statusMessage ||
    (finalProps.meta.status === "online"
      ? "All systems operational"
      : "System is offline");

  return (
    <div className={containerClasses} onClick={handleClick}>
      {/* عنوان - مثل ویجت اول و دوم */}
      {finalProps.logic.showTitle && (
        <h3 className={finalProps.style.title}>
          {finalProps.meta.customTitle}
        </h3>
      )}

      {/* بخش اصلی ویجت سوم - نمایش status */}
      {finalProps.meta.showStatus && (
        <div className="flex items-center gap-2 mt-2">
          <div
            className={`w-3 h-3 rounded-full ${finalProps.meta.status === "online"
                ? 'bg-green-500'
                : 'bg-red-500'
              }`}
          />
          <span
            className={twMerge(finalProps.style.status, statusClass)}
            onClick={handleStatusClick}
          >
            {finalProps.meta.status.charAt(0).toUpperCase() + finalProps.meta.status.slice(1)}
          </span>
        </div>
      )}

      {/* پیام وضعیت */}
      <p className={finalProps.style.message}>
        {statusMessage}
      </p>

      {/* footer - مثل ویجت اول و دوم */}
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        Index: #{widgetIndex + 1}
      </div>
    </div>
  );
};

export default Widget3;