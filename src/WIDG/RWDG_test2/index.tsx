// WIDG/RWDG_test2/index.tsx
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface Widget2Props {
  widgetIndex?: number;
  geo?: {
    width?: string;
    height?: string;
  };
  style?: {
    container?: string;
    value?: string;
    label?: string;
    background?: string;
    border?: string;
  };
  logic?: {
    onValueClick?: () => void;
  };
  meta?: {
    initialValue?: number;
    customLabel?: string;
  };
}

const Widget2: React.FC<Widget2Props> = ({
  widgetIndex = 0,
  geo = { width: "w-48", height: "h-32" },
  style = {
    container: "p-4 flex flex-col justify-between",
    value: "text-2xl font-bold text-gray-800 dark:text-white",
    label: "text-sm text-gray-600 dark:text-gray-400",
    background: "bg-white dark:bg-gray-800",
    border: "border border-gray-200 dark:border-gray-700 rounded-lg"
  },
  logic = {},
  meta = {
    initialValue: 42,
    customLabel: "Statistics"
  }
}) => {
  const [value, setValue] = useState(meta.initialValue || 42);

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
        widgetType: 'widget_2',
        props: {
          meta: {
            initialValue: meta.initialValue,
            customLabel: meta.customLabel,
            currentValue: value
          },
          geo: geo,
          logic: logic,
          style: style
        }
      }
    }));
  };

  const handleValueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (logic.onValueClick) {
      logic.onValueClick();
    } else {
      setValue(prev => prev + 1);
    }
  };

  return (
    <div className={containerClasses} onClick={handleClick}>
      <div className="flex items-center justify-between">
        <span 
          className={style.value}
          onClick={handleValueClick}
        >
          {value}
        </span>
        <span className="text-xs text-gray-500">↗</span>
      </div>
      <div className="flex justify-between items-end">
        <span className={style.label}>{meta.customLabel}</span>
        <span className="text-xs text-gray-400">#{widgetIndex + 1}</span>
      </div>
    </div>
  );
};

export default Widget2;