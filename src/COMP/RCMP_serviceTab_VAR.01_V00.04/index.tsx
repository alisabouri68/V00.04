import  { memo } from 'react';

function Index({
    service,
    isActive,
    onClick,
}: {
    service: any;
    isActive: boolean;
    onClick: () => void;
}) {
    const className = `flex items-center w-fit px-5 rounded-md p-1 cursor-pointer ${
        isActive ? 'bg-[#78C4D6] text-white' : 'bg-gray-100 text-black'
    }`;

    return (
        <div className={className} onClick={onClick}>
            <span>{service.serviceName}</span>
        </div>
    );
}

export default memo(Index);
