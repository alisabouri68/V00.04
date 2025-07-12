import React, { memo } from 'react';

function Index({
    service,
    isActive,
    onClick,
}: {
    service: any;
    isActive: boolean;
    onClick: () => void;
}) {
    const className = `flex items-center w-fit px-5 rounded-lg p-1 cursor-pointer ${
        isActive ? 'bg-sky-600 text-white' : 'bg-gray-100 text-black'
    }`;

    return (
        <div className={className} onClick={onClick}>
            <span>{service.serviceName}</span>
        </div>
    );
}

export default memo(Index);
