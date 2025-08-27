/******************************************
Component:       BOX_modal

Last Update:     2025.07.16
By:              Apps.00

Description:     A reusable modal component that supports portal rendering, Escape key to close, scroll locking, and outside click detection.
Architecture:    Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:              BOX_modal
Title:           Reusable Modal Component
Version:         0
VAR:             0

Last-Update:     D2025.07.16
Owner:           Apps.00

Description:     Modal component rendered via portal into #modal_root with backdrop, ESC handling, and body scroll lock.

------------------------------------------------------------*/

/**************************************
 * Step 01: Import dependencies
 **************************************/
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useGlobalState } from "RDUX/dynamanContext";
import ConsoleBasket from "../COMP/RCMP_consoleBasket_VAR.01_V00.04";
/**************************************
 * Step 02: Define optional component props
 **************************************/
interface ModalProps {
  className?: string; // Optional: custom styling classes
}

/**************************************
 * Step 03: Component definition
 **************************************/
const BOX_modal = ({ className = "" }: ModalProps) => {
  const { globalState, updateGlobalState } = useGlobalState();

  /**************************************
   * Step 04: Access Redux modal state
   **************************************/

  /**************************************
   * Step 05: Scroll lock on open
   **************************************/
  const isOpen = globalState.modal.isOpen;
  const content = globalState.modal.content;
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /**************************************
   * Step 06: ESC key to close modal
   **************************************/
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") updateGlobalState(!isOpen);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  /**************************************
   * Step 07: Portal target
   **************************************/
  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal_root")
      : null;

  if (!isOpen || !modalRoot) return null;
  /**************************************
   * Step 08: Render via portal
   **************************************/
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm  "
      onClick={() => updateGlobalState({modal:{
        isOpen:false
      }})}
    >
      <div
        className={`relative w-full max-w-3xl rounded-lg h-[90vh] overflow-hidden  bg-light text-dark
     ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {content === "ConsoleBasket" ? <ConsoleBasket /> : null}
      </div>
    </div>,
    modalRoot
  );
};

/**************************************
 * Step 09: Export component
 **************************************/
export default BOX_modal;
