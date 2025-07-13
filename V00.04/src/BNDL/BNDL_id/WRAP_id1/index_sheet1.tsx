/******************************************
Wrapper Templates

Last Update:    2025.07.12
By:             APPS.00

Description:  This templates is used for developing React Components according to Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             WRAP_sheet1
Title:          Title
Version:        V00.04
VAR:            01 (side nav)

last-update:    D2025.07.12
owner:          APPS.00

Description:    Bundle 1 - SPK3 - Sheet 1 (describe ...)

------------------------------------------------------------*/



/**************************************
 * Step 01 import dependencies - kernels
 **************************************/



/**************************************
 * Step.02:    import dependency - component
 **************************************/
import {comp1} from ""./COMP/RCMP_comp1/index.tsx"          // Load Component 1 
import {comp2} from ""./COMP/RCMP_comp2/index.tsx"          // Load Component 2 
import {comp3} from ""./COMP/RCMP_comp3/index.tsx"          // Load Component 3 

/**************************************
 * Step.03:    actor dependencies
 **************************************/



/**************************************
 * Step 04 - define property Components
 **************************************/



comp a = comp1.Props {
    geo: {
        bG01: number; //type = number
        bG02: number; //type = number
        bG03: number; //type = number
        bG04: number; //type = number
    };

    logic: {
        bL01: string; //Constant Number - no need for state
        bL02: string; // or Envi - Var
        bL03: string; // or Plug
        bL04: string; //
    };

    style: {
        bs01: string;
        bs02: string;
        bs03: string;
    };
};

compa.init ();

"<div x= y= ...  >text <href ...> </div> "


comp b = comp1.Props {
    geo: {
        bG01: number; //type = number
        bG02: number; //type = number
        bG03: number; //type = number
        bG04: number; //type = number
    };

    logic: {
        bL01: string; //Constant Number - no need for state
        bL02: string; // or Envi - Var
        bL03: string; // or Plug
        bL04: string; //
    };

    style: {
        bs01: string;
        bs02: string;
        bs03: string;
    };
};

compb.init ();

