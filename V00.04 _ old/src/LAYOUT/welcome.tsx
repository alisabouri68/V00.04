import React, { useMemo, useCallback, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFolderMinus,
    faChartSimple,
    faWandMagicSparkles,
    faHeart,
    faSpinner,
    faCheckToSlot,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AbsMan from 'ACTR/RACT_absMan';
import { add } from 'RDUX/env/SpkSlice';
import ServiceButton from 'COMP/RCMP_serviceButton_VAR.01_V00.04';
import HistoryItem from 'COMP/RCMP_historyItem_VAR.01_V00.04';

// Static configuration for history items shown below services
const HISTORY_ITEMS = [
    { icon: faChartSimple, bgColor: 'bg-orange-200' },
    { icon: faWandMagicSparkles, bgColor: 'bg-purple-200' },
    { icon: faHeart, bgColor: 'bg-red-200' },
    { icon: faSpinner, bgColor: 'bg-green-200' },
    { icon: faCheckToSlot, bgColor: 'bg-orange-100' },
];

// Main Welcome component
const Welcome = () => {
    // Get navigation function
    const navigate = useNavigate();

    // Access service list from Redux store
    const services = AbsMan.useAppSelector((state) => state.spk.services);

    // Get dispatch function
    const dispatch = AbsMan.useAppDispatch();

    // Sort services by `order` field to control display sequence
    const sortedServices = useMemo(
        () => [...(services ?? [])].sort((a, b) => a?.order - b?.order),
        [services]
    );

    // Handle clicking on a service: navigate and update Redux
    const handleServiceClick = useCallback(
        (service: any) => {
            navigate(`/view/bioDemo/monoDash/${service.slug}/${service?.sheets?.[0]?.slug}`);
            dispatch(add({ activeService: service, activeSheet: service?.sheets?.[0] }));
        },
        [dispatch, navigate]
    );

    // Component layout
    return (
        <div className="flex flex-col items-center py-8">
            {/* Services Section */}
            <div className="w-1/2 flex flex-col items-center justify-center gap-6">
                <h1 className="font-bold text-3xl">WELCOME TO BIO-Demo</h1>
                <div className="bg-gray-300 h-1 w-full rounded-full" />
                <FontAwesomeIcon className="text-6xl" icon={faFolderMinus} />
                <h2 className="text-xl font-bold">Please select your Service</h2>
                <p className="text-md">
                    If the desired service is not in the list below, contact support.
                </p>

                {/* Render available services as buttons */}
                <div className="w-full border border-gray-200 bg-gray-200 rounded-xl">
                    <div className="p-8 gap-3 grid grid-cols-4">
                        {sortedServices.map((service) => (
                            <ServiceButton
                                key={service.slug}
                                service={service}
                                onClick={handleServiceClick}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* History Section */}
            <div className="flex flex-col justify-start w-1/2 pt-8">
                <h3 className="font-bold">Last History</h3>
                <div className="flex flex-col pt-5 gap-2">
                    {HISTORY_ITEMS.map((item, index) => (
                        <HistoryItem key={index} icon={item.icon} bgColor={item.bgColor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Memoized export of the Welcome component
export default memo(Welcome);
