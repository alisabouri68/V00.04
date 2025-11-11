// WIDG/RWDG_test3/index.tsx
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface Widget3Props {
  widgetIndex?: number;
  geo?: {
    width?: string;
    height?: string;
  };
  style?: {
    container?: string;
    status?: string;
    message?: string;
    online?: string;
    offline?: string;
    background?: string;
    border?: string;
  };
  logic?: {
    onStatusClick?: () => void;
  };
  meta?: {
    initialStatus?: "online" | "offline";
    customMessage?: string;
  };
}

const Widget3: React.FC<Widget3Props> = ({
  widgetIndex = 0,
  geo = { width: "w-48", height: "h-32" },
  style = {
    container: "p-4",
    status: "text-sm font-medium",
    message: "text-sm text-gray-700 dark:text-gray-300 mt-2",
    online: "text-green-600 dark:text-green-400",
    offline: "text-red-600 dark:text-red-400",
    background: "bg-white dark:bg-gray-800",
    border: "border border-gray-200 dark:border-gray-700 rounded-lg"
  },
  logic = {},
  meta = {
    initialStatus: "online",
    customMessage: "System is running normally"
  }
}) => {
  const [status, _] = useState<"online" | "offline">(meta.initialStatus || "online");

  const containerClasses = twMerge(
    geo.width,
    geo.height,
    style.background,
    style.border,
    style.container,
    "shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
  );

  const handleClick = () => {
    // ارسال event به Assistant
    window.dispatchEvent(new CustomEvent('widgetClick', {
      detail: {
        componentId: 'current_component',
        widgetIndex: widgetIndex,
        widgetType: 'widget_3',
        props: {
          meta: {
            initialStatus: meta.initialStatus,
            customMessage: meta.customMessage,
            currentStatus: status
          },
          geo: geo,
          logic: logic,
          style: style
        }
      }
    }));
  };

  const statusClass = status === "online" ? style.online : style.offline;

  return (
    <div className={containerClasses} onClick={handleClick}>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${status === "online" ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={twMerge(style.status, statusClass)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className={style.message}>
        {meta.customMessage || (status === "online" ? "All systems operational" : "System is offline")}
      </p>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        Index: #{widgetIndex + 1}
      </div>
    </div>
  );
};

export default Widget3;