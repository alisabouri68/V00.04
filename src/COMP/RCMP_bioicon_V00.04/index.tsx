

//@ts-nocheck
/******************************************
Component Icon

Last Update:    2025.17.09
By:             APPS.68

Description:  This templates is used for developing React Components according to Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_Icon
Title:          Component Icon - React Version
Version:        V00.04
VAR:            01 (remarks ....)

last-update:    D2025.17.09
owner:          APPS.68

Description:    Here ...

------------------------------------------------------------*/

/**************************************
 * Step 01 import dependencies - kernels
 **************************************/
import { useState, useEffect, useRef } from "react";
import { initDyna } from "RDUX/dynamanContext";
import schmJson from "./.schm.json?raw"

/******************************************
 * Interface: IconProps
 * Description: Defines properties for the Icon component
 ******************************************/
export interface IconProps {
  geo?: { width?: string; height?: string };
  logic?: { onClick?: 0 | 1; id: string; isAssistant: boolean; addToLocall: boolean };
  style?: { fontSize?: string; color?: string; margin?: string; cursor?: string };
  children: React.ReactNode;
}

/******************************************
 * Component: IconComponent
 * Description: Icon component with Assistant state management
 * Features:
 *   - Toggle Assistant on click
 *   - Prevent deactivation when clicking on Assistant
 *   - Manage state in Dyna context
 ******************************************/
