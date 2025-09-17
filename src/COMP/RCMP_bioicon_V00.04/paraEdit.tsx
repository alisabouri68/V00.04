//@ts-nocheck
/******************************************
Editor Templates

Last Update:    2025.09.15
By:             APPS.68

Description:  This templates is used for developing React Components according to Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_template 
Title:          Component Template - React Version
Version:        V00.04
VAR:            01 (remarks ....)

last-update:    D2025.09.15
owner:          APPS.68

Description:    Here ...

------------------------------------------------------------*/

/**************************************
 * Step 01 import dependencies - kernels
 **************************************/
import { useState } from "react";

/**************************************
 * Step 05 - define property interface for this BioWidget
 **************************************/
interface ParaEditorProps {
  meta?: Record<string, any>;
  geo?: { width?: string; height?: string };
  logic?: { onClick?: 0 | 1; id: string; isAssistant: boolean; addToLocall: boolean };
  style?: { fontSize?: string; color?: string; margin?: string; cursor?: string };
  selectedTab: "meta" | "geo" | "log" | "style";
}

/**************************************
 * Step 07 - Class Component should be defined
 **************************************/
const ParaEditor: React.FC<ParaEditorProps> = ({ meta, geo, logic, style, selectedTab }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const formatData = (data: Record<string, any> | undefined): string => {
    if (!data) return "{}";
    return JSON.stringify(data, null, 2);
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Function to render a specific section
  const renderSection = (section: "meta" | "geo" | "log" | "style") => {
    let title: string;
    let data: Record<string, any> | undefined;

    switch (section) {
      case "meta":
        title = "Meta Data";
        data = meta;
        break;
      case "geo":
        title = "Geo Data";
        data = geo;
        break;
      case "log":
        title = "Logic Data";
        data = logic;
        break;
      case "style":
        title = "Style Data";
        data = style;
        break;
      default:
        title = "Data";
        data = {};
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-full w-full border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
        {/* <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 m-0">
            {title}
          </h3>
          <button
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${copiedSection === section
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              }`}
            onClick={() => copyToClipboard(formatData(data), section)}
          >
            {copiedSection === section ? 'Copied!' : 'Copy JSON'}
          </button>
        </div> */}
        <div className="relative h-full">
          <textarea
            readOnly
            className="w-full h-full border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono text-sm 
                       p-3 resize-none custom-scrollbar leading-relaxed"
            value={formatData(data)}
            rows={12}
          />
          {!data || Object.keys(data).length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 bg-opacity-80 rounded-md">
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
    <div className="flex items-center justify-center w-full bg-gray-50 dark:bg-gray-900 rounded-lg font-sans h-full p-3">
      {renderSection(selectedTab)}
    </div>
  );
};

export default ParaEditor;