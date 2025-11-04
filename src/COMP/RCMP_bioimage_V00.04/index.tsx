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
Title:          Image Component with Text Variants
Version:        V00.05
VAR:            01 (4 text variants)

last-update:    D2025.09.12
owner:          APPS.68

Description:    Image component with 4 text variants: normal, top-text, bottom-text, center-text
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
import Text from "COMP/RCMP_biotext_V0004";
/**************************************
 * Step 05 - define property interface for this BioWidget
 **************************************/
interface ImageProps {
  geo?: { 
    width?: string; 
    height?: string;
    variant?: 'normal' | 'text-top' | 'text-bottom' | 'text-center';
  };
  logic: {
    src: string;
    alt?: string;
    fallbackSrc?: string;
    lazy?: boolean;
    text?: {
      content: string;
      position?: 'top' | 'bottom' | 'center';
      style?: {
        color?: string;
        fontSize?: string;
        fontWeight?: string;
        backgroundColor?: string;
        padding?: string;
      };
    };
  };
  styles?: {
    borderRadius?: string;
    boxShadow?: string;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    containerStyle?: React.CSSProperties;
    textContainerStyle?: React.CSSProperties;
  };
}
/**************************************
 * Step 07 - Class Component should be defined
 *
 **************************************/
const Image = ({ geo, logic, styles }: ImageProps) => {
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

  // تعیین واریانت بر اساس propها
  const getVariant = () => {
    if (currentGeo?.variant) return currentGeo.variant;
    if (currentLogic.text?.position) {
      return `text-${currentLogic.text.position}` as typeof currentGeo.variant;
    }
    return 'normal';
  };

  const variant = getVariant();

  // استایل‌های پیش‌فرض برای متن
  const defaultTextStyle = {
    color: currentLogic.text?.style?.color || 'white',
    fontSize: currentLogic.text?.style?.fontSize || '16px',
    fontWeight: currentLogic.text?.style?.fontWeight || 'bold',
    backgroundColor: currentLogic.text?.style?.backgroundColor || 'rgba(0,0,0,0.5)',
    padding: currentLogic.text?.style?.padding || '10px',
  };

  // رندر متن بر اساس موقعیت
  const renderText = () => {
    if (!currentLogic.text?.content) return null;

    const textElement = (
      <div
        style={{
          ...defaultTextStyle,
          position: variant === 'text-center' ? 'absolute' : 'static',
          ...(variant === 'text-center' && {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
          }),
          ...currentStyles?.textContainerStyle,
        }}
        className="image-text"
      >
        {currentLogic.text.content}
      </div>
    );

    return textElement;
  };

  const renderByVariant = () => {
    switch (variant) {
      case 'text-top':
        return (
          <div className="flex flex-col" style={currentStyles?.containerStyle}>
            {renderText()}
            <img
              ref={imgRef}
              src={currentLogic?.src}
              alt={currentLogic?.alt || ""}
              loading={currentLogic?.lazy ? "lazy" : "eager"}
              onError={handleError}
              style={{
                width: currentGeo?.width || '100%',
                height: currentGeo?.height || 'auto',
                borderRadius: currentStyles?.borderRadius,
                boxShadow: currentStyles?.boxShadow,
                objectFit: currentStyles?.objectFit || 'cover',
              }}
            />
          </div>
        );

      case 'text-bottom':
        return (
          <div className="flex flex-col" style={currentStyles?.containerStyle}>
            <img
              ref={imgRef}
              src={currentLogic?.src}
              alt={currentLogic?.alt || ""}
              loading={currentLogic?.lazy ? "lazy" : "eager"}
              onError={handleError}
              style={{
                width: currentGeo?.width || '100%',
                height: currentGeo?.height || 'auto',
                borderRadius: currentStyles?.borderRadius,
                boxShadow: currentStyles?.boxShadow,
                objectFit: currentStyles?.objectFit || 'cover',
              }}
            />
            {renderText()}
          </div>
        );

      case 'text-center':
        return (
          <div className="relative" style={currentStyles?.containerStyle}>
            <img
              ref={imgRef}
              src={currentLogic?.src}
              alt={currentLogic?.alt || ""}
              loading={currentLogic?.lazy ? "lazy" : "eager"}
              onError={handleError}
              style={{
                width: currentGeo?.width || '100%',
                height: currentGeo?.height || 'auto',
                borderRadius: currentStyles?.borderRadius,
                boxShadow: currentStyles?.boxShadow,
                objectFit: currentStyles?.objectFit || 'cover',
              }}
            />
            {renderText()}
          </div>
        );

      default: // normal
        return (
          <img
            ref={imgRef}
            src={currentLogic?.src}
            alt={currentLogic?.alt || ""}
            loading={currentLogic?.lazy ? "lazy" : "eager"}
            onError={handleError}
            style={{
              width: currentGeo?.width || '100%',
              height: currentGeo?.height || 'auto',
              borderRadius: currentStyles?.borderRadius,
              boxShadow: currentStyles?.boxShadow,
              objectFit: currentStyles?.objectFit || 'cover',
            }}
          />
        );
    }
  };

  return (
    <div className="image-component">
      {renderByVariant()}
    </div>
  );
};

export default Image;