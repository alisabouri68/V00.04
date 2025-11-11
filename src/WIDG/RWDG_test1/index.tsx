// WIDG/RWDG_test1/index.tsx
import React from "react";
import { twMerge } from "tailwind-merge";

export interface Widget1Props {
  widgetIndex?: number;
  geo?: {
    width?: string;
    height?: string;
  };
  style?: {
    container?: string;
    title?: string;
    description?: string;
    background?: string;
    border?: string;
  };
  logic?: {
    onClick?: () => void;
    showTitle?: boolean;
  };
  meta?: {
    customTitle?: string;
    customDescription?: string;
  };
}

const Widget1: React.FC<Widget1Props> = ({
  widgetIndex = 0,
  geo = { width: "w-48", height: "h-32" },
  style = {
    container: "p-4",
    title: "text-lg font-semibold text-gray-800 dark:text-white",
    description: "text-sm text-gray-600 dark:text-gray-400 mt-2",
    background: "bg-white dark:bg-gray-800",
    border: "border border-gray-200 dark:border-gray-700 rounded-lg"
  },
  logic = { showTitle: true },
  meta = {}
}) => {
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
        componentId: 'current_component', // این رو بعداً از parent می‌گیریم
        widgetIndex: widgetIndex,
        widgetType: 'widget_1',
        props: {
          meta: {
            customTitle: meta.customTitle,
            customDescription: meta.customDescription,
            defaultTitle: "Widget 1",
            defaultDescription: "Simple text widget"
          },
          geo: geo,
          logic: logic,
          style: style
        }
      }
    }));

    if (logic.onClick) {
      logic.onClick();
    }
  };

  return (
    <div className={containerClasses} onClick={handleClick}>
      {logic.showTitle && (
        <h3 className={style.title}>
          {meta.customTitle || "Widget 1"}
        </h3>
      )}
      <p className={style.description}>
        {meta.customDescription || "Simple text widget"}
      </p>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        Index: #{widgetIndex + 1}
      </div>
    </div>
  );
};

export default Widget1;