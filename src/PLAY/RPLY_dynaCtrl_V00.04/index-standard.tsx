
  /*
  
  Request:
  
  /Play1/option11/? par1=0 ,par2=2
  
  ACTR_panelman : 
  
        listen --> check play-option   --> Play (opt1 , par1 , par2 )
  
        Envi_glob
          # reqMngr
              . params
                    . param (1): par1
                    . param (2): par2
  
              . par1:
              . par2:
              . par3:
  
              . option: opt1
  
              . playId: PLAY_play1
  
        play.react()
  
  
  RPLY_panelCntrl : 
  
  read option
  select  option
  
  opt1 : function*/
/******************************************
Play-Index file Templates

Last Update:    2025.09.15
By:             APPS.00

Description:  This templates is used for developing React Actors based on V00.04
******************************************/



// ************************************
Meta Data
  /*------------------------------------------------------------
  
  ID:             RACT_template 
  Title:          Actor Template - React Version
  Version:        V00.04
  VAR:            01 (remarks ....)
  
  last-update:    D2025.08.11
  owner:          APPS.00
  
  Description:    Here ...
  
  ------------------------------------------------------------*/



  // ************************************
  * Step 01 import dependencies - kernels
    /**************************************
    
     
    // import { useDispatch, useSelector } from "react-redux";
    // import { AppDispatch, RootState } from "RDUX/store";
    
    // import Dimentions from "./template/dimensions";
    // import lodash from "lodash";
    // import lz from "lz-string";
    
    
    
     **************************************/



    // ************************************
    * Step.02: import dependencies - actors
      /**************************************
      
      
      import { plug } from "/src/ACTR/RACT_plug_V00.04";
      import { regio } from "/src/ACTR/RACT_regio_V00.04";
      import { act1 } from "/src/ACTR/RACT_act1_V00.04";
     
      import { GlobalStateProvider } from "../../RDUX/dynamanContext";
      
     //  **************************************/


      // ************************************
      * Step.03: import dependencies - xapp s
        /**************************************
        
        
        import { xapp1 } from "/src/XAPP/RXAP_xapp1_V00.04";
        import { xapp2 } from "/src/XAPP/RXAP_xapp2_V00.04";
        import { xapp3 } from "/src/XAPP/RXAP_xapp3_V00.04";
        
       //  **************************************/


        // ************************************
        * Step.04: import options
 /**************************************
 
 
 // import { opt1 } from "/src/ACTR/RACT_actorId_V00.04/option1.tsx";
 // import { opt2 } from "/src/ACTR/RACT_actorId_V00.04/option2.tsx";
 // import { opt3 } from "/src/ACTR/RACT_actorId_V00.04/option3.tsx";
 
//  **************************************/






 // ************************************
 * Step.05: Envi Setups
  /**************************************
  
  /// packet gVar - creating envi variables (access to envi only by KRNL_absMan)
  
  
  
  
  
 //  **************************************/





  // ************************************
  * Step.05: Class Definition
/**************************************
class actorID {
 
   constructor(nttStructure: any = null) {
     this._NTT = nttStructure ?? structuredClone(DEFAULT_SCHM);
     this._serial = nttStructure?.serial ?? this.generateVersion();
   
   
/// packets mVar - creating inside the class
 
    # packet1                      

   .field(1)
   .  . id 					"f21"
   .  . value:					"v1"
   .  . dim:					"!STR"
 	
   .field(2)
   .  . id 					"f22"
   .  . value:					"v1"
   .  . dim:					"!STR"
 	
   .field(3)
   .  . id 					"f23"
   .  . value:					"v1"
   .  . dim:					"!STR"
 


   this.packet1(1)=> {"id":"f21" , "value": "v1", }


   
   
   
   

   }

 
   //  @returns

   public serialize() {
     return lz.compressToBase64(this.stringify());
   }

 
  //  @returns

   public stringify() {
     return JSON.stringify(this, (_, value) => {
       if (value && value instanceof AbsMan) {
         //@ts-ignore
         value.__type = value.constructor.name;
       }
       return value;
     });
   }
 
 
 
 


 
 
/// script group setup 
 
 
     <opt1 />
     <opt2 />
     <opt3 />
 

}

export default actorID;

//  **************************************/