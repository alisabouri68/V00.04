import { SiHomeassistant } from "react-icons/si";
import Button from "COMP/RCMP_button_V00.04";
import Image from "WIDG/RWID_image_V00.04";
import Icon from "WIDG/RWID_icon_V0004";
import Logo from "../../ASST/images/logo-dash.svg";
import Pic from "../../ASST/images/email-logo.png"

function index_action_menu({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
}) {
  return (
    <>
      <div className="flex justify-end px-3 w-full ">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          leftIcon={<SiHomeassistant />}
          buttunTitle="ENVI_mnge"
          variant={isOpen ? "filled" : "outlined"}
        />
      </div>
      <div className="flex items-end justify-around gap-3 px-3 w-full">
        <div className="flex flex-col gap-5 cursor-pointer">
          {" "}
          <Image styles={{ borderRadius: "10%", boxShadow: "", objectFit: "cover" }} logic={{ src: Pic, alt :"logo", lazy:true}} geo={{width:"50px",height:"50px"}} />
          image 1
        </div>
        <div className="flex flex-col gap-5 cursor-pointer">
          {" "}
          <Image
            styles={{
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
            logic={{ src: Logo, alt: "logo",lazy:true }}
            geo={{ width: "100px", height: "100px" }}
          />
          Image2
        </div>
        <div className="flex flex-col gap-5 cursor-pointer">
          {" "}
          <Icon children={<SiHomeassistant />} /> Icon{" "}
        </div>
      </div>
    </>
  );
}

export default index_action_menu;
