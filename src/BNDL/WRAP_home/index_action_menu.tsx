
import { SiHomeassistant } from "react-icons/si";
import Icon from "COMP/RCMP_bioicon_V0004";
import { CgAnchor } from "react-icons/cg";
import { CgEyeAlt } from "react-icons/cg";
import { CgWindows } from "react-icons/cg";
import { CgSmile } from "react-icons/cg";
function index_action_menu() {
    return (

        <>

            <div className="flex items-end justify-around gap-3 px-3 w-full">
                <div className="flex flex-col gap-5 cursor-pointer">
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "icon 1", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "blue", fontSize: "50px", margin: "0px" }} children={<SiHomeassistant />} /> Icon1 </div>
                <div className="flex flex-col gap-5 cursor-pointer">
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "icon 2", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "lightblue", fontSize: "50px", margin: "0px" }}
                    >
                        <CgAnchor />
                    </Icon>
                    Icon2
                </div>

                <div className="flex flex-col gap-5 cursor-pointer">
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "icon 3", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "green", fontSize: "50px", margin: "0px" }}
                    >
                        <CgEyeAlt />
                    </Icon>
                    Icon3
                </div>
                <div className="flex flex-col gap-5 cursor-pointer">
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "icon 4", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "purple", fontSize: "50px", margin: "0px" }}
                    >
                        <CgWindows />
                    </Icon>
                    Icon4
                </div>
                <div className="flex flex-col gap-5 cursor-pointer" >
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "icon 5", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "red", fontSize: "50px", margin: "0px" }}
                    >
                        <CgSmile />
                    </Icon>
                    Icon5
                </div>

            </div>
        </>
    )
}

export default index_action_menu
