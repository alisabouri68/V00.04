import Button from "COMP/RCMP_button_V00.04/index";
import Avatar from "COMP/RCMP_avatar_VAR.01_V00.04/index";
import Bioicon from "COMP/RCMP_bioicon_V00.04/index";
import Bioimage from "COMP/RCMP_bioimage_V00.04/index";
import Biotext from "COMP/RCMP_biotext_V0004/index";
import ConsoleBasket from "COMP/RCMP_consoleBasket_VAR.01_V00.04/index";
import ConsoleSwitcher from "COMP/RCMP_consoleSwitcher_VAR.01_V00.04/index";
import Dropdown from "COMP/RCMP_dropdown_V00.04/index";
import Envimngr from "COMP/RCMP_envimngr_v00.04/index";
import Navigator1 from "COMP/RCMP_navigator_VAR.01_V00.04/index";
import Profile from "BNDL/WRAP_header/userProfileSheet";
import Theme from "BNDL/WRAP_header/themeSheet";
import Language from "BNDL/WRAP_header/languageSheet";
import BoxJinni from "BOX/BOX_Jinni"
import BoxAction from "BOX/BOX_action"
import BoxactionContent from "BOX/BOX_actionContent"
import BoxactionMenue from "BOX/BOX_actionMenue"
import Boxassistant from "BOX/BOX_assistant"
import Boxheader from "BOX/BOX_header"
import BoxNav from "BOX/BOX_nav"
import ItemNav from "COMP/RCMP_itemNav_V00.04"

export class ComponentLoader {
    private components: Record<string, React.ComponentType<any>>;

    constructor() {
        this.components = {
            button: Button,
            avatar: Avatar,
            bioicon: Bioicon,
            bioimage: Bioimage,
            biotext: Biotext,
            consoleBasket: ConsoleBasket,
            consoleSwitcher: ConsoleSwitcher,
            dropdown: Dropdown,
            envimngr: Envimngr,
            navigator1: Navigator1,
            profile: Profile,
            theme: Theme,
            language: Language,
            boxheader: Boxheader,
            boxJinni: BoxJinni,
            boxAction: BoxAction,
            boxactionContent: BoxactionContent,
            boxactionMenue: BoxactionMenue,
            boxassistant: Boxassistant,
            BoxNav: BoxNav,
            itemNav: ItemNav,
        };


        console.log("ComponentLoader loaded components:", Object.keys(this.components));
    }

    public getComponent(name: string): React.ComponentType<any> | null {
        return this.components[name] || null;
    }

    public getAllComponents(): Record<string, React.ComponentType<any>> {
        return this.components;
    }
}


export const componentLoader = new ComponentLoader();
