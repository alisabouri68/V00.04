import { AssistantProvider } from 'STOR/AssistantContext/index';
import { Helmet } from "react-helmet-async";
import BOXAction from "../../BOXS/BOX_action"
import BOX_actiomContent from "../../BOXS/BOX_actionContent"
import BOX_assistant from "../../BOXS/BOX_assistant"
import BOX_assistantMenu from "../../BOXS/BOX_assistantMenu"
import BOX_assistantContent from "../../BOXS/BOX_assistantContent"
import { useState } from "react";
import BOX_actiomMenue from 'BOXS/BOX_actionMenue';
import MetaPanel from 'COMP/meta';
import GeoPanel from 'COMP/geo';
import StylePanel from 'COMP/style';
import EventPanel from 'COMP/event';
import MethodPanel from 'COMP/methode';
import LogicPanel from 'COMP/logic';
import WidgetManager from 'COMP/widgetlist/index';
function index() {
  const [isTab, setIsTab] = useState<"Meta" | "Geo" | "Logic" | "Style" | "Event" | "Methode">("Meta");
  const tabButtons = [
    { id: "Meta", label: "Meta" },
    { id: "Geo", label: "Geo" },
    { id: "Logic", label: "Logic" },
    { id: "Style", label: "Style" },
    { id: "Event", label: "Event" },
    { id: "Methode", label: "Methode" }
  ];

  return (
    <>
      <AssistantProvider>
        <Helmet>
          <title>Console 3</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="w-9/12 h-full bg-white dark:bg-gray-800 overflow-hidden border-b border-gray-200 dark:border-gray-700">
          <BOXAction>
            <BOX_actiomMenue >
            actionMenu
          </BOX_actiomMenue>
            <BOX_actiomContent>
              <WidgetManager /> 
              
            </BOX_actiomContent>

          </BOXAction>
        </div>
        <div className="w-3/12 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm rounded-md">

          <BOX_assistant>
            {/* Assistant Header */}
            <BOX_assistantMenu>
              <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
                <div className="flex gap-0.5">
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
    {isTab === "Meta" && <MetaPanel />}
    {isTab === "Geo" && <GeoPanel />}
    {isTab === "Logic" && <LogicPanel />}
    {isTab === "Style" && <StylePanel />}
    {isTab === "Event" && <EventPanel />}
    {isTab === "Methode" && <MethodPanel />}
  </div>
</BOX_assistantContent>
          </BOX_assistant>
        </div>
      </AssistantProvider>
    </>
  );
}

export default index;