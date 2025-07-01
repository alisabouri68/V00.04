import React, { memo } from 'react';

function Index({ width }: any) {
    return (
        <div className="w-full h-2 mb-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full" style={{ width }} />
        </div>
    );
}

export default memo(Index);
