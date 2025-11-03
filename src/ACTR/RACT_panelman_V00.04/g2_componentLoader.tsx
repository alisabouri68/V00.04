// ACTR/RACT_panelman_V00.04/g2_componentLoader.ts
import React from "react";
import HeaderBox from "BOX/BOX_header"
import BoxNavigator from "BOX/BOX_nav"
import BoxJini from "BOX/BOX_Jinni"
import BoxActionMenu from "BOX/BOX_actionMenue"
import BoxActionContent from "BOX/BOX_actionContent"
import BoxAssistantMenu from "BOX/BOX_assistantMenu"
import BoxAssistantContent from "BOX/BOX_assistantContent"
import ConsoleSwitcher from "BNDL/WRAP_header/consoleSheet"
import Theme from "BNDL/WRAP_header/themeSheet"
import Language from "BNDL/WRAP_header/languageSheet"
import Profile from "BNDL/WRAP_header/userProfileSheet"
import DirectCall from "COMP/testWorkshop/DirectCall"
import EnviMngr from "COMP/RCMP_envimngr_v00.04"
import ContextDiagram from "COMP/testWorkshop/ContextDiagram"
import ContextFlow from "COMP/testWorkshop/ContextFlow"
import ParaAssigner from "COMP/RCMP_bioicon_V00.04/paraAssist"
import { MdOutlineSignalCellularNull } from "react-icons/md";
export class ComponentLoader {
    private components: Record<string, React.ComponentType<any>>;
    constructor() {
        this.components = {
            // کامپوننت‌های اصلی
            boxheader: HeaderBox,
            navigator1: BoxNavigator,
            boxactionMenue: BoxActionMenu,
            boxactionContent: BoxActionContent,
            boxassistantMenu: BoxAssistantMenu,
            boxassistantContent: BoxAssistantContent,
            jinibox: BoxJini,
            directCall: DirectCall,
            enviMngr: EnviMngr,
            paraAssigner: ParaAssigner,
            contextDiagram: ContextDiagram,
            contextFlow: ContextFlow,

            // کامپوننت‌های هدر
            consoleSwitcher: ConsoleSwitcher,
            theme: Theme,
            language: Language,
            profile: Profile,


        };


        // بررسی کامپوننت‌های حیاتی
        const criticalComps = ['boxheader', 'consoleSwitcher', 'theme', 'language', 'profile'];
        criticalComps.forEach(comp => {
            if (this.components[comp]) {
                console.log(`✅ ${comp} is registered`);
            } else {
                console.warn(`❌ ${comp} is MISSING - using debug component`);
            }
        });
    }

    public getComponent(name: string): React.ComponentType<any> | null {
        console.log(`🔍 ComponentLoader looking for: "${name}"`);

        const component = this.components[name];

        if (!component) {
            return MdOutlineSignalCellularNull
        }

        return component;
    }

    public getAllComponents(): Record<string, React.ComponentType<any>> {
        return this.components;
    }
}

export const componentLoader = new ComponentLoader();