/******************************************
 * Component:      Service Button Carousel
 * Last Update:    2025.08.09
 * By:             APPS.68
 *
 * Description:
 *   A horizontal scrollable carousel of service buttons with:
 *     - Left/Right navigation controls
 *     - Dropdown list for quick selection
 *     - Auto-closing dropdown on outside click
 *     - Responsive item count based on screen width
 ******************************************/

/**************************************
 * Step 01 - Import core dependencies
 **************************************/
import { useEffect, useMemo, useRef, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

/**************************************
 * Step 02 - Import component dependencies
 **************************************/
import Button from "COMP/RCMP_button_V00.04";
import Text from 'WIDG/RWID_text_v00.04';
import ServiceDropList from "COMP/RCMP_serviceDropList_VAR.01_V00.04";

/**************************************
 * Step 03 - Import icon dependencies
 **************************************/
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";
import { CiFileOn } from "react-icons/ci";

/**************************************
 * Step 04 - Define static types
 **************************************/
export interface ServiceItem {
    id: string;       // Unique service identifier
    title: string;    // Service display name
    icon: JSX.Element;// Service icon element
}

/**************************************
 * Step 05 - Component definition
 **************************************/
function Index() {
    /******************************************
     * Local state
     ******************************************/
    const [count, setCount] = useState<number>(3);        // Max visible items at once
    const [isOpen, setIsOpen] = useState<boolean>(false); // Dropdown open/close state
    const [startIndex, setStartIndex] = useState<number>(0); // First visible item index
    const [endIndex, setEndIndex] = useState<number>(count); // Last visible item index
    const [selectItem, setSelectItem] = useState<string>(""); // Selected service ID

    const dropRef = useRef<HTMLDivElement | null>(null); // Ref for dropdown to detect outside clicks

    /******************************************
     * Effect: Handle responsive resizing
     * - Adjusts visible item count based on screen width
     ******************************************/
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            const width = window.innerWidth;
            let newCount = 3;

            // Adjust count for different breakpoints
            if (width <= 768) {
                newCount = 3;
            } else if (width > 768) {
                newCount = 5;
            } else if (width > 1300) {
                newCount = 7;
            }

            setCount(prevCount => {
                if (prevCount !== newCount) {
                    // Reset carousel to start on resize change
                    setStartIndex(0);
                    setEndIndex(newCount);
                }
                return newCount;
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /******************************************
     * Effect: Handle outside click for dropdown
     * - Closes dropdown when clicking outside its container
     ******************************************/
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

    /******************************************
     * Memoized: All available services
     * - Here it's mocked with 10 items for demo purposes
     ******************************************/
    const allServices = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => ({
            id: `service-${i + 1}`,
            title: `Service ${i + 1}`,
            icon: <CiFileOn size={16} />,
        })),
        []
    );

    /******************************************
     * Derived values for navigation counters
     ******************************************/
    const prevCount = startIndex;                        // Number of items available to scroll left
    const nextCount = allServices.length - endIndex;     // Number of items available to scroll right

    /******************************************
     * Memoized: Slice of services currently visible in carousel
     ******************************************/
    const services: ServiceItem[] = useMemo(
        () => allServices.slice(startIndex, endIndex),
        [startIndex, endIndex, allServices]
    );

    /******************************************
     * Handlers: Carousel navigation
     ******************************************/
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

    /******************************************
     * Handler: Select a service
     * - Updates selected service
     * - Scrolls carousel if selected service is outside view
     ******************************************/
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

    /******************************************
     * Render: Component layout
     ******************************************/
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
                <Text className={`${prevCount ? "opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"} text-xs bg-primary rounded-full w-4 h-4 flex items-center justify-center shadow-sm`}>
                    {prevCount}
                </Text>
            </div>

            {/* Middle Carousel Items */}
            <div className="flex items-center w-full ms-1">
                {services.map((service) => (
                    <div key={service.id} className="px-0.5 grow">
                        <Button
                            to={service.id}
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
            <div className="flex items-center space-x-2">
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(prev => !prev);
                    }}
                    variant="outlined"
                    size="md"
                    aria-label="More options"
                    leftIcon={<CgMoreVertical className='text-xs' />}
                    className={`${isOpen ? "pointer-events-none" : ""} text-gray-700 dark:hover:bg-gray-900 hover:bg-gray-300 p-2 rounded-full transition-all duration-300`}
                />
                <Text className={`${nextCount > 0 ? "opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"} text-xs ms-2 bg-primary rounded-full w-4 h-4 flex items-center justify-center shadow-sm`}>
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

            {/* Dropdown List (Closes on outside click) */}
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
