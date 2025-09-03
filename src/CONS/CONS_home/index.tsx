import { useState, useEffect, useRef } from "react";
import Auxilary from "../../BOX/BOX_auxiliary";
import Action from "../../BOX/BOX_action";
import { useGlobalState } from "../../RDUX/dynamanContext";
import Button from "../../COMP/RCMP_button_V00.04";
import Buttons from "../../COMP/RCMP_buttonTest_V00.04";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Avatar from "../../COMP/avatar";
// Define TypeScript interfaces for the component data structure
interface ComponentHead {
  model?: string;
  by?: string;
  "last update"?: string;
}

interface ComponentMeta {
  [key: string]: string | undefined;
}

interface ComponentGeo {
  [key: string]: string | undefined;
}

interface ComponentLog {
  [key: string]: string | undefined;
}

interface ComponentStyle {
  [key: string]: string | undefined;
}

interface ComponentSections {
  id?: {
    meta?: ComponentMeta;
  };
  MNGT?: Record<string, unknown>;
  LOGIC?: {
    geo?: ComponentGeo;
    log?: ComponentLog;
    style?: ComponentStyle;
  };
  BODY?: Record<string, unknown>;
}

interface ComponentData {
  head?: ComponentHead;
  sections?: ComponentSections;
}

const DynamicComponentInspector = () => {
  const { globalState, updateGlobalState } = useGlobalState();
  const [selectedPanel, setSelectedPanel] = useState("paraAssistant");
  const [activeTab, setActiveTab] = useState("meta");
  const [previewMode, setPreviewMode] = useState("design");
  const [currentComponent, setCurrentComponent] = useState<string | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  // Update global state when no component is selected
  useEffect(() => {
    if (!currentComponent) {
      updateGlobalState({ filed6: {} });
    }
  }, [currentComponent, updateGlobalState]);

  // Simulate click on component when it's selected
  useEffect(() => {
    if (currentComponent && componentRef.current) {
      // Find the component element and trigger its click event
      const componentElement = componentRef.current.querySelector('[data-component]');
      if (componentElement) {
        (componentElement as HTMLElement).click();
      }
    }
  }, [currentComponent]);

  // Get component data from global state with proper typing
  const componentData: ComponentData = globalState.filed6 || {
    head: {},
    sections: {
      id: {
        meta: {},
      },
      MNGT: {},
      LOGIC: {
        geo: {},
        log: {},
        style: {},
      },
      BODY: {},
    },
  };

  const tabs = [
    { id: "meta", label: "Meta" },
    { id: "geo", label: "Geometry" },
    { id: "logic", label: "Logic" },
    { id: "style", label: "Style" },
  ];

  // Available components for the dropdown
  const availableComponents = [
    {
      id: "button",
      name: "Button",
      icon: "🔘",
      component:<div>
       <Buttons jsonAdd={true}  buttunTitle="Sample Button" data-component="true"  />
      </div>,
    },
    {
      id: "avatar",
      name: "Avatar",
      icon: "👤",
      component: <Avatar jsonAdd={true} data-component="true" />,
    },
  ];

  // Function to handle selecting a component
  const handleSelectComponent = (compId: string) => {
    setCurrentComponent(compId);
  };

  // Function to clear the current component
  const handleClearComponent = () => {
    setCurrentComponent(null);
  };

  // Function to dynamically generate content string for any object
  const generateContentString = (tab: string, data: ComponentData): string => {
    let sectionHeader = "";
    let sectionData: Record<string, string | undefined> = {};

    // Determine which section to use based on tab
    switch (tab) {
      case "meta":
        sectionHeader = "ID";
        sectionData = data.sections?.id?.meta || {};
        break;
      case "geo":
        sectionHeader = "GEO";
        sectionData = data.sections?.LOGIC?.geo || {};
        break;
      case "logic":
        sectionHeader = "LOGIC";
        sectionData = data.sections?.LOGIC?.log || {};
        break;
      case "style":
        sectionHeader = "STYLE";
        sectionData = data.sections?.LOGIC?.style || {};
        break;
      default:
        sectionHeader = "UNKNOWN";
        sectionData = {};
    }

    // Start building the content string
    let contentString = `>>> ${sectionHeader}\n # ${tab}\n`;

    // Add all key-value pairs dynamically
    Object.entries(sectionData).forEach(([key, value]) => {
      const displayValue =
        value === "" || value === null || value === undefined ? "N/A" : value;
      const padding = Math.max(1, 20 - key.length);
      contentString += `   .${key}:${" ".repeat(padding)}${displayValue}\n`;
    });

    // Add closing arrow
    contentString += "-->";

    return contentString;
  };

  // Render the component dropdown
  const renderComponentDropdown = () => {
    return (
      <div className="mb-4 bg-light text-dark">
        <div className="relative">
          <select
            value={currentComponent || ""}
            onChange={(e) => {
              if (e.target.value) {
                handleSelectComponent(e.target.value);
              }
            }}
            className="w-full pl-3 pr-10 py-2 bg-light text-dark text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border  appearance-none"
          >
            <option value="" disabled>Select a component to display</option>
            {availableComponents.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.icon} {comp.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <p className="text-xs  mt-2">
          Select a component from the dropdown to display it and automatically trigger its onClick event
        </p>
      </div>
    );
  };

  // Render the current component
  const renderCurrentComponent = () => {
    if (!currentComponent) {
      return (
        <div className="text-center py-8 ">
          <div className="text-4xl mb-2">📦</div>
          <p>No component selected</p>
          <p className="text-sm">
            Select a component from the dropdown to display it
          </p>
        </div>
      );
    }

    const comp = availableComponents.find((c) => c.id === currentComponent);
    
    return (
      <div ref={componentRef} className="bg-light text-dark p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-xl mr-2">{comp?.icon || "📦"}</span>
            <div className="font-medium">{comp?.name || "Component"}</div>
          </div>
          <button
            className="text-red-500 hover:text-red-700 text-lg"
            onClick={handleClearComponent}
          >
            ✕
          </button>
        </div>
        <div className="border-t pt-3">
          {comp?.component || <div>Component not found</div>}
        </div>
      </div>
    );
  };

  return (
    <>
      <main className="flex w-full lg:w-9/12 h-full py-0 px-0.5 lg:py-1">
        <Action
          ActionContent={
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b ">
                <div>
                  <h2 className="text-xl font-bold ">
                    {componentData.head?.model || "Component Inspector"}
                  </h2>
                  <p className="text-sm ">
                    By: {componentData.head?.by || "Unknown"} • Last update:{" "}
                    {componentData.head?.["last update"] || "N/A"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={previewMode === "design" ? "filled" : "outlined"}
                    buttunTitle="Design"
                    onClick={() => setPreviewMode("design")}
                  />
                  <Button
                    variant={previewMode === "code" ? "filled" : "outlined"}
                    buttunTitle="Code"
                    onClick={() => setPreviewMode("code")}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                {previewMode === "design" ? (
                  <div className="h-full">
                    {renderComponentDropdown()}

                    <div className="bg-light text-dark rounded-xl shadow-sm p-4 h-3/4 overflow-y-auto custom-scrollbar">
                      <h3 className="font-medium mb-4">
                        Component Display
                      </h3>
                      {renderCurrentComponent()}
                    </div>
                  </div>
                ) : (
                  <div className="h-full bg-dark rounded-xl overflow-hidden">
                    <SyntaxHighlighter
                      language="javascript"
                      style={vscDarkPlus}
                      className="h-full custom-scrollbar"
                      customStyle={{
                        margin: 0,
                        padding: "16px",
                        fontSize: "14px",
                        borderRadius: "12px",
                        height: "100%",
                      }}
                    >
                      {JSON.stringify(componentData, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t  flex justify-between items-center">
                <div className="text-sm">
                  ID: {componentData.sections?.id?.meta?.id || "N/A"} • Version:{" "}
                  {componentData.sections?.id?.meta?.ver || "N/A"}
                </div>
                <div className="flex gap-2">
                  <Button buttunTitle="Save" variant="filled" />
                  <Button buttunTitle="Reset" variant="outlined" />
                </div>
              </div>
            </div>
          }
        />
      </main>

      <div className="w-full hidden lg:flex lg:w-3/12 px-0.5 py-1">
        <Auxilary>
          <div className="flex items-center justify-around gap-1 mb-4">
            <Button
              variant={
                selectedPanel === "paraAssistant" ? "filled" : "outlined"
              }
              buttunTitle="para assistant"
              onClick={() => setSelectedPanel("paraAssistant")}
              fullWidth
            />
            <Button
              variant={selectedPanel === "paraEditor" ? "filled" : "outlined"}
              buttunTitle="para editor"
              onClick={() => setSelectedPanel("paraEditor")}
              fullWidth
            />
          </div>

          {selectedPanel === "paraAssistant" && (
            <>
              <div className="flex items-center gap-1 w-full *:flex-1 mb-4">
                {tabs.map((tab) => (
                  <div key={tab.id}>
                    <Button
                      buttunTitle={tab.label}
                      fullWidth
                      variant={activeTab === tab.id ? "filled" : "outlined"}
                      onClick={() => setActiveTab(tab.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  className="custom-scrollbar h-full overflow-auto"
                  customStyle={{
                    margin: 0,
                    padding: "16px",
                    fontSize: "14px",
                    borderRadius: "12px",
                    minHeight: "75vh",
                  }}
                >
                  {generateContentString(activeTab, componentData)}
                </SyntaxHighlighter>
              </div>
            </>
          )}

          {selectedPanel === "paraEditor" && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Raw JSON Editor</h3>
    <textarea
  className="w-full h-64 p-3 border rounded text-sm font-mono bg-light text-dark custom-scrollbar"
  value={JSON.stringify(componentData, null, 2)}
  onChange={(e) => {
    try {
      const parsed = JSON.parse(e.target.value);
      updateGlobalState({ filed6: parsed });
    } catch (err) {
      console.error("JSON parse error:", err);
    }
  }}
/>

              <div className="flex gap-2 mt-3">
                <Button
                  buttunTitle="Apply"
                  variant="filled"
                  fullWidth
                />
                <Button buttunTitle="Reset" variant="outlined" fullWidth />
              </div>
            </div>
          )}
        </Auxilary>
      </div>
    </>
  );
};

export default DynamicComponentInspector;