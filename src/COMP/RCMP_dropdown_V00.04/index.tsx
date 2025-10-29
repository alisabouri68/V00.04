//@ts-nocheck
/******************************************
Component Templates

Last Update:    2025.07.15
By:             SMRT.00

Description:    Reusable Dropdown Component for generic selection
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_Dropdown 
Title:          Component - Dropdown Reusable
Version:        V01.00
VAR:            01 (Initial release)

last-update:    D2025.07.15
owner:          SMRT.00

Description:    A generic dropdown component that accepts a list of options 
                and returns the selected value to the parent.

------------------------------------------------------------*/

/**************************************
 * Step 01 import dependencies - kernels
 **************************************/
import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import classNames from "classnames";

/**************************************
 * Step 02 declare types/interfaces
 **************************************/
export interface DropdownOption {
  id: string;
  name?: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (selected: DropdownOption) => void;
  selected?: DropdownOption | null;
  placeholder?: string;
  className?: string;
}

/**************************************
 * Step 03 define main component
 **************************************/
const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selected,
  placeholder = "Select...",
  className,
}) => {
  /**************************************
   * Step 04 initialize state & refs
   **************************************/
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  /**************************************
   * Step 05 close dropdown on outside click
   **************************************/
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**************************************
   * Step 06 render component
   **************************************/
  return (
    <div
      className={classNames(
        "relative inline-block cursor-pointer",
        className
      )}
      ref={dropdownRef}
    >
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full min-w-[180px] px-4 py-2 bg-white dark:bg-gray-800 
                 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-expanded={isOpen}
      >
        <span className="flex items-center space-x-2">
          {selected?.icon && <span className="text-lg">{selected.icon}</span>}
          <span className="text-base text-gray-800 dark:text-gray-100">
            {selected?.name || placeholder}
          </span>
        </span>
        <MdKeyboardArrowDown
          className={classNames("text-xl transition-transform duration-200 text-gray-500 dark:text-gray-400", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700 rounded-md shadow-lg
                   overflow-hidden max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option.id}
              className={classNames(
                "w-full text-left px-4 py-2 flex items-center space-x-2 transition-colors duration-150",
                {
                  "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300": selected?.id === option.id,
                  "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200": selected?.id !== option.id
                }
              )}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option.icon && <span className="text-lg">{option.icon}</span>}
              <span className="text-sm">{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**************************************
 * Step 07 export component
 **************************************/
export default Dropdown;