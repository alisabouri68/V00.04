import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faFileCirclePlus, faMaximize } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { HambergerMenu } from 'iconsax-react';
import Auxiliary from './BOX_auxiliary';
import Jinni from './BOX_Jinni';
import lodash from 'lodash';
import AbsMan from 'ACTR/RACT_absMan';
import { add } from 'RDUX/env/SpkSlice';
import UserAvatar from 'COMP/RCMP_userAvatar_VAR.01_V00.04';
import IconButton from 'COMP/RCMP_iconButton_VAR.01_V00.04';
import ServiceTab from 'COMP/RCMP_serviceTab_VAR.01_V00.04';
import SheetItem from 'COMP/RCMP_sheetItem_VAR.01_V00.04';

/**
 * Main Action component that serves as the navigation and layout container
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to render in content area
 */
function Action({ children }: any) {
    // Get services and active selections from Redux store
    const { services, activeService, activeSheet } = AbsMan.useAppSelector((state) => state.spk);
    const dispatch = AbsMan.useAppDispatch();

    // Navigation hook for routing
    const navigate = useNavigate();

    // Local state for menu visibility and auxiliary component
    const [showMenu, setShowMenu] = useState(false);
    const [Component, setComponent] = useState<any>(null);

    /**
     * Memoized sorted services array to prevent unnecessary re-sorting
     * Sorts services by their order property
     */
    const sortedServices = useMemo(
        () => [...(services || [])].sort((a, b) => a.order - b.order),
        [services]
    );

    /**
     * Memoized grouping of sheets by their group property
     * Organizes sheets into groups with 'Default' as fallback
     * Returns an object with group names as keys and sheet arrays as values
     */
    const groups = useMemo(() => {
        const list: Record<string, any[]> = { Default: [] };

        [...(activeService?.sheets || [])]
            .sort((a, b) => a.groupOrder - b.groupOrder)
            .forEach((sheet) => {
                const group = sheet?.group || 'Default';
                list[group] = [...(list[group] || []), sheet];
            });

        return list;
    }, [activeService?.sheets]);

    /**
     * Handles service tab clicks
     * Navigates to the first sheet of the selected service
     * Updates Redux store with new active service and sheet
     * @param {Object} service - The service object that was clicked
     */
    const handleServiceClick = useCallback(
        (service: any) => {
            navigate(`/view/bioDemo/monoDash/${service.slug}/${service.sheets[0]?.slug}`);
            dispatch(add({ activeService: service, activeSheet: service.sheets[0] }));
            setShowMenu(false);
        },
        [dispatch, navigate]
    );

    /**
     * Handles sheet item clicks
     * Navigates to the selected sheet
     * Updates Redux store with new active sheet
     * @param {Object} sheet - The sheet object that was clicked
     */
    const handleSheetClick = useCallback(
        (sheet: any) => {
            navigate(`/view/bioDemo/monoDash/${activeService?.slug}/${sheet.slug}`);
            dispatch(add({ activeSheet: sheet }));
            setShowMenu(false);
        },
        [activeService?.slug, dispatch, navigate]
    );

    /**
     * Effect hook to handle auxiliary component changes
     * Clones and sets the auxiliary component when active sheet changes
     */
    useEffect(() => {
        if (activeSheet?.auxiliary) {
            setComponent(lodash.cloneDeep(activeSheet?.auxiliary));
        } else setComponent(null);
    }, [activeSheet]);

    return (
        <>
            {/* Main content container */}
            <div className="w-9/12 flex flex-col gap-3 h-screen">
                <Jinni />
                
                {/* Primary white content panel */}
                <div className="w-full bg-white rounded-xl shadow-md p-6 h-full">
                    {/* Header Section with logo, user avatars and action buttons */}
                    <div className="flex justify-between">
                        {/* App logo and name */}
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon className="w-4 h-4 text-gray-600" icon={faGear} />
                            <span className="font-bold">TRIPOD</span>
                        </div>

                        {/* User avatars and action buttons */}
                        <div className="flex items-center">
                            <div className="flex gap-2">
                                <UserAvatar bgColor="bg-red-100" initials="MK" />
                                <UserAvatar bgColor="bg-blue-100" initials="AL" />
                                <UserAvatar bgColor="bg-orange-100" initials="BU" />
                                <UserAvatar bgColor="bg-lime-100" initials="SA" />
                            </div>

                            <div className="w-1 h-full bg-gray-200 mx-6 rounded-full" />

                            <div className="flex gap-5">
                                <IconButton icon={faFileCirclePlus} text="New Bundle" />
                                <IconButton icon={faMaximize} text="Expansion" />
                            </div>
                        </div>
                    </div>

                    {/* Services navigation tabs */}
                    <div className="flex flex-row flex-wrap bg-blue-200 p-3 rounded-lg my-3 gap-2 w-full">
                        {sortedServices.map((service) => (
                            <ServiceTab
                                key={service.slug}
                                service={service}
                                isActive={service.serviceName === activeService?.serviceName}
                                onClick={() => handleServiceClick(service)}
                            />
                        ))}
                    </div>

                    <div className="w-full h-1 bg-slate-100 rounded-full" />

                    {/* Current sheet display and menu toggle */}
                    <div className="flex items-center mt-3">
                        <button onClick={() => setShowMenu(!showMenu)}>
                            <HambergerMenu className="w-6 h-6 mr-1" />
                        </button>
                        <span className="text-sm font-bold">{activeSheet?.sheetName}</span>
                    </div>

                    {/* Sheet dropdown menu with grouped items */}
                    {showMenu && (
                        <div className="absolute border bg-white py-2 px-1 rounded-lg w-48 max-h-64 overflow-auto z-[9999]">
                            <div className="w-full bg-white rounded-xl shadow-md flex flex-col gap-2">
                                {Object.keys(groups).map((group) => (
                                    <div key={group}>
                                        {/* Group header */}
                                        <span className="px-2 font-bold">{group}</span>
                                        
                                        {/* Sheets list for this group */}
                                        <div className="flex flex-col gap-1 mt-1 pl-4">
                                            {groups[group]
                                                .sort((a: any, b: any) => a.order - b.order)
                                                .map((sheet: any) => (
                                                    <SheetItem
                                                        key={sheet.slug}
                                                        sheet={sheet}
                                                        isActive={activeSheet?.slug === sheet.slug}
                                                        onClick={() => handleSheetClick(sheet)}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main content area for child components */}
                    {children}
                </div>
            </div>

            {/* Auxiliary component panel (rendered conditionally) */}
            {Component && (
                <Auxiliary>
                    <Component />
                </Auxiliary>
            )}
        </>
    );
}

export default Action;