const IconComponent = ({ geo, logic, style, children }: IconProps) => {
  /******************************************
   * State & Refs
   ******************************************/
  const [isActive, setIsActive] = useState(false); // Icon active state
  const iconRef = useRef<HTMLDivElement>(null); // Ref for icon element
  const assistantRef = useRef<HTMLDivElement>(null); // Ref for Assistant element

  /******************************************
   * Context & Data Initialization
   ******************************************/
  const parsJson = JSON.parse(schmJson)?.sections?.id?.meta || {} // Parse JSON schema
  const { envi, reconfigDyna } = initDyna(); // Initialize Dyna context
  const id = logic?.id || ""; // Component ID
  const isLocall = envi?.ENVI_glob?.glob_Packet_4?.[id]?.logic?.addToLocall // Local storage status
  const assistant = envi?.ENVI_glob?.glob_Packet_4?.[id]?.logic?.isAssistant; // Assistant status

  /******************************************
   * Data Processing
   ******************************************/
  const storedData = id
    ? envi?.ENVI_glob?.glob_Packet_4?.[id]
    : undefined; // Stored data

  const storedGeo = storedData?.geo || {}; // Geo data
  const storedStyle = storedData?.style || {}; // Style data

  // Combine different styles
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...storedStyle,
    ...storedGeo,
  };

  /******************************************
   * Effect: Handle Click Outside
   * Description: Manage clicks outside icon and Assistant
   * When: When isActive changes
   ******************************************/
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both icon and Assistant
      const clickedOutsideIcon = iconRef.current && !iconRef.current.contains(event.target as Node);
      const clickedOutsideAssistant = assistantRef.current && !assistantRef.current.contains(event.target as Node);

      // Only deactivate if click is outside both
      if (clickedOutsideIcon && clickedOutsideAssistant) {
        if (id && assistant) {
          reconfigDyna((prevState: any) => ({
            ...prevState,
            ENVI_glob: {
              ...prevState.ENVI_glob,
              glob_Packet_4: {
                ...prevState.ENVI_glob?.glob_Packet_4,
                filed_1: {
                  ...prevState.ENVI_glob?.glob_Packet_4.filed_1,
                  id: "" // Clear ID from filed_1
                },
                [id]: {
                  ...prevState.ENVI_glob?.glob_Packet_4?.[id],
                  logic: {
                    ...prevState.ENVI_glob?.glob_Packet_4?.[id]?.logic,
                    isAssistant: false, // Deactivate Assistant
                  },
                },
              },
            },
          }));
          setIsActive(false); // Update local state
        }
      }
    };

    // Add/remove event listener based on active state
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup: Remove event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, id, assistant, reconfigDyna]);

  /******************************************
   * Effect: Find Assistant Element
   * Description: Locate Assistant element in DOM
   * When: When isActive changes
   ******************************************/
  useEffect(() => {
    const findAssistantElement = () => {
      const assistantElement = document.querySelector('[data-component="assistant"]');
      if (assistantElement) {
        // Store reference to Assistant element
        assistantRef.current = assistantElement as HTMLDivElement;
      }
    };

    // Search for Assistant element after short delay to ensure rendering
    const timeoutId = setTimeout(findAssistantElement, 100);

    // Cleanup: Clear timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [isActive]);

  /******************************************
   * Function: handleClick
   * Description: Handle icon click
   * Scenarios:
   *   1. First click (create new data)
   *   2. Assistant active and data is local
   *   3. Assistant inactive but data is local
   ******************************************/
  const handleClick = () => {
    if (!id) return; // Exit if no ID

    // Scenario 1: First click - create new data
    if (!assistant && !isLocall) {
      reconfigDyna((prevState: any) => {
        const currentContent = prevState.ENVI_glob?.glob_Packet_4?.[id] || {};

        return {
          ...prevState,
          ENVI_glob: {
            ...prevState.ENVI_glob,
            glob_Packet_4: {
              ...prevState.ENVI_glob?.glob_Packet_4,
              [id]: {
                ...prevState.ENVI_glob?.glob_Packet_4?.[id],
                meta: { ...parsJson }, // Add meta data from schema
                geo: { ...currentContent.geo, ...geo }, // Combine geo data
                logic: { ...currentContent.logic, ...logic, isAssistant: true, addToLocall: true }, // Enable Assistant and local storage
                style: { ...currentContent.style, ...style }, // Combine style data
              },
              filed_1: {
                ...prevState.ENVI_glob?.glob_Packet_4?.filed_1,
                id, // Set ID in filed_1
                envimng: false // Disable envimng
              },
            },
          },
        };
      });
      setIsActive(true); // Update local state

      // Scenario 2: Assistant active and data is local
    } else if (assistant && isLocall) {
      reconfigDyna((prevState: any) => ({
        ...prevState,
        ENVI_glob: {
          ...prevState.ENVI_glob,
          glob_Packet_4: {
            ...prevState.ENVI_glob?.glob_Packet_4,
            [id]: {
              ...prevState.ENVI_glob?.glob_Packet_4?.[id],
              logic: {
                ...prevState.ENVI_glob?.glob_Packet_4?.[id]?.logic,
                isAssistant: true, // Keep Assistant active
              },
            },
            filed_1: {
              ...prevState.ENVI_glob?.glob_Packet_4?.filed_1,
              id, // Set ID in filed_1
              envimng: false // Disable envimng
            },
          },
        },
      }));
      setIsActive(true); // Update local state

      // Scenario 3: Assistant inactive but data is local
    } else if (!assistant && isLocall) {
      reconfigDyna((prevState: any) => ({
        ...prevState,
        ENVI_glob: {
          ...prevState.ENVI_glob,
          glob_Packet_4: {
            ...prevState.ENVI_glob?.glob_Packet_4,
            [id]: {
              ...prevState.ENVI_glob?.glob_Packet_4?.[id],
              logic: {
                ...prevState.ENVI_glob?.glob_Packet_4?.[id]?.logic,
                isAssistant: true, // Activate Assistant
              },
            },
            filed_1: {
              ...prevState.ENVI_glob?.glob_Packet_4?.filed_1,
              id, // Set ID in filed_1
              envimng: false // Disable envimng
            },
          },
        },
      }));
      setIsActive(true); // Update local state
    }
  };

  /******************************************
   * Render Component
   ******************************************/
  return (
    <div
      ref={iconRef}
      onClick={handleClick}
      className={`flex items-center cursor-pointer ${isActive ? 'ring-2 ring-blue-500 rounded-md' : ''}`}
    >
      <span style={combinedStyle}>{children}</span>
    </div>
  );
};

export default IconComponent;