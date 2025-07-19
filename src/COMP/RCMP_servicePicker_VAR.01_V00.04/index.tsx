import { useState, useRef, useEffect, useMemo } from 'react';
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

const ServicePicker = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const itemsPerPage = 7;
    const itemWidth = 128; // 120px width + 8px gap

    // Full list
    const services: ServiceItem[] = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => ({
            id: `service-${i + 1}`,
            title: `Service ${i + 1}`,
            icon: <CiFileOn size={16} />,
        }))
    , []);

    // These counts remain useful for the previous/next indicators
    const previousCount = currentIndex;
    const nextCount = Math.max(0, services.length - (currentIndex + itemsPerPage));

    // Navigation handlers
    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, services.length - itemsPerPage));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    // Handle wheel scroll for single-item movement
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // Prevent default page scroll

            if (e.deltaY > 0) { // Scrolling down/forward
                setCurrentIndex(prev => Math.min(prev + 1, services.length - itemsPerPage));
            } else if (e.deltaY < 0) { // Scrolling up/backward
                setCurrentIndex(prev => Math.max(0, prev - 1));
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [services.length, itemsPerPage]);

    // Handle drag scroll for single-item movement
useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDragging = false;
    let startX = 0;

    const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        startX = e.pageX;
        container.style.cursor = 'grabbing';
        container.style.userSelect = 'none';
        container.removeEventListener('wheel', handleWheel); // غیرفعال کردن اسکرول هنگام درگ
    };

    const handleMouseUp = () => {
        isDragging = false;
        container.style.cursor = 'grab';
        container.style.removeProperty('user-select');
        container.addEventListener('wheel', handleWheel, { passive: false }); // فعال‌سازی مجدد
    };

    // تعریف handleWheel خارج از useEffect برای استفاده در remove/add
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            setCurrentIndex(prev => Math.min(prev + 1, services.length - itemsPerPage));
        } else {
            setCurrentIndex(prev => Math.max(0, prev - 1));
        }
    };
    const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.pageX;
    const dragDistance = startX - currentX;

    const threshold = itemWidth / 2;

    if (dragDistance > threshold) {
        setCurrentIndex(prev => Math.min(prev + 1, services.length - itemsPerPage));
        isDragging = false;
        startX = currentX;
    } else if (dragDistance < -threshold) {
        setCurrentIndex(prev => Math.max(0, prev - 1));
        isDragging = false;
        startX = currentX;
    }
};
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);


    return () => {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);

    };

}, [services.length, itemsPerPage, itemWidth]);

    return (
        <div className="flex items-center justify-between rounded-xl bg-white/70 backdrop-blur p-3 shadow-md">
            {/* Left Side */}
            <div className="flex items-center space-x-2">
                <Button
                    variant="text"
                    size="sm"
                    aria-label="Previous item"
                    disabled={currentIndex === 0}
                    onClick={handlePrev}
                    leftIcon={<MdKeyboardArrowLeft />}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
                {previousCount > 0 && (
                    <Text className="text-xs text-white bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                        {previousCount}
                    </Text>
                )}
            </div>

            {/* Scrollable Items */}
            <div
                ref={scrollContainerRef}
                className="flex flex-1 mx-2 overflow-x-hidden cursor-grab"
                style={{ scrollBehavior: 'smooth' }}
            >
                {/* The transform property is applied here to slide the items */}
                <div className="flex space-x-2 px-1" style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}>
                    {services.map((service, i) => ( // Render all services
                        <div key={service.id} className="flex-shrink-0" style={{ width: '120px' }}>
                            <Button
                               onClick={() => setCurrentIndex(i)} // 👈 انتخاب آیتم با کلیک
    variant={i === currentIndex ? 'filled' : 'outlined'}
    size="sm"
    aria-current={i === currentIndex ? 'true' : 'false'}
    leftIcon={service.icon}
    title={service.title}
    className={`w-[120px] truncate text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300
        ${i === currentIndex
            ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow'
            : 'border-gray-300 text-gray-700 hover:border-gray-500'}`}
>
                                {service.title}
                            </Button>
                        </div>
                    ))}
                </div>
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
                {nextCount > 0 && (
                    <Text className="text-xs text-white bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                        {nextCount}
                    </Text>
                )}
                <Button
                    variant="text"
                    size="sm"
                    aria-label="Next item"
                    disabled={currentIndex + itemsPerPage >= services.length}
                    onClick={handleNext}
                    leftIcon={<MdKeyboardArrowRight />}
                    className="text-gray-700 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
                />
            </div>
        </div>
    );
};

export default ServicePicker;