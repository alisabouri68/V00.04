//@ts-nocheck
/******************************************
Widget Templates

Last Update:    2025.09.12
By:             APPS.68

Description:  This templates is used for developing React Components according to Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RWID 
Title:          Widget Templates - React Version
Version:        V00.04
VAR:            01 (remarks ....)

last-update:    D2025.09.12
owner:          APPS.68

Description:    Here ...

------------------------------------------------------------*/

/**************************************
 * Step 01 import dependencies - kernels
 **************************************/
import { useState } from "react";
/**************************************
 * Step.02:    import dependency - widgets
 **************************************/
import Button from "COMP/RCMP_button_V00.04";
/**************************************
 * Step.03:    co-actor dependencies
 **************************************/
/**************************************
 * Step 05 - define property interface for this BioWidget
 **************************************/
/**************************************
 * Step 07 - Class Component should be defined
 *
 **************************************/
function ParaEdit() {
  const [activeTab, setActiveTab] = useState<"meta" | "geo" | "logic" | "styles">(
    "meta"
  );

  const tabs: Array<"meta" | "geo" | "logic" | "styles"> = [
    "meta",
    "geo",
    "logic",
    "styles",
  ];

  return (
    <div className="bg-light shadow-lg  flex flex-col gap-2 w-full h-full overflow-y-auto custom-scrollbar">
      {/* دکمه‌ها */}
      <div className="bg-light shadow-lg gap-2 flex w-full">
        {tabs.map((tab) => (
          <Button
            key={tab}
            fullWidth
            buttunTitle={tab}  
            variant={activeTab === tab ? "filled" : "outlined"}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      <div className="bg-light h-full shadow-lg gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex w-full">
        <p>اینجا {activeTab} است</p>
      </div>
    </div>
  );
}

export default ParaEdit;
