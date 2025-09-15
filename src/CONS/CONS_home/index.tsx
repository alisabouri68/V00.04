import BOX_action from "BOX/BOX_action";
import BOX_actionMenu from "BOX/BOX_actiomMenue";
import BOX_actionContent from "BOX/BOX_actionContent";
import BOX_Assistant from "BOX/BOX_assistant";
import BndlActionMenu from "../../BNDL/WRAP_home/index_action_menu";
import { useState } from "react";
import StylePanel from "WIDG/RWID_icon_V0004/paraAssist";
import { useGlobalState } from "RDUX/dynamanContext";
import ParaEditor from "../../WIDG/RWID_icon_V0004/paraEdit";

function Index() {
  const { globalState } = useGlobalState();
  // Fix: Use the correct union type instead of string
  const [activeView, setActiveView] = useState<"assistant" | "editor">("assistant");
  const [selectedTab, setSelectedTab] = useState<"meta" | "geo" | "log" | "style">("meta");

  const iconId = globalState?.ENVI_glob?.glob_Packet_4?.filed_1?.id;
  const isAssistantOpen = globalState?.ENVI_glob?.glob_Packet_4?.[iconId]?.logic?.isAssistant;
  const content = globalState?.ENVI_glob?.glob_Packet_4?.[iconId];
  
  return (
    <>
      <BOX_action>
        <BOX_actionMenu>
          <BndlActionMenu />
        </BOX_actionMenu>
        <BOX_actionContent>Action Content</BOX_actionContent>
      </BOX_action>

      <BOX_Assistant 
        activeView={activeView} 
        setActiveView={setActiveView}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      >
        {isAssistantOpen && content && iconId && activeView === "assistant" && (
          <StylePanel
            key={iconId}
            geo={{ ...content.geo }}
            logic={{ ...content.logic, id: iconId, isAssistant: isAssistantOpen }}
            style={{ ...content.style }}
          />
        )}
        {isAssistantOpen && content && iconId && activeView === "editor" && (
          <ParaEditor 
            key={iconId}
            meta={{ ...content.meta }}
            geo={{ ...content.geo }}
            logic={{ ...content.logic, id: iconId, isAssistant: isAssistantOpen }}
            style={{ ...content.style }}
            selectedTab={selectedTab}
          />
        )}
      </BOX_Assistant>
    </>
  );
}

export default Index;
