import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Index() {
    return (
        <div className="border border-blue-300 rounded-lg py-1 px-2 hover:bg-blue-50 transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faEye} />
            <span className="pl-1">View</span>
        </div>
    );
}

export default memo(Index);
