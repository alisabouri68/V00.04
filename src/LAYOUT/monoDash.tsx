import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import lodash from 'lodash';
import ActionBox from 'BOX/BOX_action';
import AbsMan from 'ACTR/RACT_absMan';
import { add } from 'RDUX/env/SpkSlice';

function Main() {
    // Extract services from Redux state using abstraction manager
    const { services } = AbsMan.useAppSelector((state) => state.spk);

    // Get Redux dispatcher
    const dispatch = AbsMan.useAppDispatch();

    // Route parameters (e.g., /:serviceName/:sheetName)
    const params = useParams();

    // Access current location path (to detect route changes)
    const location = useLocation();

    // Local state to hold the active dynamic component to render
    const [Component, setComponent] = useState<any>(null);

    // Memoize logic for finding the active service and sheet based on URL params
    const { activeService, activeSheet } = useMemo(() => {
        // Find service by slug from route param
        const findActiveService = () =>
            services?.find((service) => service.slug === params.serviceName) || null;

        // Find sheet by slug or default to the first one
        const findActiveSheet = (service: any) =>
            service?.sheets?.find((sheet: any) => sheet.slug === params.sheetName) ||
            service?.sheets?.[0] ||
            null;

        const service = findActiveService();
        return {
            activeService: service,
            activeSheet: service ? findActiveSheet(service) : null,
        };
    }, [services, params.serviceName, params.sheetName]);

    // When route changes and no service is found, fallback to first service/sheet
    useEffect(() => {
        if (!activeService && services?.length) {
            const defaultService = services[0];
            const defaultSheet = defaultService?.sheets?.[0];
            dispatch(
                add({
                    activeService: defaultService,
                    activeSheet: defaultSheet,
                })
            );
        }
    }, [location.pathname, services, activeService, dispatch]);

    // Sync resolved service/sheet to Redux store
    useEffect(() => {
        if (activeService && activeSheet) {
            dispatch(add({ activeService, activeSheet }));
        }
    }, [activeService, activeSheet, dispatch]);

    // Clone the component from active sheet or service and store it in local state
    useEffect(() => {
        if (activeSheet?.component) {
            setComponent(lodash.cloneDeep(activeSheet?.component));
        } else {
            if (activeService?.component) {
                setComponent(lodash.cloneDeep(activeService?.component));
            }
        }
    }, [activeSheet, activeService]);

    // Render the cloned component inside ActionBox with params as props
    return (
        <>
            <ActionBox>{Component && <Component params={params} />}</ActionBox>
        </>
    );
}

export default Main;
