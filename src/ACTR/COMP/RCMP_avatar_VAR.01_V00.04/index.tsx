/******************************************
Component:       Avatar

Last Update:     2025.07.12
By:              Apps.00

Description:     A reusable Avatar component with support for image, fallback text/icon, online status, and sizing.
Architecture:    Smart-Comp Architecture (Standard React Component Structure)
******************************************/

/*------------------------------------------------------------
Meta Data

ID:              RCMP_avatar
Title:           Component Template - React Version
Version:         V00.04
VAR:             01

Last-Update:     D2025.07.12
Owner:           Apps.00

Description:     This component is used to render a user avatar with optional image, fallback text or icon, and status indicator.

------------------------------------------------------------*/

/**************************************
 * Step 01: Import dependencies - kernels
 **************************************/
import React from "react";
import { FaCircleUser } from "react-icons/fa6";

/**************************************
 * Step 02: Define Props interface
 **************************************/
interface AvatarProps {
  src?: string; // Image source URL
  alt?: string; // Alt text for image
  size?: "sm" | "md" | "lg"; // Size variant
  isOnline?: boolean; // Show online status dot
  fallbackText?: string; // Text shown if no image
  className?: string; // Additional custom classes
}

/**************************************
 * Step 03: Define size classes
 **************************************/
const sizeClasses = {
  sm: "w-8 h-8 text-sm", // Small avatar
  md: "w-12 h-12 text-base", // Medium avatar (default)
  lg: "w-16 h-16 text-xl", // Large avatar
};

/**************************************
 * Step 04: Component Definition
 **************************************/
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "md",
  isOnline = false,
  fallbackText = "?",
  className = "",
}) => {
  // Determine size class based on 'size' prop
  const sizeClass = sizeClasses[size];

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {/* Render image if 'src' is provided, else fallback */}
      {src ? (
        <img
          src={src}
          alt={alt}
          className="rounded-full object-cover w-full h-full border shadow"
        />
      ) : (
        <div
          className={`flex items-center justify-center rounded-full bg-white text-gray-300 dark:text-gray-500 font-semibold border shadow ${sizeClass}`}
        >
          {/* Fallback text or icon if no image */}
          {fallbackText ? (
            fallbackText
          ) : (
            <FaCircleUser className="w-full h-full" />
          )}
        </div>
      )}

      {/* Optional online status dot */}
      {isOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
};

/**************************************
 * Step 05: Export component
 **************************************/
export default Avatar;
