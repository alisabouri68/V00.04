//@ts-nocheck
import { ChangeEvent, useMemo, useCallback, memo } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import Button from "COMP/RCMP_button_V00.04/index";

interface AssistantProps {
  logic?: { id: string;[key: string]: any };
}

interface SectionProps {
  title: string;
  data: Record<string, any>;
  section: "meta" | "geo" | "logic" | "style";
  onChange: (
    section: "meta" | "geo" | "logic" | "style",
    key: string
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
}

const Section = memo(({ title, data, section, onChange }: SectionProps) => {
  const safeData = data || {};

  if (Object.keys(safeData).length === 0) {
    return (
      <div className="bg-white h-full w-full dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-700">
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
    <div className="flex flex-col w-full bg-light dark:bg-gray-800 rounded-xl p-2 shadow-md h-full overflow-y-auto custom-scrollbar 
                    border border-gray-200 dark:border-gray-700 overflow-hidden">
      <h3 className="text-md text-primary font-semibold dark:text-gray-100 mb-4">
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

  const assistantState = envi?.ENVI_GLOB?.globalState?.assistant || {};
  const id = logic?.id || assistantState.id;

  const isAssistantActive = useMemo(() => {
    if (!id) return false;
    const componentData = envi?.ENVI_GLOB?.globalState?.[id];
    return (
      componentData?.logic?.isAssistant && assistantState.id === id
    );
  }, [envi, id, assistantState.id]);

  const currentSection = assistantState.section || "meta";

  const content = useMemo(() => {
    if (!id)
      return { meta: {}, geo: {}, logic: {}, style: {} };

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


  const handleSectionChange = (section: "meta" | "geo" | "logic" | "style") => {
    reconfigDyna((prev: any) => ({
      ...prev,
      ENVI_GLOB: {
        ...prev.ENVI_GLOB,
        globalState: {
          ...prev.ENVI_GLOB.globalState,
          assistant: {
            ...prev.ENVI_GLOB.globalState.assistant,
            section,
          },
        },
      },
    }));
  };

  if (!id || !isAssistantActive) {
    return (
      <div className="flex w-full grow items-center justify-center h-full p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm italic mb-2">Assistant is inactive</p>
          <div className="text-xs space-y-1">
            <p>Click on any icon to activate</p>
            <p>Current ID: {id || "none"}</p>
            <p>Status: {isAssistantActive ? "active" : "inactive"}</p>
          </div>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    const sections = {
      meta: { title: "Meta Properties", data: content.meta },
      geo: { title: "Geo Properties", data: content.geo },
      logic: { title: "Logic Properties", data: content.logic },
      style: { title: "Style Properties", data: content.style },
    };

    const current = sections[currentSection] || sections.meta;

    return (
      <Section
        title={current.title}
        data={current.data}
        section={currentSection}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="flex flex-col p-2 grow w-full h-full overflow-hidden bg-gray-50  dark:bg-gray-900 rounded-xl shadow-inner ">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Assistant
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{id}</span>
      </div>

      {/* 🟢 دکمه‌های تغییر بخش */}
      <div className="flex justify-around mb-4 gap-1 w-full">
        {["meta", "geo", "logic", "style"].map((section) => (

          <Button
            fullWidth={true}
            buttunTitle={section.toUpperCase()}
            variant={currentSection === section?"filled":"outlined"}
            key={section}
            onClick={() => handleSectionChange(section as any)}
            
          >

          </Button>
        ))}
      </div>

      {/* 🟢 محتوای بخش */}
      <div className="flex w-full h-full">
        {renderSection()}
      </div>
    </div>
  )

}
export default Assistant;
