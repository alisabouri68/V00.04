/******************************************
 * Component:      Assistant
 * Last Update:    2025.09.17
 * By:             apps.68 + ChatGPT
 *
 * Description:
 *   Dynamic Assistant component for inspecting and editing
 *   different sections (meta, geo, logic, style) of the app state.
 *   Includes:
 *     - Section rendering with editable fields
 *     - Safe handling of empty sections
 *     - Integration with Dyna context (initDyna)
 *     - Dark/Light theme styling
 ******************************************/

/*------------------------------------------------------------
 * Meta Data
 * ID:             RCMP_assistant
 * Title:          Component Assistant - React Version
 * Version:        V00.03
 * VAR:            01
 * last-update:    D2025.09.17
 * owner:          apps.68
 * Description:    React-based Assistant for inspecting sections
 *                 of Dyna context with editable properties.
 ------------------------------------------------------------*/

/**************************************
 * Step 01: Import core dependencies
 **************************************/
import { ChangeEvent, useMemo, useCallback, memo } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

/**************************************
 * Step 02: Define property interfaces
 **************************************/
interface AssistantProps {
  logic?: { id: string;[key: string]: any };
  geo?: { id: string;[key: string]: any };
  style?: { id: string;[key: string]: any };
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

/**************************************
 * Step 03: Section component
 * - Renders editable properties for each section
 * - Handles empty states gracefully
 **************************************/
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

/**************************************
 * Step 04: Assistant component
 **************************************/
const Assistant = ({ logic }: AssistantProps) => {
  /******************************************
   * Step 04-1: Context initialization
   ******************************************/
  const { envi, reconfigDyna } = initDyna();
  const id = logic?.id || "";
  const currentSection =
    envi?.ENVI_GLOB?.globalState?.assistant?.section || "meta";

  /******************************************
   * Step 04-2: Check assistant state
   ******************************************/
  const assistants = useMemo(
    () => envi?.ENVI_GLOB?.globalState?.[id]?.logic?.isAssistant,
    [envi, id]
  );


  /******************************************
   * Step 04-3: Prepare section content
   ******************************************/
  const content = useMemo(() => {
    const contentData = envi?.ENVI_GLOB?.globalState?.[id];
    return {
      meta: contentData?.meta || {},
      geo: contentData?.geo || {},
      logic: contentData?.logic || {},
      style: contentData?.style || {},
    };
  }, [envi, id]);

  /******************************************
   * Step 04-4: Handle input changes
   ******************************************/
  const handleChange = useCallback(
    
    (section: "meta" | "geo" | "logic" | "style", key: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
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

  /******************************************
   * Step 04-5: Guard - no assistant
   ******************************************/
  if (!id || !assistants) {
    return (
      <div className="flex items-center justify-center h-full p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm italic">
            No component selected or assistant not enabled
          </p>
        </div>
      </div>
    );
  }
console.log("Assistant id:", id);
console.log("Assistant globalState:", envi?.ENVI_GLOB?.globalState?.[id]);
console.log("Assistant flag:", assistants);
  /******************************************
   * Step 04-6: Render sections dynamically
   ******************************************/
  const renderSection = () => {
    switch (currentSection) {
      case "meta":
        return (
          <Section
            title="Meta Properties"
            data={content.meta}
            section="meta"
            onChange={handleChange}
          />
        );
      case "geo":
        return (
          <Section
            title="Geo Properties"
            data={content.geo}
            section="geo"
            onChange={handleChange}
          />
        );
      case "logic":
        return (
          <Section
            title="Logic Properties"
            data={content.logic}
            section="logic"
            onChange={handleChange}
          />
        );
      case "style":
        return (
          <Section
            title="Style Properties"
            data={content.style}
            section="style"
            onChange={handleChange}
          />
        );
      default:
        return (
          <Section
            title="Meta Properties"
            data={content.meta}
            section="meta"
            onChange={handleChange}
          />
        );
    }
  };

  /******************************************
   * Step 04-7: Final rendering
   ******************************************/
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-inner h-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-hidden">
        {renderSection()}
      </div>
    </div>
  );
};

export default Assistant;