import BOX_action from "BOX/BOX_action";
import BOX_actionMenu from "BOX/BOX_actionMenue";
import BOX_actionContent from "BOX/BOX_actionContent";
import BOX_Assistant from "BOX/BOX_assistant";
import BndlActionMenu from "../../BNDL/WRAP_home/index_action_menu";
import BundlAssistantMenu from "BNDL/WRAP_home/index_assistant_menu"
import BundlAssistantContent from "BNDL/WRAP_home/index_assistant_content"
// import ButtonB from "COMP/RCMP_button_V00.04/indextest"
import { useState } from "react";

function Index() {
  const [activeView, setActiveView] = useState<"assistant" | "editor">("assistant");
  const [selectedTab, setSelectedTab] = useState<"meta" | "geo" | "log" | "style">("meta");
  return (
    <>
      <BOX_action>

        <BOX_actionMenu>
          <BndlActionMenu />
        </BOX_actionMenu>


        <BOX_actionContent>x</BOX_actionContent>

      </BOX_action>

      <BOX_Assistant>

        <BundlAssistantMenu
          activeView={activeView}
          setActiveView={setActiveView}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}

        >  <BundlAssistantContent
            activeView={activeView}
            selectedTab={selectedTab}
          /> </BundlAssistantMenu>

      </BOX_Assistant>
    </>
  );
}

export default Index;