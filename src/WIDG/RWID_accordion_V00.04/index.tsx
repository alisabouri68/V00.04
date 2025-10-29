import {
  Accordion as FlowbiteAccordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
  AccordionProps,
  useThemeProvider,
} from "flowbite-react";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

// ---------------------------
// 🔹 تعریف Props سفارشی
// ---------------------------
export interface Props extends Omit<AccordionProps, "style"> {
  geometric?: {
    width?: string;
    height?: string;
    spacing?: string;
  };
  logic: {
    alwaysOpen?: boolean;
    defaultOpenPanels?: number[];
    collapseIcon?: React.ReactNode;
    expandIcon?: React.ReactNode;
    onPanelToggle?: (panelIndex: number, isOpen: boolean) => void;
  };
  style?: {
    // Root Styles
    root_base?: string;
    root_flush?: string;
    
    // Panel Styles
    panel_base?: string;
    panel_flush?: string;
    
    // Title Styles
    title_base?: string;
    title_flush?: string;
    title_hover?: string;
    title_focus?: string;
    title_focus_ring?: string;
    title_disabled?: string;
    title_arrow_base?: string;
    title_arrow_open?: string;
    
    // Content Styles
    content_base?: string;
    content_hidden?: string;
    content_visible?: string;
    
    // Color Variants
    colorDefault_titleBg?: string;
    colorDefault_titleText?: string;
    colorDefault_titleHoverBg?: string;
    colorDefault_contentBg?: string;
    colorDefault_contentText?: string;
    
    colorBlue_titleBg?: string;
    colorBlue_titleText?: string;
    colorBlue_titleHoverBg?: string;
    colorBlue_contentBg?: string;
    colorBlue_contentText?: string;
    
    colorGray_titleBg?: string;
    colorGray_titleText?: string;
    colorGray_titleHoverBg?: string;
    colorGray_contentBg?: string;
    colorGray_contentText?: string;
    
    colorGreen_titleBg?: string;
    colorGreen_titleText?: string;
    colorGreen_titleHoverBg?: string;
    colorGreen_contentBg?: string;
    colorGreen_contentText?: string;
    
    colorRed_titleBg?: string;
    colorRed_titleText?: string;
    colorRed_titleHoverBg?: string;
    colorRed_contentBg?: string;
    colorRed_contentText?: string;
    
    colorYellow_titleBg?: string;
    colorYellow_titleText?: string;
    colorYellow_titleHoverBg?: string;
    colorYellow_contentBg?: string;
    colorYellow_contentText?: string;
    
    colorPurple_titleBg?: string;
    colorPurple_titleText?: string;
    colorPurple_titleHoverBg?: string;
    colorPurple_contentBg?: string;
    colorPurple_contentText?: string;
  };
}

// ---------------------------
// 🔹 تابع کمکی برای کلون ایمن
// ---------------------------
const safeClone = (obj: any) => {
  return obj ? JSON.parse(JSON.stringify(obj)) : {};
};

