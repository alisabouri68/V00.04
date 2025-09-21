/******************************************
Component serviceDropList

Last Update:    2025.08.09
By:             APPS.68

Description:    This component renders a scrollable dropdown of services,
                with a highlighted middle section and auto-scroll behavior.
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_serviceDropList_VAR.01_V00.04
Title:          Service Drop List - React Version
Version:        V00.04
VAR:            01 (Initial Stable Release)

Last Update:    D2025.07.12
Owner:          APPS.68

Description:    This dropdown component lists all service items with a scrollable layout.
                The middle section is highlighted and auto-scrolled into view when selected.

------------------------------------------------------------*/

/**************************************
 * Step 01 - import dependencies - Kernels
 **************************************/
import { useEffect, useRef } from "react"
import { ServiceItem } from "COMP/RCMP_servicePicker_VAR.01_V00.04"
import Text from "../RCMP_biotext_V0004"
import { Link } from "react-router-dom"

/**************************************
 * Step 02 - import dependencies - Widgets
 **************************************/
// [No external widgets used directly in this component]

/**************************************
 * Step 03 - import dependencies - Co-Actors
 **************************************/
// [No co-actor dependencies required here]

/**************************************
 * Step 04 - define static properties
 **************************************/
// [No static constants defined globally in this component]

/**************************************
 * Step 05 - define property interface
 **************************************/
type Props = {
    allServices: ServiceItem[]              // Full list of services available
    selectItem: string                      // Currently selected service ID
    setSelectItem: (id: string) => void     // State setter for selected service
    startIndex: number                      // Index of first item in the middle section
    endIndex: number                        // Index of last item in the middle section
    services: ServiceItem[]                 // Services currently in the middle section
    setStartIndex: (index: number) => void  // Setter for startIndex
    setEndIndex: (index: number) => void    // Setter for endIndex
    onClose: () => void
    count: number
}

/**************************************
 * Step 06 - define Functional Component
 **************************************/
function Index({
    allServices,
    selectItem,
    setSelectItem,
    startIndex,
    endIndex,
    services,
    setStartIndex,
    setEndIndex,
    onClose,
    count
}: Props) {

    /**************************************
     * Step 06.A - Static assignments (Type S)
     **************************************/
    const firstMiddleItemRef = useRef<HTMLAnchorElement | null>(null)         // Ref to scroll selected item into view
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)         // Ref for future scroll handling

    /**************************************
     * Step 06.B - Side Effects
     * Auto-scroll to first item in middle section on selectItem change
     **************************************/
    useEffect(() => {
        if (firstMiddleItemRef.current) {
            firstMiddleItemRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }, [selectItem])
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                scrollContainerRef.current &&
                !scrollContainerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    /**************************************
     * Step 06.C - Handlers
     **************************************/
    function selectItemHandler(service: ServiceItem) {
        const findIndex = allServices.findIndex(item => item.id === service.id)         // Find index in all items
        const hasIndex = services.some(item => item.id === service.id)                 // Check if already in middle group
        setSelectItem(service.id)                                                      // Update selected item

        // If not already in visible middle items, adjust window
        if (allServices.length - findIndex < count && !hasIndex) {
            setStartIndex(allServices.length - count)
            setEndIndex(allServices.length)
        } else if (!hasIndex) {
            setStartIndex(findIndex)
            setEndIndex(findIndex + count)
        }
    }

    /**************************************
     * Step 06.D - UI Rendering Helpers
     **************************************/
    const renderServiceItem = (item: ServiceItem, ref?: React.Ref<HTMLAnchorElement>) => (
        <Link
            key={item.id}
            to={item.id}
            ref={ref}
            onClick={() => selectItemHandler(item)}
            className={`flex items-center gap-2 px-3 py-2 border-l-4 border-transparent duration-300  bg-light text-dark cursor-pointer  
                ${selectItem === item.id
                    ? "bg-light text-dark border-l-primary text-primary font-semibold"
                    : "hover:bg-secendory bg-light text-dark"
                }`}
        >
            <Text size="xs" as="span">{item.icon}</Text>
            <Text size="xs" as="span">{item.title}</Text>
        </Link>
    )

    // Top and bottom non-selected items
    const topItems = allServices.slice(0, startIndex)
    const bottomItems = allServices.slice(endIndex, allServices.length)

    /**************************************
     * Step 06.E - Component JSX
     **************************************/
    return (
        <div
            ref={scrollContainerRef}
            className="absolute top-10 right-20 z-50 w-56 max-h-72  overflow-y-auto text-sm shadow-md bg-light text-dark custom-scrollbar p-2 rounded-md border border-stone-300 dark:border-stone-700"
        >
            <div className="flex flex-col w-full h-full bg-white dark:bg-stone-950 text-stone-800 dark:text-stone-300">
                {/* Top (hidden) services */}
                {topItems.map(item => renderServiceItem(item))}

                {/* Middle (visible) services */}
                <div className="bg-primary/7 shadow-md rounded-md border border-stone-300 dark:border-stone-700 overflow-hidden">
                    {services.map((item, index) => {
                        const isFirst = index === 0
                        return renderServiceItem(item, isFirst ? firstMiddleItemRef : undefined)
                    })}
                </div>

                {/* Bottom (hidden) services */}
                {bottomItems.map(item => renderServiceItem(item))}
            </div>
        </div>
    )
}

/**************************************
 * Step 07 - Export Component
 **************************************/
export default Index
