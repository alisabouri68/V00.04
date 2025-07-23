/******************************************
Component serviceDropList

Last Update:    2025.07.12
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
import Text from "COMP/RCMP_text_VAR.01_v00.04"

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
    setEndIndex
}: Props) {

    /**************************************
     * Step 06.A - Static assignments (Type S)
     **************************************/
    const firstMiddleItemRef = useRef<HTMLDivElement | null>(null)         // Ref to scroll selected item into view
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

    /**************************************
     * Step 06.C - Handlers
     **************************************/
    function selectItemHandler(service: ServiceItem) {
        const findIndex = allServices.findIndex(item => item.id === service.id)         // Find index in all items
        const hasIndex = services.some(item => item.id === service.id)                 // Check if already in middle group
        setSelectItem(service.id)                                                      // Update selected item

        // If not already in visible middle items, adjust window
        if (allServices.length - findIndex < 6 && !hasIndex) {
            setStartIndex(allServices.length - 6)
            setEndIndex(allServices.length)
        } else if (!hasIndex) {
            setStartIndex(findIndex)
            setEndIndex(findIndex + 6)
        }
    }

    /**************************************
     * Step 06.D - UI Rendering Helpers
     **************************************/
    const renderServiceItem = (item: ServiceItem, ref?: React.Ref<HTMLDivElement>) => (
        <div
            key={item.id}
            ref={ref}
            onClick={() => selectItemHandler(item)}
            className={`flex items-center gap-2 px-3 py-2 border-l-4 border-transparent text-text-light-custom cursor-pointer transition duration-200
                ${selectItem === item.id
                    ? "bg-primary/10 border-l-primary text-primary font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-black-custom"
                }`}
        >
            <Text size="xs" as="span">{item.icon}</Text>
            <Text size="xs" as="span">{item.title}</Text>
        </div>
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
            className="absolute top-10 right-20 w-56 max-h-64 shadow-sm overflow-y-auto text-sm custom-card custom-scrollbar p-2 rounded-md border border-gray-300 dark:border-gray-700"
        >
            <div className="flex flex-col w-full h-full overflow-hidden custom-card">
                {/* Top (hidden) services */}
                {topItems.map(item => renderServiceItem(item))}

                {/* Middle (visible) services */}
                <div className="border-y border-primary/50 bg-primary/7 shadow-sm rounded-md border border-gray-300">
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
