/******************************************
Component Templates

Last Update:    2025.07.25
By:             SMRT.00 + ChatGPT

Description:    Service button carousel with scrollable navigation
               + Dropdown that auto-closes on outside click.
******************************************/

import { useEffect, useMemo, useRef, useState } from 'react';
import Button from "COMP/RCMP_button_V00.04";
import Text from 'COMP/RCMP_text_VAR.01_v00.04';
import ServiceDropList from "COMP/RCMP_serviceDropList_VAR.01_V00.04";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";
import { CiFileOn } from "react-icons/ci";
import { JSX } from 'react/jsx-runtime';

/**************************************
 * Step 01 - define static types
 **************************************/
export interface ServiceItem {
    id: string;
    title: string;
    icon: JSX.Element;
}

/**************************************
 * Step 02 - Component
 **************************************/
function Index() {
    const count = 7
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(count);
    const [selectItem, setSelectItem] = useState<string>("");

    const dropRef = useRef<HTMLDivElement | null>(null);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isOpen && dropRef.current && !dropRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const allServices = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => ({
            id: `service-${i + 1}`,
            title: `Service ${i + 1}`,
            icon: <CiFileOn size={16} />,
        })),
        []
    );

    const prevCount = startIndex;
    const nextCount = allServices.length - endIndex;

    const services: ServiceItem[] = useMemo(
        () => allServices.slice(startIndex, endIndex),
        [startIndex, endIndex, allServices]
    );

    function preveSlide() {
        if (startIndex > 0) {
            setStartIndex(p => p - 1);
            setEndIndex(p => p - 1);
        }
    }

    function nextSlide() {
        if (endIndex < allServices.length) {
            setStartIndex(p => p + 1);
            setEndIndex(p => p + 1);
        }
    }

    function selectItemHandler(service: ServiceItem) {
        const findIndex = allServices.findIndex(item => item.id === service.id);
        const hasIndex = services.some(item => item.id === service.id);

        setSelectItem(service.id);

        if (allServices.length - findIndex < count) return;

        if (!hasIndex) {
            setStartIndex(findIndex);
            setEndIndex(findIndex + count);
        }
    }

    return (
        <div className="flex items-center justify-between w-full bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300 relative">

            {/* Left Controls */}
            <div className="flex items-center space-x-0.5">
                <Button
                    disabled={!prevCount}
                    onClick={preveSlide}
                    variant="text"
                    size="sm"
                    aria-label="Previous item"
                    leftIcon={<MdKeyboardArrowLeft />}
                    className="text-gray-700 dark:hover:bg-gray-900 hover:bg-gray-300 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
                <Text className={`${prevCount ? "opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"} text-xs bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
                    {prevCount}
                </Text>
            </div>

            {/* Middle Carousel Items */}
            <div className="flex items-center w-full">
                {services.map((service) => (
                    <div key={service.id} className="px-0.5 grow">
                        <Button
                            variant={selectItem === service.id ? "filled" : "outlined"}
                            size="sm"
                            onClick={() => selectItemHandler(service)}
                            leftIcon={service.icon}
                            title={service.title}
                            className="w-full truncate text-xs text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300"
                        >
                            {service.title}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-0.5">
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(prev => !prev);
                    }}
                    variant="outlined"
                    size="xs"
                    aria-label="More options"
                    leftIcon={<CgMoreVertical />}
                    className={`${isOpen ? "pointer-events-none" : ""} text-gray-600 hover:bg-gray-900 p-2 rounded-full transition-all duration-300`}
                />
                <Text className={`${nextCount > 0 ? "opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"} text-xs bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
                    {nextCount}
                </Text>
                <Button
                    disabled={!nextCount}
                    onClick={nextSlide}
                    variant="text"
                    size="sm"
                    aria-label="Next item"
                    leftIcon={<MdKeyboardArrowRight />}
                    className="text-gray-700 dark:hover:bg-gray-900 hover:bg-gray-300 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
            </div>

            {/* Dropdown List (Outside Click Closes it) */}
            {isOpen && (
                <div ref={dropRef}>
                    <ServiceDropList
                        setStartIndex={setStartIndex}
                        setEndIndex={setEndIndex}
                        allServices={allServices}
                        services={services}
                        selectItem={selectItem}
                        setSelectItem={setSelectItem}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        onClose={() => setIsOpen(false)}
                        count={count}
                    />
                </div>
            )}
        </div>
    );
}

export default Index;
