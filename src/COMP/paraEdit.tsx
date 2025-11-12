//@ts-nocheck
import Button from "COMP/RCMP_button_V00.04";
import { useState, useEffect } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

interface ParaEditorProps {
  selectedTab?: "meta" | "geo" | "log" | "style";
}

const ParaEditor: React.FC<ParaEditorProps> = ({
  selectedTab = "meta",
}) => {
  const [activeTab, setActiveTab] = useState<"meta" | "geo" | "log" | "style">(selectedTab);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const { envi } = initDyna();

  const [currentContent, setCurrentContent] = useState<{
    meta?: Record<string, any>;
    geo?: { width?: string; height?: string };
    logic?: { onClick?: 0 | 1; id: string; isAssistant: boolean; addToLocall: boolean };
    style?: { fontSize?: string; color?: string; margin?: string; cursor?: string };
  }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const assistantState = envi?.ENVI_GLOB?.globalState?.assistant || {};
      const id = assistantState.id;
      
      if (id) {
        const componentData = envi?.ENVI_GLOB?.globalState?.[id];
        if (componentData) {
          setCurrentContent({
            meta: componentData.meta || {},
            geo: componentData.geo || {},
            logic: componentData.logic || {},
            style: componentData.style || {},
          });
        }
      }
    }, 400);

    return () => clearInterval(interval);
  }, [envi]);

  const formatData = (data: Record<string, any> | undefined): string => {
    if (!data || Object.keys(data).length === 0) return "{}";
    return JSON.stringify(data, null, 2);
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sectionTitles = {
    meta: "Meta Data",
    geo: "Geo Data", 
    log: "Logic Data",
    style: "Style Data"
  };

  const renderSection = (section: "meta" | "geo" | "log" | "style") => {
    const data = currentContent[section];
    const isEmpty = !data || Object.keys(data).length === 0;

    return (
      <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3  dark:bg-gray-800 border-b border-gray-100  dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 m-0">
            {sectionTitles[section]}
          </h3>
          <button
            className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
              copiedSection === section
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => copyToClipboard(formatData(data), section)}
          >
            {copiedSection === section ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 p-3">
          {isEmpty ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                No data available
              </p>
            </div>
          ) : (
            <textarea
              readOnly
              className="w-full h-full border border-gray-300 dark:border-gray-600 rounded 
                         bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-xs 
                         p-2 resize-none leading-relaxed custom-scrollbar"
              value={formatData(data)}
              rows={8}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Tab Buttons */}
      <div className="p-3  dark:bg-gray-800 border-b border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
        <div className="flex gap-1">
          {(["meta", "geo", "log", "style"] as const).map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              buttunTitle={tab.toUpperCase()}
              variant={activeTab === tab ? "filled" : "outlined"}
              className="text-xs py-1.5 flex-1"
            />
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 p-3">
        {renderSection(activeTab)}
      </div>

      {/* Status Info */}
      <div className="p-2  dark:bg-gray-800 border-t border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
        <div className=" flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>ParaEditor</span>
          <span className={`px-1.5 py-0.5 rounded  ${
            Object.keys(currentContent).some(key => 
              currentContent[key as keyof typeof currentContent] && 
              Object.keys(currentContent[key as keyof typeof currentContent]!).length > 0
            ) 
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          }`}>
            {Object.keys(currentContent).some(key => 
              currentContent[key as keyof typeof currentContent] && 
              Object.keys(currentContent[key as keyof typeof currentContent]!).length > 0
            ) ? "Active" : "No Data"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ParaEditor;