import { useEffect, useMemo, useRef, useState } from 'react';
import Button from "COMP/RCMP_button_V00.04";
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";
import { CiFileOn } from "react-icons/ci";
import Text from 'COMP/RCMP_text_VAR.01_v00.04';
interface ServiceItem {
    id: string;
    title: string;
    icon: JSX.Element;
}
function index() {

    const services: ServiceItem[] = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => ({
            id: `service-${i + 1}`,
            title: `Service ${i + 1}`,
            icon: <CiFileOn size={16} />,
        }))
        , []);
    const [width, setWidth] = useState<number>(0)
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const previousCount = currentIndex;
    const nextCount = services.length - currentIndex - 1;
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        let isDragging = false;
        let startX = 0;
        const updateWidth = () => {

            if (containerRef.current) {
                const newWidth = containerRef.current.clientWidth;
                setWidth(newWidth);
            }
        };
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const scrollAmount = width / 6 + Math.abs(e.deltaY);
            if (containerRef.current) {
                containerRef.current.scrollLeft += e.deltaY > 0 ? scrollAmount : -scrollAmount;
            }
        };
        const handleMouseDown = (e: MouseEvent) => {
            if (!containerRef.current) return;

            isDragging = true;
            startX = e.pageX;

            const container = containerRef.current;
            container.style.cursor = 'grabbing';
            container.style.userSelect = 'none';
            container.removeEventListener('wheel', handleWheel);
        };

        const handleMouseUp = () => {
            if (!containerRef.current) return;
            isDragging = false;
            const container = containerRef.current;
            container.style.cursor = 'grab';
            container.style.removeProperty('user-select');
            container.addEventListener('wheel', handleWheel, { passive: false });
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.pageX;
            const dragDistance = startX - currentX;

            const threshold = (width / 6) / 2;

            if (dragDistance > threshold) {
                setCurrentIndex(prev => Math.min(prev + 1, services.length - 0));
                isDragging = false;
                startX = currentX;
            } else if (dragDistance < -threshold) {
                setCurrentIndex(prev => Math.max(0, prev - 1));
                isDragging = false;
                startX = currentX;
            }
        };
        updateWidth();
        containerRef.current?.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', updateWidth);
        containerRef.current?.addEventListener('mousedown', handleMouseDown);
        containerRef.current?.addEventListener('mouseup', handleMouseUp);
        containerRef.current?.addEventListener('mouseleave', handleMouseUp);
        containerRef.current?.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', updateWidth);
            containerRef.current?.removeEventListener('wheel', handleWheel);
            containerRef.current?.removeEventListener('mousedown', handleMouseDown);
            containerRef.current?.removeEventListener('mouseup', handleMouseUp);
            containerRef.current?.removeEventListener('mouseleave', handleMouseUp);
            containerRef.current?.addEventListener('mousemove', handleMouseMove);


        }
    }, []);
    return (
        <div className="flex items-center justify-between rounded-xl shadow-md" >
            {/* Left Side */}
            <div className="inline-flex items-center space-x-2 ">
                <Button
                    variant="text"
                    size="sm"
                    aria-label="Previous item"
                    // disabled={}
                    onClick={() => {
                        if (containerRef.current) {
                            containerRef.current.scrollLeft -= (width / 6);
                        }
                    }}
                    leftIcon={<MdKeyboardArrowLeft />}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
                {previousCount > 0 && (
                    <Text className="text-xs text-white bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                        {previousCount}
                    </Text>
                )}
            </div>
            <div ref={containerRef}
                className="inline-flex items-center  w-full overflow-x-auto hide-scrollbar relative scroll-smooth ">
                {/* {/* <div className="pointer-events-none absolute top-0 bottom-0 left-0 h-full  */}
                {/* bg-gradient-to-r from-white to-transparent dark:from-stone-900 z-10 w-10"></div> */}

                {/* <div className="pointer-events-none absolute top-0 bottom-0 right-0 h-full  */}
                {/* bg-gradient-to-l from-white to-transparent dark:from-stone-900 z-10 w-10"></div> */}

                {services && services.map((service, i) => (
                    <div key={service.id} className="flex-shrink-0 px-1" style={{ width: width / 6 + 'px', flexShrink: 0 }}>
                        <Button
                            variant={currentIndex === i ? "filled" : 'outlined'}
                            onClick={() => setCurrentIndex(i)}
                            size="sm"
                            leftIcon={service.icon}
                            title={service.title}
                            className={`w-full truncate text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300`}
                        >
                            {service.title}
                        </Button>
                    </div>
                ))}
            </div>
            {/* Right Side */}
            <div className="flex items-center space-x-2">
                <Button
                    variant="outlined"
                    size="xs"
                    aria-label="More options"
                    leftIcon={<CgMoreVertical />}
                    className="text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-all duration-300"
                />
                {nextCount && (
                    <span className={`${nextCount > 0 ? " opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"} text-xs  bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
                        {nextCount}
                    </span>
                )}
                <Button
                    variant="text"
                    size="sm"
                    aria-label="Next item"
                    // disabled={}
                    onClick={() => {
                        if (containerRef.current) {
                            containerRef.current.scrollLeft += (width / 6);
                        }
                    }}
                    leftIcon={<MdKeyboardArrowRight />}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
            </div>
        </div>
    )
}

export default index
