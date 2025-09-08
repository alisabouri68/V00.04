import BOX_action from "BOX/BOX_action";
import BOX_actionMenu from "BOX/BOX_actiomMenue";
import BOX_actionContent from "BOX/BOX_actionContent";
import { SiHomeassistant } from "react-icons/si";
import BOX_Assistant from "BOX/BOX_assistant";
import { useState } from "react";
import Button from "COMP/RCMP_button_V00.04";
import ComponentX from "COMP/RCMP_component_1/index";
import ComponentY from "COMP/RCMP_component_2/index";
import ComponentZ from "COMP/RCMP_component_3/index";
function index() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <BOX_action>
        <BOX_actionMenu>
          <div className="flex justify-end px-3 w-full ">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              leftIcon={<SiHomeassistant />}
              buttunTitle="ENVI_mnge"
              variant={isOpen ? "filled" : "outlined"}
            />
          </div>
          <div className="flex items-center gap-3 justify-center px-3 w-full">
            <ComponentX />
            <ComponentY />
            <ComponentZ />
          </div>
        </BOX_actionMenu>
        <BOX_actionContent>َAction Content</BOX_actionContent>
      </BOX_action>

      <BOX_Assistant isOpen={isOpen}></BOX_Assistant>
    </>
  );
}

export default index;
