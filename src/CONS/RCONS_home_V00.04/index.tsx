import { AssistantProvider } from 'STOR/AssistantContext/index';
import { Helmet } from "react-helmet-async";
import BOXAction from "../../BOXS/BOX_action"
import BOX_actiomContent from "../../BOXS/BOX_actionContent"
import BOX_assistant from "../../BOXS/BOX_assistant"
import BOX_assistantMenu from "../../BOXS/BOX_assistantMenu"
import BOX_assistantContent from "../../BOXS/BOX_assistantContent"
import SheetActionContent from "../../BNDL/WRAP_actionContentHome/hotMenuSheet"
import Envimngr from "../../COMP/RCMP_envimngr_v00.04";
import ParaAssigners from "../../COMP/paraAssist";
import ParaEditor from "../../COMP/paraEdit";
import { useState } from "react";
function index() {
  const [isTab, setIsTab] = useState<"envimngr" | "assigner" | "editor">("envimngr");
  const tabButtons = [
    { id: "envimngr", label: "Envimngr" },
    { id: "assigner", label: "ParaAssigner" },
    { id: "editor", label: "ParaEditor" }
  ];

  return (
    <>
      <AssistantProvider>
        <Helmet>
          <title>Home | Dashboard</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="w-9/12 h-full bg-white dark:bg-gray-800 overflow-hidden border-b border-gray-200 dark:border-gray-700">
          <BOXAction>
            {/* <BOX_actiomMenue>
            actionMenu
          </BOX_actiomMenue> */}
            <BOX_actiomContent>
              <SheetActionContent />
            </BOX_actiomContent>

          </BOXAction>
        </div>
        <div className="w-3/12 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm rounded-md">

          <BOX_assistant>
            {/* Assistant Header */}
            <BOX_assistantMenu>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
                <div className="flex gap-1.5">
                  {tabButtons.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setIsTab(tab.id as any)}
                      className={`
                      flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 border
                      ${isTab === tab.id
                          ? "bg-white dark:bg-gray-600 shadow-sm border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white font-semibold"
                          : "bg-transparent border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-600/60"
                        }
                    `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </BOX_assistantMenu>

            {/* Assistant Content */}
            <BOX_assistantContent>
              <div className="p-1 h-full w-full">
                {isTab === "envimngr" && <Envimngr />}
                {/* Add other tab contents here when needed */}
                {isTab === "assigner" && <ParaAssigners />}
                {isTab === "editor" && <ParaEditor />}
              </div>
            </BOX_assistantContent>
          </BOX_assistant>
        </div>
      </AssistantProvider>
    </>
  );
}

export default index;