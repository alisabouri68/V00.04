import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import logo from 'ASST/images/logo.png';

function Index() {
  return (
    <div className="flex items-center">
        <div className="flex items-center">
            <img src={logo} alt="Bio Mate Logo" />
            <span className="font-bold pl-2">Bio Demo</span>
        </div>
        <div className="pl-3 cursor-pointer">
            <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
    </div>
  )
}

export default memo(Index)