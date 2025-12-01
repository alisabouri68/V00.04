import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.0/dynaCtrl";


export type DropdownItem = {
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  type?: "item" | "divider" | "header" | "custom";
  onClick?: (id?: string) => void;
  customElement?: React.ReactNode;
  disabled?: boolean;
};

export interface DropdownProps {
  geometric?: {
    width?: string; // e.g. "w-40" | "w-auto"
  };
  logic?: {
    trigger?: React.ReactNode;
    items?: DropdownItem[];
    placement?: "top" | "bottom" | "left" | "right";
    inline?: boolean;
    parametr?: object;
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "outline"; // visual variant for items
    color?: // color theme for items and menu (matches Button keys)
    | "default"
    | "alternative"
    | "blue"
    | "cyan"
    | "dark"
    | "gray"
    | "green"
    | "indigo"
    | "light"
    | "lime"
    | "pink"
    | "purple"
    | "red"
    | "teal"
    | "yellow";
    closeOnClick?: boolean;
    onOpenChange?: (open: boolean) => void;
  };
  style?: {
    // base
    base_container?: string;
    base_trigger?: string;
    base_menu?: string;
    base_item?: string;
    base_divider?: string;
    base_header?: string;
    base_focus_ring?: string;
    disabled_opacity?: string;
    // sizes
    size_sm?: string;
    size_md?: string;
    size_lg?: string;
    // placements
    placement_top?: string;
    placement_bottom?: string;
    placement_left?: string;
    placement_right?: string;
    // rounding
    base_rounding?: string;

    // --- Solid Color Variants ---
    colorDefault_bgColor?: string;
    colorDefault_textColor?: string;
    colorDefault_hover_bgColor?: string;
    colorDefault_focus_ringColor?: string;

    colorAlternative_bgColor?: string;
    colorAlternative_textColor?: string;
    colorAlternative_hover_bgColor?: string;
    colorAlternative_borderColor?: string;

    colorBlue_bgColor?: string;
    colorBlue_textColor?: string;
    colorBlue_hover_bgColor?: string;

    colorCyan_bgColor?: string;
    colorCyan_textColor?: string;
    colorCyan_hover_bgColor?: string;

    colorDark_bgColor?: string;
    colorDark_textColor?: string;
    colorDark_hover_bgColor?: string;

    colorGray_bgColor?: string;
    colorGray_textColor?: string;
    colorGray_hover_bgColor?: string;

    colorGreen_bgColor?: string;
    colorGreen_textColor?: string;
    colorGreen_hover_bgColor?: string;

    colorIndigo_bgColor?: string;
    colorIndigo_textColor?: string;
    colorIndigo_hover_bgColor?: string;

    colorLight_bgColor?: string;
    colorLight_textColor?: string;
    colorLight_hover_bgColor?: string;
    colorLight_borderColor?: string;

    colorLime_bgColor?: string;
    colorLime_textColor?: string;
    colorLime_hover_bgColor?: string;

    colorPink_bgColor?: string;
    colorPink_textColor?: string;
    colorPink_hover_bgColor?: string;

    colorPurple_bgColor?: string;
    colorPurple_textColor?: string;
    colorPurple_hover_bgColor?: string;

    colorRed_bgColor?: string;
    colorRed_textColor?: string;
    colorRed_hover_bgColor?: string;

    colorTeal_bgColor?: string;
    colorTeal_textColor?: string;
    colorTeal_hover_bgColor?: string;

    colorYellow_bgColor?: string;
    colorYellow_textColor?: string;
    colorYellow_hover_bgColor?: string;

    // --- Outline Color Variants ---
    outlineColorDefault_borderColor?: string;
    outlineColorDefault_textColor?: string;
    outlineColorDefault_hover_bgColor?: string;
    outlineColorDefault_hover_textColor?: string;

    outlineColorBlue_borderColor?: string;
    outlineColorBlue_textColor?: string;
    outlineColorBlue_hover_bgColor?: string;
    outlineColorBlue_hover_textColor?: string;

    outlineColorCyan_borderColor?: string;
    outlineColorCyan_textColor?: string;
    outlineColorCyan_hover_bgColor?: string;
    outlineColorCyan_hover_textColor?: string;

    outlineColorDark_borderColor?: string;
    outlineColorDark_textColor?: string;
    outlineColorDark_hover_bgColor?: string;
    outlineColorDark_hover_textColor?: string;

    outlineColorGray_borderColor?: string;
    outlineColorGray_textColor?: string;
    outlineColorGray_hover_bgColor?: string;
    outlineColorGray_hover_textColor?: string;

    outlineColorGreen_borderColor?: string;
    outlineColorGreen_textColor?: string;
    outlineColorGreen_hover_bgColor?: string;
    outlineColorGreen_hover_textColor?: string;

    outlineColorIndigo_borderColor?: string;
    outlineColorIndigo_textColor?: string;
    outlineColorIndigo_hover_bgColor?: string;
    outlineColorIndigo_hover_textColor?: string;

    outlineColorLime_borderColor?: string;
    outlineColorLime_textColor?: string;
    outlineColorLime_hover_bgColor?: string;
    outlineColorLime_hover_textColor?: string;

    outlineColorPink_borderColor?: string;
    outlineColorPink_textColor?: string;
    outlineColorPink_hover_bgColor?: string;
    outlineColorPink_hover_textColor?: string;

    outlineColorPurple_borderColor?: string;
    outlineColorPurple_textColor?: string;
    outlineColorPurple_hover_bgColor?: string;
    outlineColorPurple_hover_textColor?: string;

    outlineColorRed_borderColor?: string;
    outlineColorRed_textColor?: string;
    outlineColorRed_hover_bgColor?: string;
    outlineColorRed_hover_textColor?: string;

    outlineColorTeal_borderColor?: string;
    outlineColorTeal_textColor?: string;
    outlineColorTeal_hover_bgColor?: string;
    outlineColorTeal_hover_textColor?: string;

    outlineColorYellow_borderColor?: string;
    outlineColorYellow_textColor?: string;
    outlineColorYellow_hover_bgColor?: string;
    outlineColorYellow_hover_textColor?: string;
  };
}

