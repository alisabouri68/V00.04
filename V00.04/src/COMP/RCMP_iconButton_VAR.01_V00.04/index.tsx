import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Index({ icon, text }: { icon: any; text: string }) {
    return (
        <div className="flex items-center">
            <FontAwesomeIcon className="w-6 h-6 text-gray-600 mr-2" icon={icon} />
            <span className="font-bold text-sm">{text}</span>
        </div>
    );
}

export default memo(Index);
