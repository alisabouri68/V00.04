// COMP/MetaPanel.tsx
import { useEffect, useState } from "react";
import {
  Edit3,
  Save,
  ChevronDown,
  ChevronRight,
  FileText,
  Code,
  User,
  Calendar
} from "lucide-react";

interface MetaData {
  model_id?: string;
  model_title?: string;
  model_version?: string;
  model_lastUpgrade?: string;
  model_owner?: string;
  model_type?: string;
  origin_model?: string;
  origin_model_Ver?: string;
  model_rem?: string;
}

function MetaPanel() {
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    details: false,
    remarks: false
  });

  useEffect(() => {
    setMetaData({
      model_id: "WIDGID",
      model_title: "Widget Title",
      model_version: "V00.04",
      model_lastUpgrade: "D2025.07.00",
      model_owner: "smrt00",
      model_type: "Instant",
      origin_model: "COMP",
      origin_model_Ver: "00.04",
      model_rem: "Component Remarks here ..."
    });
    setIsEditing(true);
  }, []);

  const updateMetaData = (field: keyof MetaData, value: string) => {
    if (metaData) {
      setMetaData(prev => ({ ...prev!, [field]: value }));
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!metaData) return null;





  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Meta Info
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-1.5 rounded text-xs ${isEditing
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
            } transition-colors`}
          title={isEditing ? "Save changes" : "Edit meta"}
        >
          {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
        </button>
      </div>

      {/* Basic Information - Always Visible */}
      <div className="space-y-2">
        {/* Model ID */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            ID
          </label>
          {isEditing ? (
            <input
              type="text"
              value={metaData.model_id || ""}
              onChange={(e) => updateMetaData("model_id", e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
              placeholder="WIDGID"
              readOnly
            />
          ) : (
            <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
              {metaData.model_id}
            </div>
          )}
        </div>

        {/* Model Title */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Title
          </label>
          {isEditing ? (
            <input
              type="text"
              value={metaData.model_title || ""}
              onChange={(e) => updateMetaData("model_title", e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              placeholder="Widget Title"
            />
          ) : (
            <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
              {metaData.model_title}
            </div>
          )}
        </div>
      </div>

      {/* Expandable Details Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('details')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <span>Details</span>
          {expandedSections.details ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.details && (
          <div className="space-y-2 pl-2">
            {/* Version */}
            <div>
              <label className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                <Code className="w-3 h-3 mr-1" />
                Version
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={metaData.model_version || ""}
                  onChange={(e) => updateMetaData("model_version", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
                  {metaData.model_version}
                </div>
              )}
            </div>

            {/* Last Upgrade */}
            <div>
              <label className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                <Calendar className="w-3 h-3 mr-1" />
                Last Upgrade
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={metaData.model_lastUpgrade || ""}
                  onChange={(e) => updateMetaData("model_lastUpgrade", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
                  {metaData.model_lastUpgrade}
                </div>
              )}
            </div>

            {/* Owner */}
            <div>
              <label className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                <User className="w-3 h-3 mr-1" />
                Owner
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={metaData.model_owner || ""}
                  onChange={(e) => updateMetaData("model_owner", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                  {metaData.model_owner}
                </div>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={metaData.model_type || ""}
                  onChange={(e) => updateMetaData("model_type", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                  readOnly
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                  {metaData.model_type}
                </div>
              )}
            </div>

            {/* Origin Model */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Origin
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={metaData.origin_model || ""}
                  onChange={(e) => updateMetaData("origin_model", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                  readOnly
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
                  {metaData.origin_model}
                </div>
              )}
            </div>

            {/* Origin Version */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Origin Ver
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={metaData.origin_model_Ver || ""}
                  onChange={(e) => updateMetaData("origin_model_Ver", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                  readOnly
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
                  {metaData.origin_model_Ver}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expandable Remarks Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('remarks')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <span>Remarks & Objectives</span>
          {expandedSections.remarks ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.remarks && (
          <div className="space-y-2 pl-2">
            {/* Remarks */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Remarks
              </label>
              {isEditing ? (
                <textarea
                  value={metaData.model_rem || ""}
                  onChange={(e) => updateMetaData("model_rem", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none"
                  rows={3}
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border min-h-[60px]">
                  {metaData.model_rem || "No remarks"}
                </div>
              )}
            </div>

            {/* Objectives */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Objectives
              </label>
              <div className="p-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded border space-y-1">
                <div className="flex">
                  <span className="text-gray-400 dark:text-gray-500 font-mono mr-2">///</span>
                  <span>1- Template Making for all Component Models</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 dark:text-gray-500 font-mono mr-2">///</span>
                  <span>2- </span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 dark:text-gray-500 font-mono mr-2">///</span>
                  <span>3- </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span className="font-mono">{metaData.model_version}</span>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default MetaPanel;