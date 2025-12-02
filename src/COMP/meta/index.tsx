// COMP/MetaPanel.tsx
import { useEffect, useState } from "react";
import { absMan, WidgetData } from "ACTR/RACT_absman_V00.04";
import {
  Edit3,
  Save,
  ChevronDown,
  ChevronRight,
  FileText,
  Code,
  User,
  Calendar,
  RefreshCw
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

interface MetaPanelProps {
  widgetId?: string;
}

function MetaPanel({ widgetId }: MetaPanelProps) {
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    details: false,
    remarks: false
  });

  // گوش دادن به تغییرات ویجت انتخاب شده
  useEffect(() => {
    if (!widgetId) {
      const unsubscribe = absMan.subscribeToSelectedWidget((widget) => {
        console.log("📝 MetaPanel: Widget update received:", widget?.name);
        if (widget) {
          setSelectedWidget(widget);
          setMetaData(widget.meta || {
            model_id: widget.id,
            model_title: widget.name,
            model_version: widget.version,
            model_owner: widget.author,
            model_type: widget.type,
            origin_model: widget.name,
            origin_model_Ver: widget.version
          });
        } else {
          setSelectedWidget(null);
          setMetaData(null);
        }
      });

      return () => unsubscribe();
    } else {
      // اگر widgetId مستقیم داده شده باشد
      const widget = absMan.getWidgetById(widgetId);
      if (widget) {
        setSelectedWidget(widget);
        setMetaData(widget.meta || {
          model_id: widget.id,
          model_title: widget.name,
          model_version: widget.version,
          model_owner: widget.author,
          model_type: widget.type,
          origin_model: widget.name,
          origin_model_Ver: widget.version
        });
      }
    }
  }, [widgetId]);

  const updateMetaData = (field: keyof MetaData, value: string) => {
    if (!metaData || !selectedWidget) return;

    const newMetaData = { ...metaData, [field]: value };
    setMetaData(newMetaData);

    // ذخیره در absMan
    if (isEditing) {
      absMan.updateWidgetProps(selectedWidget.id, {
        meta: newMetaData
      });
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = () => {
    if (!selectedWidget || !metaData) return;

    console.log("💾 Saving meta data...");
    const success = absMan.updateWidgetProps(selectedWidget.id, {
      meta: metaData
    });

    if (success) {
      console.log("✅ Meta data saved");
      setIsEditing(false);
      
      // ویجت آپدیت شده را بگیر
      setTimeout(() => {
        const updated = absMan.getWidgetById(selectedWidget.id);
        if (updated) {
          setSelectedWidget(updated);
        }
      }, 100);
    }
  };

  const handleRefresh = () => {
    if (!selectedWidget) return;
    
    const widget = absMan.getWidgetById(selectedWidget.id);
    if (widget) {
      setSelectedWidget(widget);
      setMetaData(widget.meta || {
        model_id: widget.id,
        model_title: widget.name,
        model_version: widget.version,
        model_owner: widget.author,
        model_type: widget.type,
        origin_model: widget.name,
        origin_model_Ver: widget.version
      });
    }
  };

  if (!selectedWidget || !metaData) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Widget Selected
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a widget to view meta information
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Meta Information
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleRefresh}
            className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            title="Refresh"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`p-1.5 rounded text-xs ${isEditing
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              } transition-colors`}
            title={isEditing ? "Save changes" : "Edit meta"}
          >
            {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Widget Info Banner */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {selectedWidget.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {selectedWidget.type} • v{selectedWidget.version}
            </p>
          </div>
          <span className={`px-2 py-1 text-xs rounded ${
            selectedWidget.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}>
            {selectedWidget.status}
          </span>
        </div>
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
              className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              placeholder="WIDGID"
            />
          ) : (
            <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
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
              className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Widget Title"
            />
          ) : (
            <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
              {metaData.model_title || selectedWidget.name}
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
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="V00.04"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
                  {metaData.model_version || selectedWidget.version}
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
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="D2025.07.00"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
                  {metaData.model_lastUpgrade || "Not set"}
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
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Owner name"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                  {metaData.model_owner || selectedWidget.author}
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
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Instant"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                  {metaData.model_type || selectedWidget.type}
                </div>
              )}
            </div>

            {/* Origin Model */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Origin Model
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={metaData.origin_model || ""}
                  onChange={(e) => updateMetaData("origin_model", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="COMP"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
                  {metaData.origin_model || selectedWidget.name}
                </div>
              )}
            </div>

            {/* Origin Version */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Origin Version
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={metaData.origin_model_Ver || ""}
                  onChange={(e) => updateMetaData("origin_model_Ver", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="00.04"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border font-mono">
                  {metaData.origin_model_Ver || selectedWidget.version}
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
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none"
                  rows={3}
                  placeholder="Add remarks about this widget..."
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border min-h-[60px]">
                  {metaData.model_rem || "No remarks provided"}
                </div>
              )}
            </div>

            {/* Objectives (Read-only) */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Objectives
              </label>
              <div className="p-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded border space-y-1">
                <div className="flex">
                  <span className="text-gray-400 dark:text-gray-500 font-mono mr-2">►</span>
                  <span>Template Making for all Component Models</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 dark:text-gray-500 font-mono mr-2">►</span>
                  <span>Reusable and customizable widgets</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 dark:text-gray-500 font-mono mr-2">►</span>
                  <span>Easy integration with existing systems</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="font-mono">{metaData.model_version || selectedWidget.version}</span>
          <span className="text-gray-400">•</span>
          <span>Last modified: {new Date(selectedWidget.lastModified).toLocaleTimeString()}</span>
        </div>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default MetaPanel;