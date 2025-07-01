import React, { memo } from 'react';

function Index({
    avatarSrc,
    name,
    location,
}: {
    avatarSrc: string;
    name: string;
    location: string;
}) {
    return (
        <div className="flex cursor-pointer items-center">
            <img src={avatarSrc} alt="User avatar" className="h-8 w-8 rounded-full" />
            <div className="flex flex-col pl-2">
                <span className="font-bold text-gray-600">{name}</span>
                <span className="text-sm text-gray-400">{location}</span>
            </div>
        </div>
    );
}

export default memo(Index);
