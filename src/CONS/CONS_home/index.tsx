import BOX_action from "BOX/BOX_action";
import BOX_actionMenu from "BOX/BOX_actiomMenue";
import BOX_actionContent from "BOX/BOX_actionContent";
import BOX_Assistant from "BOX/BOX_assistant";
import BndlActionMenu from "../../BNDL/WRAP_home/index_action_menu";
import { useState } from "react";
import StylePanel from "WIDG/RWID_icon_V0004/paraAssist";
import { useGlobalState } from "RDUX/dynamanContext";

function Index() {
  const { globalState, updateGlobalState } = useGlobalState();
  const assistantContent = globalState?.ENVI_glob?.glob_Packet_4?.filed_1;
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleStyleChange = (newStyle: any) => {
    updateGlobalState((prevState: any) => ({
      ...prevState,
      ENVI_glob: {
        ...prevState.ENVI_glob,
        glob_Packet_4: {
          ...prevState.ENVI_glob.glob_Packet_4,
          filed_2: {
            ...prevState.ENVI_glob.glob_Packet_4.filed_2,
            id: "xxxxxxxxx",
            newStyle,
          },
        },
      },
    }));
  };

  return (
    <>
      <BOX_action>
        <BOX_actionMenu>
          <BndlActionMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </BOX_actionMenu>
        <BOX_actionContent>َAction Content</BOX_actionContent>
      </BOX_action>

      <BOX_Assistant  isOpen={isOpen}>
        {assistantContent?.value && (
          <StylePanel 
            currentStyle={assistantContent.style || {}}
            onStyleChange={handleStyleChange}
          />
        )}
      </BOX_Assistant>
    </>
  );
}

export default Index;