const Dropdown: React.FC<DropdownProps> = ({
  geometric = { width: "w-auto" },
  logic = {
    placement: "bottom",
    inline: false,
    parametr: {},
    size: "md",
    variant: "solid",
    color: "default",
    closeOnClick: true,
    items: [],
  },
  style = {
    // base
    base_container: "relative inline-block text-left",
    base_trigger: "inline-flex items-center",
    base_menu:
      "absolute z-50 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none",
    base_item:
      "flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors",
    base_divider: "my-1 border-t border-gray-200",
    base_header: "px-4 py-2 text-xs text-gray-400 uppercase tracking-wider",
    base_focus_ring: "focus:ring-2 focus:ring-offset-1",
    disabled_opacity: "opacity-50",

    // sizes
    size_sm: "text-xs py-1 px-3",
    size_md: "text-sm py-2 px-4",
    size_lg: "text-base py-3 px-5",

    // placements
    placement_top: "bottom-full mb-2",
    placement_bottom: "top-full mt-2",
    placement_left: "right-full mr-2",
    placement_right: "left-full ml-2",

    base_rounding: "rounded-lg",

    // --- Solid defaults
    colorDefault_bgColor: "bg-white",
    colorDefault_textColor: "text-gray-700",
    colorDefault_hover_bgColor: "hover:bg-gray-50",
    colorDefault_focus_ringColor: "focus:ring-primary-300",

    colorAlternative_bgColor: "bg-white",
    colorAlternative_textColor: "text-gray-900",
    colorAlternative_hover_bgColor: "hover:bg-gray-100",
    colorAlternative_borderColor: "border border-gray-200",

    colorBlue_bgColor: "bg-blue-600",
    colorBlue_textColor: "text-white",
    colorBlue_hover_bgColor: "hover:bg-blue-700",

    colorCyan_bgColor: "bg-cyan-600",
    colorCyan_textColor: "text-white",
    colorCyan_hover_bgColor: "hover:bg-cyan-700",

    colorDark_bgColor: "bg-dark",
    colorDark_textColor: "text-light",
    colorDark_hover_bgColor: "hover:light",
    colorDark_borderColor: "border border-light/70",

    colorGray_bgColor: "bg-gray-700",
    colorGray_textColor: "text-white",
    colorGray_hover_bgColor: "hover:bg-gray-800",

    colorGreen_bgColor: "bg-green-600",
    colorGreen_textColor: "text-white",
    colorGreen_hover_bgColor: "hover:bg-green-700",

    colorIndigo_bgColor: "bg-indigo-600",
    colorIndigo_textColor: "text-white",
    colorIndigo_hover_bgColor: "hover:bg-indigo-700",

    colorLight_bgColor: "bg-light",
    colorLight_textColor: "text-dark",
    // colorLight_hover_bgColor: "hover:bg-light",
    colorLight_borderColor: "border border-dark",

    colorLime_bgColor: "bg-lime-600",
    colorLime_textColor: "text-white",
    colorLime_hover_bgColor: "hover:bg-lime-700",

    colorPink_bgColor: "bg-pink-600",
    colorPink_textColor: "text-white",
    colorPink_hover_bgColor: "hover:bg-pink-700",

    colorPurple_bgColor: "bg-purple-600",
    colorPurple_textColor: "text-white",
    colorPurple_hover_bgColor: "hover:bg-purple-700",

    colorRed_bgColor: "bg-red-600",
    colorRed_textColor: "text-white",
    colorRed_hover_bgColor: "hover:bg-red-700",

    colorTeal_bgColor: "bg-teal-600",
    colorTeal_textColor: "text-white",
    colorTeal_hover_bgColor: "hover:bg-teal-700",

    colorYellow_bgColor: "bg-yellow-400",
    colorYellow_textColor: "text-white",
    colorYellow_hover_bgColor: "hover:bg-yellow-500",

    // --- Outline defaults
    outlineColorDefault_borderColor: "border border-primary-700",
    outlineColorDefault_textColor: "text-primary-700",
    outlineColorDefault_hover_bgColor: "hover:bg-primary-700",
    outlineColorDefault_hover_textColor: "hover:text-white",

    outlineColorBlue_borderColor: "border border-blue-700",
    outlineColorBlue_textColor: "text-blue-700",
    outlineColorBlue_hover_bgColor: "hover:bg-blue-800",
    outlineColorBlue_hover_textColor: "hover:text-white",

    outlineColorCyan_borderColor: "border border-cyan-700",
    outlineColorCyan_textColor: "text-cyan-700",
    outlineColorCyan_hover_bgColor: "hover:bg-cyan-800",
    outlineColorCyan_hover_textColor: "hover:text-white",

    outlineColorDark_borderColor: "border border-gray-800",
    outlineColorDark_textColor: "text-gray-800",
    outlineColorDark_hover_bgColor: "hover:bg-gray-900",
    outlineColorDark_hover_textColor: "hover:text-white",

    outlineColorGray_borderColor: "border border-gray-700",
    outlineColorGray_textColor: "text-gray-700",
    outlineColorGray_hover_bgColor: "hover:bg-gray-800",
    outlineColorGray_hover_textColor: "hover:text-white",

    outlineColorGreen_borderColor: "border border-green-700",
    outlineColorGreen_textColor: "text-green-700",
    outlineColorGreen_hover_bgColor: "hover:bg-green-800",
    outlineColorGreen_hover_textColor: "hover:text-white",

    outlineColorIndigo_borderColor: "border border-indigo-700",
    outlineColorIndigo_textColor: "text-indigo-700",
    outlineColorIndigo_hover_bgColor: "hover:bg-indigo-800",
    outlineColorIndigo_hover_textColor: "hover:text-white",

    outlineColorLime_borderColor: "border border-lime-700",
    outlineColorLime_textColor: "text-lime-700",
    outlineColorLime_hover_bgColor: "hover:bg-lime-800",
    outlineColorLime_hover_textColor: "hover:text-white",

    outlineColorPink_borderColor: "border border-pink-700",
    outlineColorPink_textColor: "text-pink-700",
    outlineColorPink_hover_bgColor: "hover:bg-pink-800",
    outlineColorPink_hover_textColor: "hover:text-white",

    outlineColorPurple_borderColor: "border border-purple-700",
    outlineColorPurple_textColor: "text-purple-700",
    outlineColorPurple_hover_bgColor: "hover:bg-purple-800",
    outlineColorPurple_hover_textColor: "hover:text-white",

    outlineColorRed_borderColor: "border border-red-700",
    outlineColorRed_textColor: "text-red-700",
    outlineColorRed_hover_bgColor: "hover:bg-red-800",
    outlineColorRed_hover_textColor: "hover:text-white",

    outlineColorTeal_borderColor: "border border-teal-700",
    outlineColorTeal_textColor: "text-teal-700",
    outlineColorTeal_hover_bgColor: "hover:bg-teal-800",
    outlineColorTeal_hover_textColor: "hover:text-white",

    outlineColorYellow_borderColor: "border border-yellow-400",
    outlineColorYellow_textColor: "text-yellow-400",
    outlineColorYellow_hover_bgColor: "hover:bg-yellow-500",
    outlineColorYellow_hover_textColor: "hover:text-white",
  },
}) => {
  const { reconfigDyna } = initDyna()
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const items = logic?.items || [];

  useEffect(() => {
    // close on outside click
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIndex(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    logic?.onOpenChange?.(open);
  }, [open]); // eslint-disable-line

  // keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const selectableIndexes = items
        .map((it, idx) => ({ it, idx }))
        .filter(({ it }) => it.type !== "divider" && it.type !== "header" && !it.disabled)
        .map(({ idx }) => idx);
      if (!selectableIndexes.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (focusedIndex === null) setFocusedIndex(selectableIndexes[0]);
        else {
          const pos = selectableIndexes.indexOf(focusedIndex);
          const next = selectableIndexes[(pos + 1) % selectableIndexes.length];
          setFocusedIndex(next);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (focusedIndex === null) setFocusedIndex(selectableIndexes[selectableIndexes.length - 1]);
        else {
          const pos = selectableIndexes.indexOf(focusedIndex);
          const next = selectableIndexes[(pos - 1 + selectableIndexes.length) % selectableIndexes.length];
          setFocusedIndex(next);
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (focusedIndex !== null) {
          const it = items[focusedIndex];
          if (it && it.onClick && it.type === "item" && !it.disabled) {
            it.onClick(it.id);
            if (logic?.closeOnClick) setOpen(false);
          }
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        setFocusedIndex(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, focusedIndex, items, logic]); // eslint-disable-line

  const sizeClass =
    logic.size === "sm" ? style.size_sm : logic.size === "lg" ? style.size_lg : style.size_md;

  const placementClass =
    logic.placement === "top"
      ? style.placement_top
      : logic.placement === "left"
        ? style.placement_left
        : logic.placement === "right"
          ? style.placement_right
          : style.placement_bottom;

  // helper: get color string from style by convention names (e.g. colorBlue_bgColor)
  const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

  const getSolidClasses = (colorName: string) => {
    const C = cap(colorName);
    const bg = (style as any)[`color${C}_bgColor`] ?? "";
    const text = (style as any)[`color${C}_textColor`] ?? "";
    const hover = (style as any)[`color${C}_hover_bgColor`] ?? "";
    const focus = (style as any)[`color${C}_focus_ringColor`] ?? "";
    return twMerge(bg, text, hover, focus);
  };

  const getOutlineClasses = (colorName: string) => {
    const C = cap(colorName);
    const border = (style as any)[`outlineColor${C}_borderColor`] ?? "";
    const text = (style as any)[`outlineColor${C}_textColor`] ?? "";
    const hoverBg = (style as any)[`outlineColor${C}_hover_bgColor`] ?? "";
    const hoverText = (style as any)[`outlineColor${C}_hover_textColor`] ?? "";
    return twMerge(border, text, hoverBg, hoverText);
  };

  // menu wrapper classes depend on variant/color for background/border
  const menuColorClasses =
    logic.variant === "outline"
      ? getOutlineClasses(logic.color || "default")
      : getSolidClasses(logic.color || "default");
  const handleDropdownClick = () => {
    setOpen((open) => !open);
    setFocusedIndex(null);

    // Send props to ENVI_COMP when dropdown is opened
    if (!open) {
      const dropdownProps = {
        geometric,
        logic,
        style
      };      
      reconfigDyna({
        components: {
          dropdown: dropdownProps
        }
      });

      console.log('Dropdown props sent to ENVI_COMP:', dropdownProps);
    }
  };

  return (
    <div
      ref={containerRef}
      className={twMerge(style.base_container, geometric?.width, logic.inline ? "inline-flex items-center gap-2" : "")}
    >
      <div
        className={twMerge(style.base_trigger, "cursor-pointer")}
        onClick={handleDropdownClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        {logic.trigger ?? (
          <button className="px-4 py-2 text-dark rounded-md">Dropdown</button>
        )}
      </div>

      {open && (
        <div
          ref={menuRef}
          className={twMerge(style.base_menu, placementClass, style.base_rounding, menuColorClasses)}
          style={{ minWidth: "10rem" }}
        >
          {items.map((item, idx) => {
            if (item.type === "divider") {
              return <div key={idx} className={style.base_divider} />;
            }
            if (item.type === "header") {
              return (
                <div key={idx} className={style.base_header}>
                  {item.label}
                </div>
              );
            }
            if (item.type === "custom") {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    item.onClick?.(item.id);
                    if (logic.closeOnClick) setOpen(false);
                  }}
                >
                  {item.customElement}
                </div>
              );
            }

            // normal item
            const disabled = !!item.disabled;
            const isFocused = focusedIndex === idx;
       

            const itemClasses = twMerge(
              style.base_item,
              sizeClass,
              disabled ? style.disabled_opacity : "",
              isFocused ? "ring-2 ring-offset-1" : "",
              // if solid variant and color is not white bg, keep base_item hover reset is ok
              logic.variant === "solid" ? "" : ""
            );

            return (
              <div
                key={idx}
                role="menuitem"
                tabIndex={-1}
                className={itemClasses}
                onClick={() => {
                  if (disabled) return;
                  item.onClick?.(item.id);
                  if (logic.closeOnClick) setOpen(false);
                }}
                onMouseEnter={() => setFocusedIndex(idx)}
                onMouseLeave={() => setFocusedIndex(null)}
              >
                {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}
                <span className={twMerge(logic.variant === "outline" ? (style as any)[`outlineColor${cap(logic.color || "default")}_textColor`] : (style as any)[`color${cap(logic.color || "default")}_textColor`])}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
