import React, { memo } from 'react';

// Assets
import logoDash from 'ASST/images/logo-dash.png';

function Index() {
    return (
        <div className="flex flex-col items-center py-6">
            <img src={logoDash} alt="Dashboard Logo" className="w-12 h-12" />
            <span className="font-bold text-sm mt-3">RAAD HL</span>
            <div className="w-11/12 h-0.5 bg-gray-200 rounded-full mt-2" />
        </div>
    );
}

export default memo(Index);
