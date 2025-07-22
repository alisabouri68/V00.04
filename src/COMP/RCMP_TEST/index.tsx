import { useMemo, useState } from 'react';
import Button from "COMP/RCMP_button_V00.04";
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";
import { CiFileOn } from "react-icons/ci";
import Text from 'COMP/RCMP_text_VAR.01_v00.04';
import ServiceDropList from "COMP/RCMP_serviceDropList_VAR.01_V00.04"
export interface ServiceItem {
    id: string;
    title: string;
    icon: JSX.Element;
}
function index() {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(6)
    const [selectItem, setSelectItem] = useState<string>("")
    const allServices = useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: `service-${i + 1}`,
            title: `Service ${i + 1}`,
            icon: <CiFileOn size={16} />,
        })),
        []
    );

    const prevCount = startIndex
    const nextCount = allServices.length - endIndex
    const services: ServiceItem[] = useMemo(() =>
        allServices.slice(startIndex, endIndex),
        [startIndex, endIndex, allServices]
    );

    function preveSlide() {
        if (startIndex > 0) {
            setEndIndex(p => p - 1);
            setStartIndex(p => p - 1);
        }
    }
    function nextSlide() {
        if (endIndex < allServices.length) {
            setEndIndex(p => p + 1);
            setStartIndex(p => p + 1);
        }
    }

    return (
        <div className="flex items-center justify-between rounded-xl shadow-md relative" >
            {/* Left Side */}
            <div className="flex items-center space-x-2 ">
                <Button
                    disabled={!prevCount ? true : false}
                    onClick={preveSlide}
                    variant="text"
                    size="sm"
                    aria-label="Previous item"
                    leftIcon={<MdKeyboardArrowLeft />}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
                {
                    <Text className={`${prevCount ? " opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"} text-xs  bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
                        {prevCount}
                    </Text>
                }
            </div>
            <div
                className="flex items-center w-full relative">


                {services && services.map((service) => (
                    <div key={service.id} className="flex-1 px-1">
                        <Button
                            variant={selectItem === service.id ? "filled" : "outlined"}
                            size="sm"
                            onClick={() => setSelectItem(service.id)}
                            leftIcon={service.icon}
                            title={service.title}
                            className={`w-full truncate text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 text-text-light-custom`}
                        >
                            {service.title}
                        </Button>
                    </div>
                ))}
            </div>
            {/* Right Side */}
            <div className="flex items-center space-x-2">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    variant="outlined"
                    size="xs"
                    aria-label="More options"
                    leftIcon={<CgMoreVertical />}
                    className="text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-all duration-300"
                />
                {
                    <Text className={`${nextCount ? " opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"} text-xs  bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
                        {nextCount}
                    </Text>
                }
                <Button
                    disabled={!nextCount ? true : false}
                    onClick={nextSlide}
                    variant="text"
                    size="sm"
                    aria-label="Next item"
                    leftIcon={<MdKeyboardArrowRight />}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
            </div>
            {isOpen &&
                <ServiceDropList allServices={allServices} services={services} selectItem={selectItem} setSelectItem={setSelectItem} startIndex={startIndex} endIndex={endIndex} />
            }
        </div>
    )
}

export default index
















// containerRef.current?.addEventListener('wheel', handleWheel, { passive: false });
// containerRef.current?.addEventListener('mousedown', handleMouseDown);
// containerRef.current?.addEventListener('mouseup', handleMouseUp);
// containerRef.current?.addEventListener('mouseleave', handleMouseUp);
// containerRef.current?.addEventListener('mousemove', handleMouseMove);























// containerRef.current?.removeEventListener('wheel', handleWheel);
// containerRef.current?.removeEventListener('mousedown', handleMouseDown);
// containerRef.current?.removeEventListener('mouseup', handleMouseUp);
// containerRef.current?.removeEventListener('mouseleave', handleMouseUp);
// containerRef.current?.addEventListener('mousemove', handleMouseMove);