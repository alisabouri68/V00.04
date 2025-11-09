import { useMemo } from "react";
import { type ServiceItem } from "../../COMP/RCMP_servicePicker_VAR.01_V00.04"
import ServiceItems from "../../COMP/RCMP_servicePicker_VAR.01_V00.04"
import {
    CiPhone,         
} from "react-icons/ci";

import {
    MdOutlineSelectAll, 
    MdOutlineCallSplit, 
    MdOutlineFlag,      
    MdOutlineHub,       
} from "react-icons/md";
function SheetActionMenuHome() {
    const allServices = useMemo((): ServiceItem[] => [
        {
            id: "context-call",
            title: "Context Call",
            icon: <MdOutlineHub size={20} />
        },
        {
            id: "direct-call",
            title: "Direct Call",
            icon: <CiPhone size={20} />
        },
        {
            id: "selector",
            title: "Selector",
            icon: <MdOutlineSelectAll size={20} />
        },
        {
            id: "envi-call",
            title: "Envi Call",
            icon: <MdOutlineCallSplit size={20} />
        },
        {
            id: "flag-call",
            title: "Flag Call",
            icon: <MdOutlineFlag size={20} />
        }
    ], []);

    return (
        <ServiceItems allServices={allServices} />
    )
}

export default SheetActionMenuHome