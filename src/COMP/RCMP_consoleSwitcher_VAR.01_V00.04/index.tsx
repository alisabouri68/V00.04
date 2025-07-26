/******************************************
Component Templates

Last Update:    2025.07.15
By:             Apps.00

Description:    This template is used for developing React Components 
                according to Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_consoleSwitcher
Title:          Component 
Version:        00.04
VAR:            01 (initial stable)

last-update:    D2025.07.15
owner:          Apps.00

Description:    Displays a compact profile section with logo, username, 
                and a dropdown trigger.

------------------------------------------------------------*/

/**************************************
 * Step 01: import dependencies - kernels
 **************************************/
import React, { memo } from "react";
import logo from "../../ASST/images/logo-dash.svg";
import { CgMoreVertical } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { openModal } from "../../RDUX/modal/modalSlice";
import BOX_modal from "BOX/BOX_modal";
import ConsoleBasket from "COMP/RCMP_consoleBasket_VAR.01_V00.04/index";
/**************************************
 * Step 02: import dependency - widgets
 **************************************/
// (optional future sub-widgets)

/**************************************
 * Step 03: co-actor dependencies
 **************************************/
// (Redux, Router, Context, etc)

/**************************************
 * Step 04: define static constants
 **************************************/
// (No static needed here yet)

/**************************************
 * Step 05: define props interface
 **************************************/
interface IndexProps {
  console?: string; // optional for flexibility
}

/**************************************
 * Step 06: define functional component
 **************************************/
const index: React.FC<IndexProps> = ({ console = "mono" }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(
      openModal({
        title: "",
        content: <ConsoleBasket  />,
      })
    );
  };

  return (
    <div className="w-h-f space-x-4 bg-text">
      {/* Company Logo */}
      <div className="w-h-f">
        <img src={logo} alt="Raad Health Logo" className="h-8 w-auto" />
      </div>

      {/* Username Display */}
      <div className="hidden md:flex items-center">
        <span className="font-medium">
          {console} ({console})
        </span>
      </div>

      {/* More Options Icon */}
      <button
        aria-label="More options"
        className="p-1 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
        onClick={handleOpenModal}
      >
        <CgMoreVertical className="text-xl" />
      </button>
      <BOX_modal />
    </div>
  );
};

/**************************************
 * Step 07: export component with memo
 **************************************/
export default memo(index);
