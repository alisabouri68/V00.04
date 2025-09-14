import { ChangeEvent, useState, useMemo, useCallback, memo } from "react";
import { useGlobalState } from "RDUX/dynamanContext";

interface AssistantProps {
  geo?: Record<string, any>;
  logic?: { id: string;[key: string]: any };
  style?: Record<string, any>;
}

const Section = memo(({
  title,
  data,
  section,
  icon,
  onChange
}: {
  title: string;
  data: Record<string, any>;
  section: "geo" | "logic" | "style";
  icon: string;
  onChange: (section: "geo" | "logic" | "style", key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  const safeData = data || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
      <button
        className="w-full flex items-center justify-between p-3 text-left font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 text-primary-600 dark:text-primary-400">{icon}</span>}
          <span className="text-md">{title}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-3 pt-1 space-y-3 border-t border-gray-100 dark:border-gray-700">
          {Object.entries(safeData).length > 0 ? (
            Object.entries(safeData).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 flex items-center">
                  <span className="bg-gray-100 dark:bg-gray-700 rounded px-1.5 py-0.5 text-xs mr-2">{key}</span>
                  <span className="truncate text-xs opacity-70">{typeof value}</span>
                </label>
                <input
                  type="text"
                  value={value ?? ""}
                  className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition text-sm"
                  onChange={onChange(section, key)}
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-3 text-gray-500 dark:text-gray-400 text-sm">
              No {title.toLowerCase()} properties available
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Section.displayName = 'Section';

const StylePanel = ({ geo, logic, style }: AssistantProps) => {
  const { globalState, updateGlobalState } = useGlobalState();
  const id = logic?.id || "";

  const assistant = useMemo(() =>
    globalState?.ENVI_glob?.glob_Packet_4?.[id]?.content?.logic?.isAssistant,
    [globalState, id]
  );

  const content = useMemo(() => {
    const contentData = globalState?.ENVI_glob?.glob_Packet_4?.[id]?.content;
    return {
      geo: contentData?.geo || {},
      logic: contentData?.logic || {},
      style: contentData?.style || {},
    };
  }, [globalState, id]);

  const handleChange = useCallback((section: "geo" | "logic" | "style", key: string) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      updateGlobalState((prev: any) => ({
        ...prev,
        ENVI_glob: {
          ...prev?.ENVI_glob,
          glob_Packet_4: {
            ...prev?.ENVI_glob?.glob_Packet_4,
            [id]: {
              ...prev?.ENVI_glob?.glob_Packet_4?.[id],
              content: {
                ...prev?.ENVI_glob?.glob_Packet_4?.[id]?.content,
                [section]: {
                  ...prev?.ENVI_glob?.glob_Packet_4?.[id]?.content?.[section],
                  [key]: newValue,
                },
              },
            },
          },
        },
      }));
    }, [id, updateGlobalState]);

  if (!id || !assistant) {
    return (
      <div className="flex items-center justify-center h-full p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-sm">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="mx-auto w-14 h-14 mb-3 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm">No component selected or assistant not enabled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
          Para Assistant
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Editing: {id}</p>
      </div>

      <div className="overflow-y-auto flex-grow pr-1 custom-scrollbar">
        <Section title="Props Geo" data={content.geo} section="geo" icon="" onChange={handleChange} />
        <Section title="Props Logic" data={content.logic} section="logic" icon="" onChange={handleChange} />
        <Section title="Props Style" data={content.style} section="style" icon="" onChange={handleChange} />
      </div>
    </div>
  );
};

export default StylePanel;
