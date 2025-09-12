import { SiHomeassistant } from "react-icons/si";
import Button from "COMP/RCMP_button_V00.04";
import Avatar from "COMP/RCMP_avatar_VAR.01_V00.04";
import Image from "WIDG/RWID_image_V00.04";
import Icon from "WIDG/RWID_icon_V0004";
import Logo from "../../ASST/images/logo-dash.svg";
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
          <Avatar src={Logo} />
          Avatar
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
            geo={{ width: "100", height: "100" }}
          />
          Image{" "}
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
