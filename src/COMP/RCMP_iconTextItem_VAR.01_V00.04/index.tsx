import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function Index({ icon, text }: { icon: any; text: string }) {
    return (
        <div className="cursor-pointer flex items-center gap-1">
            <FontAwesomeIcon icon={icon} />
            <span className="px-2">{text}</span>
            <FontAwesomeIcon icon={faAngleDown} />
        </div>
    );
}

export default memo(Index);
