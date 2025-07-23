/******************************************
Component Templates

Last Update:    2025.07.23
By:             SMRT.00

Description:    Service button carousel with scrollable navigation
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_serviceCarousel
Title:          Service Carousel Component
Version:        V00.04
VAR:            01

Last Update:    D2025.07.23
Owner:          SMRT.00

Description:    Horizontal scrollable carousel of services with next/prev
                controls, dropdown expansion, and item selection.

------------------------------------------------------------*/

/**************************************
 * Step 01 - import dependencies - Kernels
 **************************************/
import { useMemo, useState } from 'react';

/**************************************
 * Step 02 - import dependencies - Widgets
 **************************************/
import Button from "COMP/RCMP_button_V00.04";
import Text from 'COMP/RCMP_text_VAR.01_v00.04';
import ServiceDropList from "COMP/RCMP_serviceDropList_VAR.01_V00.04";

/**************************************
 * Step 03 - import dependencies - Icons
 **************************************/
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";
import { CiFileOn } from "react-icons/ci";

/**************************************
 * Step 04 - define static types
 **************************************/
export interface ServiceItem {
    id: string;
    title: string;
    icon: JSX.Element;
}

/**************************************
 * Step 05 - define Component
 **************************************/
function Index() {

    /**************************************
     * Step 06.A - Define States
     **************************************/
    const [isOpen, setIsOpen] = useState<boolean>(true);                     // Toggle dropdown
    const [startIndex, setStartIndex] = useState<number>(0);                // Start index of visible carousel
    const [endIndex, setEndIndex] = useState<number>(6);                    // End index of visible carousel
    const [selectItem, setSelectItem] = useState<string>("");              // Currently selected item ID

    /**************************************
     * Step 06.B - Generate All Services (Type S)
     **************************************/
    const allServices = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => ({
            id: `service-${i + 1}`,
            title: `Service ${i + 1}`,
            icon: <CiFileOn size={16} />,
        })),
        []
    );

    /**************************************
     * Step 06.C - Derived Computed Values (useMemo)
     **************************************/
    const prevCount = startIndex;
    const nextCount = allServices.length - endIndex;

    const services: ServiceItem[] = useMemo(
        () => allServices.slice(startIndex, endIndex),
        [startIndex, endIndex, allServices]
    );

    /**************************************
     * Step 06.D - Navigation Handlers
     **************************************/
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

    /**************************************
     * Step 06.E - Select Item Logic
     **************************************/
    function selectItemHandler(service: ServiceItem) {
        const findIndex = allServices.findIndex(item => item.id === service.id);
        const hasIndex = services.some(item => item.id === service.id);

        setSelectItem(service.id);

        // If not in visible group, adjust window
        if (allServices.length - findIndex < 6) {
            return;
        } else if (!hasIndex) {
            setStartIndex(findIndex);
            setEndIndex(findIndex + 6);
        }
    }

    /**************************************
     * Step 06.F - Render Component
     **************************************/
    return (
        <div className="flex items-center justify-between rounded-xl shadow-md relative">
            {/* Left Controls */}
            <div className="flex items-center space-x-2">
                <Button
                    disabled={!prevCount}
                    onClick={preveSlide}
                    variant="text"
                    size="sm"
                    aria-label="Previous item"
                    leftIcon={<MdKeyboardArrowLeft />}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
                <Text
                    className={`${prevCount ? "opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"
                        } text-xs bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
                    {prevCount}
                </Text>
            </div>

            {/* Middle Items */}
            <div className="flex items-center w-full relative">
                {services.map((service) => (
                    <div key={service.id} className="flex-1 px-1">
                        <Button
                            variant={selectItem === service.id ? "filled" : "outlined"}
                            size="sm"
                            onClick={() => selectItemHandler(service)}
                            leftIcon={service.icon}
                            title={service.title}
                            className="w-full truncate text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 text-text-light-custom"
                        >
                            {service.title}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    variant="outlined"
                    size="xs"
                    aria-label="More options"
                    leftIcon={<CgMoreVertical />}
                    className="text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-all duration-300"
                />
                <Text
                    className={`${nextCount > 0 ? "opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"
                        } text-xs bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
                    {nextCount}
                </Text>
                <Button
                    disabled={!nextCount}
                    onClick={nextSlide}
                    variant="text"
                    size="sm"
                    aria-label="Next item"
                    leftIcon={<MdKeyboardArrowRight />}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
            </div>

            {/* Dropdown List */}
            {isOpen && (
                <ServiceDropList
                    setStartIndex={setStartIndex}
                    setEndIndex={setEndIndex}
                    allServices={allServices}
                    services={services}
                    selectItem={selectItem}
                    setSelectItem={setSelectItem}
                    startIndex={startIndex}
                    endIndex={endIndex}
                />
            )}
        </div>
    );
}

/**************************************
 * Step 07 - Export Component
 **************************************/
export default Index;