// ---------------------------
// 🔹 کامپوننت اصلی Accordion
// ---------------------------
const AccordionComponent: React.FC<Props> = ({
  geometric = { width: "w-full", spacing: "space-y-2" },
  logic = { alwaysOpen: false, defaultOpenPanels: [] },
  style = {},
  children,
  ...props
}) => {
  const { theme } = useThemeProvider();
  const defaultTheme = theme?.accordion || {};

  // 🔸 تعریف نقشه‌ی مسیر برای هر property از style
  const themeMap: { [key in keyof NonNullable<Props["style"]>]?: string[] } = {
    root_base: ["root", "base"],
    root_flush: ["root", "flush"],
    panel_base: ["panel"],
    panel_flush: ["panel", "flush"],
    title_base: ["title", "base"],
    title_flush: ["title", "flush"],
    title_hover: ["title", "hover"],
    title_focus: ["title", "focus"],
    title_focus_ring: ["title", "focusRing"],
    title_disabled: ["title", "disabled"],
    title_arrow_base: ["title", "arrow", "base"],
    title_arrow_open: ["title", "arrow", "open"],
    content_base: ["content", "base"],
    content_hidden: ["content", "hidden"],
    content_visible: ["content", "visible"],

    // Color Variants
    colorDefault_titleBg: ["color", "default", "titleBg"],
    colorDefault_titleText: ["color", "default", "titleText"],
    colorDefault_titleHoverBg: ["color", "default", "titleHoverBg"],
    colorDefault_contentBg: ["color", "default", "contentBg"],
    colorDefault_contentText: ["color", "default", "contentText"],

    colorBlue_titleBg: ["color", "blue", "titleBg"],
    colorBlue_titleText: ["color", "blue", "titleText"],
    colorBlue_titleHoverBg: ["color", "blue", "titleHoverBg"],
    colorBlue_contentBg: ["color", "blue", "contentBg"],
    colorBlue_contentText: ["color", "blue", "contentText"],

    colorGray_titleBg: ["color", "gray", "titleBg"],
    colorGray_titleText: ["color", "gray", "titleText"],
    colorGray_titleHoverBg: ["color", "gray", "titleHoverBg"],
    colorGray_contentBg: ["color", "gray", "contentBg"],
    colorGray_contentText: ["color", "gray", "contentText"],

    colorGreen_titleBg: ["color", "green", "titleBg"],
    colorGreen_titleText: ["color", "green", "titleText"],
    colorGreen_titleHoverBg: ["color", "green", "titleHoverBg"],
    colorGreen_contentBg: ["color", "green", "contentBg"],
    colorGreen_contentText: ["color", "green", "contentText"],

    colorRed_titleBg: ["color", "red", "titleBg"],
    colorRed_titleText: ["color", "red", "titleText"],
    colorRed_titleHoverBg: ["color", "red", "titleHoverBg"],
    colorRed_contentBg: ["color", "red", "contentBg"],
    colorRed_contentText: ["color", "red", "contentText"],

    colorYellow_titleBg: ["color", "yellow", "titleBg"],
    colorYellow_titleText: ["color", "yellow", "titleText"],
    colorYellow_titleHoverBg: ["color", "yellow", "titleHoverBg"],
    colorYellow_contentBg: ["color", "yellow", "contentBg"],
    colorYellow_contentText: ["color", "yellow", "contentText"],

    colorPurple_titleBg: ["color", "purple", "titleBg"],
    colorPurple_titleText: ["color", "purple", "titleText"],
    colorPurple_titleHoverBg: ["color", "purple", "titleHoverBg"],
    colorPurple_contentBg: ["color", "purple", "contentBg"],
    colorPurple_contentText: ["color", "purple", "contentText"],
  };

  // 🔸 تابع کمکی برای merge کردن کلاس‌ها در تم
  function mergeNestedProperty(targetObj: any, path: string[], value: string) {
    let current = targetObj;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]] = current[path[i]] || {};
    }
    const lastKey = path[path.length - 1];
    current[lastKey] = twMerge(current[lastKey], value);
  }

  // 🔸 ترکیب تم کاربر و تم پیش‌فرض
  const mergedTheme = useMemo(() => {
    const appearance = style || {};
    const newTheme = safeClone(defaultTheme);

    for (const key in appearance) {
      if (Object.prototype.hasOwnProperty.call(themeMap, key)) {
        const path = themeMap[key as keyof typeof appearance];
        const value = appearance[key as keyof typeof appearance];
        if (path && value) mergeNestedProperty(newTheme, path, value);
      }
    }

    return newTheme;
  }, [defaultTheme, style]);

  const containerClasses = twMerge(geometric.width, geometric.spacing);

  // ---------------------------
  // 🔹 خروجی کامپوننت
  // ---------------------------
  return (
    <FlowbiteAccordion
      className={containerClasses}
      {...props}
      theme={mergedTheme as any}
      alwaysOpen={logic.alwaysOpen}
    >
      {children}
    </FlowbiteAccordion>
  );
};

// ---------------------------
// 🔹 اتصال Subcomponent‌ها
// ---------------------------
const AccordionWithSubcomponents = Object.assign(AccordionComponent, {
  Panel: AccordionPanel,
  Title: AccordionTitle,
  Content: AccordionContent,
});

export default AccordionWithSubcomponents;
