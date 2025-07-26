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
interface DropdownOption {
  id: string;
  name: string;
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
      className={classNames("relative inline-block", className)}
      ref={dropdownRef}
    >
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-h-f justify-center mx-2 gap-2 min-w-[180px] max-w-[180px] py-2 rounded-md bg-text focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="flex items-center space-x-2 text-2xl">
          {selected?.icon && <span>{selected.icon}</span>}
          <span className="text-base">{selected?.name || placeholder}</span>
        </span>
        <MdKeyboardArrowDown
          className={classNames("text-xl transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-stone-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 rounded-md shadow-md">
          {options.map((option) => (
            <button
              key={option.id}
              className={classNames(
                "w-full border-4 border-transparent text-left px-4 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center space-x-2 ",
                {
                  "!text-primary  border-s-primary":
                    selected?.id === option.id,
                }
              )}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option.icon && <span>{option.icon}</span>}
              <span>{option.name}</span>
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
