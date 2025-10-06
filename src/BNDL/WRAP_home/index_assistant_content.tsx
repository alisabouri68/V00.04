import StylePanel from "COMP/RCMP_bioicon_V00.04/paraAssist";
import ParaEditor from "../../COMP/RCMP_bioicon_V00.04/paraEdit";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
function index_assistant_content({ activeView, selectedTab, }: { activeView: "assistant" | "editor"; selectedTab: "meta" | "geo" | "log" | "style" }) {

  const { envi } = initDyna();
  const iconId = envi?.ENVI_GLOB?.globalState?.assistant?.id;
  const isAssistantOpen = envi?.ENVI_GLOB?.globalState?.[iconId]?.logic?.isAssistant;
  const content = envi?.ENVI_GLOB?.globalState?.[iconId]
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