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

  // 🟢 دریافت state گلوبال کامپوننت فعال
  const [currentContent, setCurrentContent] = useState<{
    meta?: Record<string, any>;
    geo?: { width?: string; height?: string };
    logic?: { onClick?: 0 | 1; id: string; isAssistant: boolean; addToLocall: boolean };
    style?: { fontSize?: string; color?: string; margin?: string; cursor?: string };
  }>({});

  // 🟢 گوش دادن به تغییرات state گلوبال
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

  const renderSection = (section: "meta" | "geo" | "log" | "style") => {
    let title: string;
    let data: Record<string, any> | undefined;

    switch (section) {
      case "meta":
        title = "Meta Data";
        data = currentContent.meta;
        break;
      case "geo":
        title = "Geo Data";
        data = currentContent.geo;
        break;
      case "log":
        title = "Logic Data";
        data = currentContent.logic;
        break;
      case "style":
        title = "Style Data";
        data = currentContent.style;
        break;
      default:
        title = "Data";
        data = {};
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 h-full w-full border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 m-0">
            {title}
          </h3>
          <button
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 shadow-sm ${
              copiedSection === section
                ? "bg-green-500 text-white shadow-green-200 dark:shadow-green-800"
                : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
            }`}
            onClick={() => copyToClipboard(formatData(data), section)}
          >
            {copiedSection === section ? "Copied!" : "Copy JSON"}
          </button>
        </div>

        <div className="relative h-full">
          <textarea
            readOnly
            className="w-full h-full border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-sm 
                       p-3 resize-none custom-scrollbar leading-relaxed"
            value={formatData(data)}
            rows={12}
          />
          {!data || Object.keys(data).length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 bg-opacity-80 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                No data available
              </p>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start w-full bg-gray-50 dark:bg-gray-900 rounded-xl font-sans h-full p-4 space-y-4">
      {/* 🟢 دکمه‌های انتخاب تب */}
      <div className="flex justify-center w-full gap-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-inner">
        {["meta", "geo", "log", "style"].map((tab) => {
          return (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              buttunTitle={tab.toUpperCase()}
              variant={activeTab === tab ? "filled" : "outlined"}
            />
          );
        })}
      </div>

      {/* 🧩 محتوای تب فعال */}
      <div className="flex-1 w-full flex items-center justify-center transition-all duration-500">
        {renderSection(activeTab)}
      </div>
    </div>
  );
};

export default ParaEditor;