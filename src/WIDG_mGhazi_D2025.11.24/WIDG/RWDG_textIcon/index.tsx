import React from "react";

// Interface for the TextIcon component's props
interface TextIconProps {
  text?: React.ReactNode; // The main text content to display
  icon?: React.ReactNode; // The icon to display (can be any React node: SVG, FontAwesome, emoji, etc.)
  iconPosition?: "left" | "right" | "top" | "bottom"; // Optional: Position of the icon relative to the text (defaults to 'left' for horizontal, 'top' for vertical)
  orientation?: "horizontal" | "vertical"; // Optional: Orientation of the text and icon (defaults to 'horizontal')
  className?: string; // Optional: Additional CSS classes for the container div
  onClick?: () => void; // New: Optional click event handler for the component
}

/**
 * A flexible component to display text alongside an icon, with support for
 * horizontal and vertical orientations. The icon's position can be controlled.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.text - The text content.
 * @param {React.ReactNode} props.icon - The icon content.
 * @param {'left' | 'right' | 'top' | 'bottom'} [props.iconPosition] - The position of the icon.
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - The orientation of the component.
 * @param {string} [props.className] - Additional CSS classes for the container.
 * @param {() => void} [props.onClick] - Optional click event handler.
 */
const TextIcon: React.FC<TextIconProps> = ({
  text,
  icon,
  iconPosition,
  orientation = "horizontal", // Default to 'horizontal'
  className,
  onClick, // Destructure the new onClick prop
}) => {
  const isHorizontal = orientation === "horizontal";

  // Determine default icon position based on orientation if not explicitly set
  const effectiveIconPosition = iconPosition || (isHorizontal ? "left" : "top");

  // Add cursor-pointer class if onClick is provided to indicate interactivity
  const interactiveClass = onClick ? "cursor-pointer" : "";

  const containerClasses = `flex items-center ${className || ""} ${
    isHorizontal ? "" : "flex-col" // Add flex-col for vertical orientation
  } ${interactiveClass}`;

  const iconSpacingClasses = isHorizontal
    ? effectiveIconPosition === "left"
      ? "mr-2"
      : "ml-2"
    : effectiveIconPosition === "top"
    ? "mb-2"
    : "mt-2";

  return (
    <div className={containerClasses} onClick={onClick}>
      {" "}
      {/* Pass onClick to the div */}
      {/* Render icon based on position */}
      {(effectiveIconPosition === "left" || effectiveIconPosition === "top") &&
        icon && <span className={iconSpacingClasses}>{icon}</span>}
      {/* Render the text content */}
      <span>{text}</span>
      {/* Render icon based on position */}
      {(effectiveIconPosition === "right" ||
        effectiveIconPosition === "bottom") &&
        icon && <span className={iconSpacingClasses}>{icon}</span>}
    </div>
  );
};

export default TextIcon;
