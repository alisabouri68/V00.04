
import { SiHomeassistant } from "react-icons/si";
import Image from "WIDG/RWID_image_V00.04";
import Icon from "WIDG/RWID_icon_V0004";
import Logo from "../../ASST/images/logo-dash.svg"
import Pic from "../../ASST/images/email-logo.png"
import { CgAnchor } from "react-icons/cg";
import { CgEyeAlt } from "react-icons/cg";
import { CgWindows } from "react-icons/cg";
import { CgSmile } from "react-icons/cg";
function index_action_menu() {
    return (

        <>

            <div className="flex items-end justify-around gap-3 px-3 w-full">
                <div className="flex flex-col gap-5 cursor-pointer">  <Image styles={{ borderRadius: "10%", boxShadow: "", objectFit: "cover" }} logic={{ src: Pic, alt: "Pic", lazy: true }} geo={{ width: "50px", height: "50px" }} />Avatar</div>
                <div className="flex flex-col gap-5 cursor-pointer"> <Image styles={{ borderRadius: "10%", boxShadow: "", objectFit: "cover" }} logic={{ src: Logo, alt: "logo", lazy: true }} geo={{ width: "50px", height: "50px" }} />Image </div>
                <div className="flex flex-col gap-5 cursor-pointer">
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "WIDG_icon_V00.04_101010", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "blue", fontSize: "50px", margin: "0px" }} children={<SiHomeassistant />} /> Icon </div>
                <div className="flex flex-col gap-5 cursor-pointer">
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "WIDG_icon_V00.04_202020", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "lightblue", fontSize: "50px", margin: "0px" }}
                    >
                        <CgAnchor />
                    </Icon>
                    Icon
                </div>

                <div className="flex flex-col gap-5 cursor-pointer">
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "WIDG_icon_V00.04_303030", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "green", fontSize: "50px", margin: "0px" }}
                    >
                        <CgEyeAlt />
                    </Icon>
                    Icon
                </div>
                <div className="flex flex-col gap-5 cursor-pointer">
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "WIDG_icon_V00.04_404040", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "purple", fontSize: "50px", margin: "0px" }}
                    >
                        <CgWindows />
                    </Icon>
                    Icon
                </div>
                <div className="flex flex-col gap-5 cursor-pointer"  style={{color:"purple"}}>
                    <Icon
                        geo={{ width: "50px", height: "50px" }}
                        logic={{ id: "WIDG_icon_V00.04_505050", isAssistant: false, addToLocall: false }}
                        style={{ cursor: "pointer", color: "red", fontSize: "50px", margin: "0px" }}
                    >
                        <CgSmile />
                    </Icon>
                    Icon
                </div>

            </div>
        </>
    )
}

export default index_action_menu
