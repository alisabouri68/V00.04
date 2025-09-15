import { useState } from "react";

interface ParaEditorProps {
  meta?: Record<string, any>;
  geo?: { width?: string; height?: string };
  logic?: { onClick?: 0 | 1; id: string; isAssistant: boolean; addToLocall: boolean };
  style?: { fontSize?: string; color?: string; margin?: string; cursor?: string };
  selectedTab: "meta" | "geo" | "log" | "style";
}

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
    }

    return (
      <div className="bg-light text-dark rounded-lg shadow-sm p2 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-primary m-0">{title}</h3>
          <button
            className={`py-1.5 px-3 rounded text-sm font-medium ${copiedSection === section
                ? 'bg-success text-white'
                : 'bg-primary text-white hover:bg-primary/90 hover:text-dark'
              }`}
            onClick={() => copyToClipboard(formatData(data), section)}
          >
            {copiedSection === section ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <textarea
          readOnly
          className="w-full border border-gray-300 rounded bg-light text-dark font-mono text-sm resize-y custom-scrollbar"
          value={formatData(data)}
          rows={8}
        />
      </div>
    );
  };

  return (
    <div className=" bg-light text-dark rounded-lg font-sans">
      {renderSection(selectedTab)}
    </div>
  );
};
export default ParaEditor;
