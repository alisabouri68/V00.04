import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from "../RCMP_progressBar_VAR.01_V00.04"
import ViewButton from "../RCMP_viewButton_VAR.01_V00.04"

function Index({ icon, bgColor }: any) {
    return (
        <div className="flex flex-row border border-gray-200 p-3 rounded-xl gap-3 items-center">
                {/* Icon circle */}
                <div className={`w-9 h-9 ${bgColor} rounded-full flex items-center justify-center`}>
                    <FontAwesomeIcon icon={icon} />
                </div>
        
                {/* Description + progress bar */}
                <div className="flex flex-col gap-1 flex-1">
                    <span className="font-bold text-md">NTT management</span>
                    <ProgressBar width="45%" />
                </div>
        
                {/* Metadata (static for now) */}
                <span className="px-9">2020/6/5</span>
                <span className="px-9">m.Khodabandelou</span>
        
                {/* View button */}
                <ViewButton />
            </div>
    );
}

export default memo(Index);
