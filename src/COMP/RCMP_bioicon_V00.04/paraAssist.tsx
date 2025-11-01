// COMP/RCMP_assistant_V00.03/index.tsx
//@ts-nocheck
import { ChangeEvent, useMemo, useCallback, memo } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

interface AssistantProps {
  logic?: { id: string;[key: string]: any };
}

interface SectionProps {
  title: string;
  data: Record<string, any>;
  section: "meta" | "geo" | "logic" | "style";
  onChange: (section: "meta" | "geo" | "logic" | "style", key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}

const Section = memo(({ title, data, section, onChange }: SectionProps) => {
  const safeData = data || {};

  if (Object.keys(safeData).length === 0) {
    return (
      <div className="bg-white h-full dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-3">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6 italic">
          No properties available
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md h-full overflow-y-auto custom-scrollbar 
                    border border-gray-200 dark:border-gray-700 overflow-hidden">
      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h3>

      <div className="flex-1 space-y-4">
        {Object.entries(safeData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              {key}
              <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                ({typeof value})
              </span>
            </label>
            
            <input
              type="text"
              value={value ?? ""}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-gray-100 p-2.5 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent text-sm transition-all
                         w-full"
              onChange={onChange(section, key)}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

Section.displayName = "Section";

const Assistant = ({ logic }: AssistantProps) => {
  const { envi, reconfigDyna } = initDyna();
  
  // استفاده از id از props یا از assistant state
  const assistantState = envi?.ENVI_GLOB?.globalState?.assistant || {};
  const id = logic?.id || assistantState.id;
  
  console.log("🎯 Assistant Debug:", {
    idFromProps: logic?.id,
    idFromAssistant: assistantState.id,
    fullAssistantState: assistantState,
    componentState: id ? envi?.ENVI_GLOB?.globalState?.[id] : null
  });

  const isAssistantActive = useMemo(() => {
    if (!id) return false;
    
    const componentData = envi?.ENVI_GLOB?.globalState?.[id];
    const isActive = componentData?.logic?.isAssistant && assistantState.id === id;
    
    console.log("🔍 Assistant active check:", {
      id,
      isActive,
      componentHasAssistant: componentData?.logic?.isAssistant,
      assistantTargetsThis: assistantState.id === id
    });
    
    return isActive;
  }, [envi, id, assistantState.id]);

  const currentSection = assistantState.section || "meta";

  const content = useMemo(() => {
    if (!id) return { meta: {}, geo: {}, logic: {}, style: {} };
    
    const contentData = envi?.ENVI_GLOB?.globalState?.[id];
    return {
      meta: contentData?.meta || {},
      geo: contentData?.geo || {},
      logic: contentData?.logic || {},
      style: contentData?.style || {},
    };
  }, [envi, id]);

  const handleChange = useCallback(
    (section: "meta" | "geo" | "logic" | "style", key: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!id) return;
        
        const newValue = e.target.value;
        console.log("✏️ Changing:", { id, section, key, newValue });
        
        reconfigDyna((prev: any) => ({
          ...prev,
          ENVI_GLOB: {
            ...prev?.ENVI_GLOB,
            globalState: {
              ...prev?.ENVI_GLOB?.globalState,
              [id]: {
                ...prev?.ENVI_GLOB?.globalState?.[id],
                [section]: {
                  ...prev?.ENVI_GLOB?.globalState?.[id]?.[section],
                  [key]: newValue,
                },
              },
            },
          },
        }));
      },
    [id, reconfigDyna]
  );

  if (!id || !isAssistantActive) {
    console.log("🚫 Assistant not showing:", { 
      hasId: !!id, 
      isActive: isAssistantActive,
      currentId: id 
    });
    
    return (
      <div className="flex items-center justify-center h-full p-6 mx-1 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm italic mb-2">
            Assistant is inactive
          </p>
          <div className="text-xs space-y-1">
            <p>Click on any icon to activate</p>
            <p>Current ID: {id || "none"}</p>
            <p>Status: {isAssistantActive ? "active" : "inactive"}</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("✅ Rendering Assistant for:", id);

  const renderSection = () => {
    const sections = {
      meta: { title: "Meta Properties", data: content.meta },
      geo: { title: "Geo Properties", data: content.geo },
      logic: { title: "Logic Properties", data: content.logic },
      style: { title: "Style Properties", data: content.style },
    };

    const current = sections[currentSection as keyof typeof sections] || sections.meta;

    return (
      <Section
        title={current.title}
        data={current.data}
        section={currentSection as "meta" | "geo" | "logic" | "style"}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-inner h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Assistant
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {id}
        </span>
      </div>
      
      <div className="flex-1 min-h-0 overflow-hidden">
        {renderSection()}
      </div>
    </div>
  );
};

export default Assistant;