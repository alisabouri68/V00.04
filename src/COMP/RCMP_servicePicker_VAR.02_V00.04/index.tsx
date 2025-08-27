/******************************************
Component Templates

Last Update:    2025.07.26
By:             SMRT.00

Description:    Service button carousel with scrollable navigation
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_serviceCarousel
Title:          Service Carousel Component
Version:        V00.04
VAR:            02

Last Update:    D2025.07.26
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
import Text from 'WIDG/RWID_text_V00.04';
import ServiceDropList from "COMP/RCMP_serviceDropList_VAR.01_V00.04";

/**************************************
 * Step 03 - import dependencies - Icons
**************************************/
import { CiSquarePlus } from "react-icons/ci";
import { HiOutlineCube } from "react-icons/hi2";
import { BsDownload } from "react-icons/bs";
import { IoSaveOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";
import { CiFileOn } from "react-icons/ci";
import { JSX } from 'react/jsx-runtime';
import BOX_modal from 'BOX/BOX_modal';
import { useDispatch } from 'react-redux';
import { openModal } from 'RDUX/modal/modalSlice';

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
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(
            openModal({
                title: "",
                content: <div>xxxxxxx</div>,
            })
        );
    };

    const count = 3
    const [isOpen, setIsOpen] = useState<boolean>(false);                     // Toggle dropdown
    const [startIndex, setStartIndex] = useState<number>(0);                // Start index of visible carousel
    const [endIndex, setEndIndex] = useState<number>(count);                    // End index of visible carousel
    const [selectItem, setSelectItem] = useState<string>("");              // Currently selected item ID
    /**************************************
     * Step 06.B - Generate All Services (Type S)
     **************************************/
    const allServices = useMemo(() =>
        Array.from({ length: 3 }, (_, i) => ({
            id: `Content-${i + 1}`,
            title: `Content ${i + 1}`,
            icon: <CiFileOn size={16} />
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
        if (allServices.length - findIndex < count) {
            return;
        } else if (!hasIndex) {
            setStartIndex(findIndex);
            setEndIndex(findIndex + count);
        }
    }

    /**************************************
     * Step 06.F - Render Component
     **************************************/
    return (
        <div className='flex items-center'>
            <div className="flex items-center w-80%] bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 relative ">
                {/* Left Controls */}
                <div className="flex items-center">
                    <Button
                        disabled={!prevCount}
                        onClick={preveSlide}
                        variant="text"
                        size="sm"
                        aria-label="Previous item"
                        leftIcon={<MdKeyboardArrowLeft />}
                        className="text-stone-700 hover:bg-stone-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
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
                        <div key={service.id} className="grow px-0.5">
                            <Button
                                size='sm'
                                variant={selectItem === service.id ? "filled" : "outlined"}
                                onClick={() => selectItemHandler(service)}
                                leftIcon={service.icon}
                                title={service.title}
                                className="w-full text-xs truncate text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 text-stone-500 dark:text-stone-400"
                            >
                                {service.title}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-1">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(prev => !prev);
                        }}
                        variant="outlined"
                        size="xs"
                        aria-label="More options"
                        leftIcon={<CgMoreVertical />}
                        className={`${isOpen ? "pointer-events-none" : ""} text-stone-600 hover:bg-stone-200 p-2 rounded-full transition-all duration-300`}
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
                        className="text-stone-700 hover:bg-stone-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
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
                        onClose={() => setIsOpen(false)}
                        count={count}
                    />
                )}
            </div>
            <div className='flex items-center gap-1  w-[20%]  '>
                <Button leftIcon={<CiSquarePlus />} variant='text' onClick={handleOpenModal} />
                <Button leftIcon={<HiOutlineCube />} variant='text' />
                <Button leftIcon={<BsDownload />} variant='text' />
                <Button leftIcon={<IoSaveOutline />} variant='text' />
            </div>
            <BOX_modal />
        </div>

    );
}

/**************************************
 * Step 07 - Export Component
 **************************************/
export default Index;
