import React, { memo } from 'react';

function Index({
    sheet,
    isActive,
    onClick,
}: {
    sheet: any;
    isActive: boolean;
    onClick: () => void;
}) {
    const className = `px-2 py-1 rounded-md cursor-pointer ${
        isActive
            ? 'bg-gray-50 border-s-4 border-blue-400'
            : `${sheet?.color || 'bg-white'} border border-gray-100`
    }`;

    return (
        <div className={className} onClick={onClick}>
            <span className="text-sm">{sheet.sheetName}</span>
        </div>
    );
}

export default memo(Index);
