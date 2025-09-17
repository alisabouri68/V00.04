//@ts-nocheck
/******************************************
Widget Templates

Last Update:    2025.09.12
By:             APPS.68

Description:  This templates is used for developing React Components according to Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RWID 
Title:          Widget Templates - React Version
Version:        V00.04
VAR:            01 (remarks ....)

last-update:    D2025.09.12
owner:          APPS.68

Description:    Here ...

------------------------------------------------------------*/

/**************************************
 * Step 01 import dependencies - kernels
 **************************************/
import { useState, useRef, useEffect } from "react";
/**************************************
 * Step.02:    import dependency - widgets
 **************************************/
import Button from "COMP/RCMP_button_V00.04";
/**************************************
 * Step.03:    co-actor dependencies
 **************************************/

import schmJson from "./.schm.json?raw";
import Assistant from "./paraAssist";
import Editor from "./paraEdit";
import { SiHomeassistant } from "react-icons/si";
import Text from "COMP/RCMP_biotext_V00.04";
/**************************************
 * Step 05 - define property interface for this BioWidget
 **************************************/
interface ImageProps {
  geo?: { width?: string; height?: string };
  logic: {
    src: string;
    alt?: string;
    fallbackSrc?: string;
    lazy?: boolean;
  };
  styles?: {
    borderRadius?: string;
    boxShadow?: string;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  };
}
/**************************************
 * Step 07 - Class Component should be defined
 *
 **************************************/
const Image = ({ geo = {}, logic, styles = {} }: ImageProps) => {
  const [showAssistant, setShowAssistant] = useState(false);
  const [isAssistant, setIsAssistant] = useState(true);
  const [currentGeo, setCurrentGeo] = useState(geo);
  const [currentLogic, setCurrentLogic] = useState(logic);
  const [currentStyles, setCurrentStyles] = useState(styles);

  const assistantRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentLogic.fallbackSrc) {
      e.currentTarget.src = currentLogic.fallbackSrc;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        assistantRef.current &&
        !assistantRef.current.contains(event.target as Node) &&
        !imgRef.current?.contains(event.target as Node)
      ) {
        setShowAssistant(false);
      }
    };

    if (showAssistant) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showAssistant]);

  return (
    <>
      <div className="relative overflow-hidden">
        <img
          ref={imgRef}
          src={currentLogic?.src}
          alt={currentLogic?.alt || ""}
          loading={currentLogic?.lazy ? "lazy" : "eager"}
          onError={handleError}
          onClick={() => setShowAssistant(true)}
          style={{
            width: currentGeo.width,
            height: currentGeo.height,
            borderRadius: currentStyles.borderRadius,
            boxShadow: currentStyles.boxShadow,
            objectFit: currentStyles.objectFit,
            cursor: "wait",
          }}
        />
      </div>

      {/* Slide-in Assistant */}
      {showAssistant && (
        <div
          ref={assistantRef}
          className={`flex flex-col gap-1 fixed right-1 top-[84px] bottom-[84px] lg:bottom-1 z-50
    bg-light text-dark p-4
    rounded-lg
    w-[25%]
    lg:w-[calc(25%_-_23px)] 
   overflow-hidden`}
        >
          <div className="flex items-center gap-3">
            <Text size="2xl">
              <SiHomeassistant />
            </Text>
            <Text>Assistant</Text>
          </div>
          <div className="bg-light shadow-lg gap-1 border border-gray-300 dark:border-gray-700 rounded-lg flex w-full">
            <Button
              fullWidth={true}
              buttunTitle="Para Assistant"
              variant={isAssistant ? "filled" : "outlined"}
              onClick={() => setIsAssistant(true)}
            />
            <Button
              fullWidth={true}
              buttunTitle="Para Editor"
              variant={isAssistant ? "outlined" : "filled"}
              onClick={() => setIsAssistant(false)}
            />
          </div>
          {isAssistant ? (
            <Assistant
              geo={currentGeo}
              logic={currentLogic}
              styles={currentStyles}
              onClose={() => setShowAssistant(false)}
              onChange={({ geo, logic, styles }) => {
                if (geo) setCurrentGeo(geo);
                if (logic) setCurrentLogic(logic);
                if (styles) setCurrentStyles(styles);
              }}
            />
          ) : (
            <Editor />
          )}
        </div>
      )}
    </>
  );
};

export default Image;
