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
import Image from "COMP/RCMP_bioimage_V00.04";
import { initDyna } from "RDUX/dynamanContext";
/**************************************
 * Step 02: Define Props interface
 **************************************/
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  fallbackText?: string;
  className?: string;
  jsonAdd?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
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
type JsonFile = Record<string, any>;
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "md",
  isOnline = false,
  fallbackText = "?",
  className = "",
  onClick,
  jsonAdd,
  ...rest
}) => {
  const { reconfigDyna } = initDyna();
  const sizeClass = sizeClasses[size];
  const schmJson: JsonFile = JSON.parse(schmRaw);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (jsonAdd) {
      reconfigDyna({ filed6: schmJson });
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <div
      onClick={handleClick}
      {...rest}
      className={`relative ${sizeClass} ${className}`}
    >
      {/* Render image if 'src' is provided, else fallback */}
      {src ? (
        <Image
         styles={{
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
            logic={{ src: src, alt: "slider",lazy:true }}
            geo={{ width: "100", height: "100" }}
        />
      ) : (
        <div
          className={`flex items-center justify-center rounded-full bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 font-semibold border shadow ${sizeClass}`}
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
