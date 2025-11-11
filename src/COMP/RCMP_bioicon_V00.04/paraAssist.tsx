// COMP/RCMP_assistant_V00.04/index.tsx
import { ChangeEvent, useCallback, memo, useState, useEffect } from "react";
import Button from "COMP/RCMP_button_V00.04/index";

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
      <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
          No properties available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
      <div className="p-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {Object.entries(safeData).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
              <span className="truncate">{key}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                {typeof value}
              </span>
            </label>

            <input
              type="text"
              value={value ?? ""}
              className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         transition-all duration-200"
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

// نوع داده برای ویجت فعال
interface ActiveWidget {
  componentId: string;
  widgetIndex: number;
  widgetType: string;
  props: {
    meta?: any;
    geo?: any;
    logic?: any;
    style?: any;
  };
}

const Assistant = () => {
  const [activeWidget, setActiveWidget] = useState<ActiveWidget | null>(null);
  const [currentSection, setCurrentSection] = useState<"meta" | "geo" | "logic" | "style">("meta");

  // گوش دادن به کلیک‌های ویجت
  useEffect(() => {
    const handleWidgetClick = (event: CustomEvent) => {
      const { componentId, widgetIndex, widgetType, props } = event.detail;
      setActiveWidget({
        componentId,
        widgetIndex,
        widgetType,
        props: props || {}
      });
    };

    window.addEventListener('widgetClick', handleWidgetClick as EventListener);
    return () => {
      window.removeEventListener('widgetClick', handleWidgetClick as EventListener);
    };
  }, []);

  const handleChange = useCallback(
    (section: "meta" | "geo" | "logic" | "style", key: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!activeWidget) return;

        const newValue = e.target.value;
        console.log(`Changing ${section}.${key} to:`, newValue);

        // می‌توانید اینجا منطق ذخیره‌سازی اضافه کنید
      },
    [activeWidget]
  );

  const handleDeactivate = () => {
    setActiveWidget(null);
  };

  if (!activeWidget) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">💡</span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Assistant is inactive
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
            Click on any widget to inspect its properties
          </p>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
            <p>Click widgets in the main view</p>
          </div>
        </div>
      </div>
    );
  }

  const content = activeWidget.props || {};
  const sectionTitles = {
    meta: "Meta",
    geo: "Geo",
    logic: "Logic",
    style: "Style"
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Widget Inspector
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              {activeWidget.widgetType}
            </span>
            <button
              onClick={handleDeactivate}
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Component: {activeWidget.componentId}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Widget Index: #{activeWidget.widgetIndex + 1}
          </p>
        </div>
      </div>

      {/* Section Buttons */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
        <div className="flex gap-1">
          {(["meta", "geo", "logic", "style"] as const).map((section) => (
            <Button
              key={section}
              fullWidth={true}
              buttunTitle={sectionTitles[section]}
              variant={currentSection === section ? "filled" : "outlined"}
              onClick={() => setCurrentSection(section)}
              className="text-xs py-1.5"
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-h-0 p-3">
        <Section
          title={`${sectionTitles[currentSection]} Properties`}
          data={content[currentSection] || {}}
          section={currentSection}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Assistant;