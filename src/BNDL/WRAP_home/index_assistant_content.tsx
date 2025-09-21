import StylePanel from "COMP/RCMP_bioicon_V00.04/paraAssist";
import ParaEditor from "../../COMP/RCMP_bioicon_V00.04/paraEdit";
import { initDyna } from "RDUX/dynamanContext";
function index_assistant_content({ activeView, selectedTab, }: { activeView: "assistant" | "editor"; selectedTab: "meta" | "geo" | "log" | "style" }) {

  const { envi } = initDyna();
  const iconId = envi?.ENVI_glob?.glob_Packet_4?.filed_1?.id;
  const isAssistantOpen = envi?.ENVI_glob?.glob_Packet_4?.[iconId]?.logic?.isAssistant;
  const content = envi?.ENVI_glob?.glob_Packet_4?.[iconId]
  return (

    <>
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
    </>
  )
}

export default index_assistant_content