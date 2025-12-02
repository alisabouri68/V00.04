// COMP/LogicPanel.tsx
import { useEffect, useState } from "react";
import { absMan, WidgetData } from "ACTR/RACT_absman_V00.04";
import {
  Edit3,
  Save,
  Plus,
  ChevronDown,
  ChevronRight,
  Trash2,
  Settings,
  ListChecks,
  Code,
  RefreshCw,
  X,
  Check
} from "lucide-react";

interface LogicSetting {
  id: string;
  key: string;
  value: boolean | string | number;
  type: 'boolean' | 'string' | 'number';
  description: string;
}

interface LogicPanelProps {
  widgetId?: string;
}

function LogicPanel({ widgetId }: LogicPanelProps) {
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [logicSettings, setLogicSettings] = useState<LogicSetting[]>([]);
  const [tempSettings, setTempSettings] = useState<LogicSetting[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    existing: true,
    addNew: false
  });
  const [newSetting, setNewSetting] = useState({
    key: "",
    type: 'boolean' as 'boolean' | 'string' | 'number',
    value: true as boolean | string | number,
    description: ""
  });

  // گوش دادن به تغییرات ویجت انتخاب شده
  useEffect(() => {
    const loadLogicData = (widget: WidgetData | null) => {
      if (widget) {
        console.log("⚡ LogicPanel: Loading logic for:", widget.name);
        setSelectedWidget(widget);
        
        // تبدیل logic object به array
        const logicArray: LogicSetting[] = [];
        if (widget.logic) {
          Object.entries(widget.logic).forEach(([key, config]: [string, any]) => {
            logicArray.push({
              id: `${key}_${Date.now()}`,
              key,
              value: config.value,
              type: config.type,
              description: config.description || ""
            });
          });
        }
        
        setLogicSettings(logicArray);
        setTempSettings(logicArray);
      } else {
        setSelectedWidget(null);
        setLogicSettings([]);
        setTempSettings([]);
      }
    };

    if (!widgetId) {
      const unsubscribe = absMan.subscribeToSelectedWidget(loadLogicData);
      return () => unsubscribe();
    } else {
      const widget = absMan.getWidgetById(widgetId);
      loadLogicData(widget);
    }
  }, [widgetId]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addSetting = () => {
    if (!newSetting.key.trim()) return;

    const value = newSetting.type === 'boolean' ? true : 
                 newSetting.type === 'number' ? 0 : "";
    
    const newSettingObj: LogicSetting = {
      id: `${newSetting.key}_${Date.now()}`,
      key: newSetting.key.trim(),
      value: value,
      type: newSetting.type,
      description: newSetting.description.trim()
    };

    setTempSettings(prev => [...prev, newSettingObj]);
    setNewSetting({
      key: "",
      type: 'boolean',
      value: true,
      description: ""
    });
    setExpandedSections(prev => ({ ...prev, addNew: false }));
  };

  const updateSetting = (id: string, value: boolean | string | number) => {
    setTempSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  const removeSetting = (id: string) => {
    setTempSettings(prev => prev.filter(setting => setting.id !== id));
  };

  const toggleBoolean = (id: string, currentValue: boolean) => {
    updateSetting(id, !currentValue);
  };

  const handleNumberChange = (id: string, value: string) => {
    const numValue = parseInt(value, 10);
    updateSetting(id, isNaN(numValue) ? 0 : numValue);
  };

  const handleSave = () => {
    if (!selectedWidget) return;

    console.log("💾 Saving logic settings...");
    
    // تبدیل array به object برای absMan
    const logicObject: any = {};
    tempSettings.forEach(setting => {
      logicObject[setting.key] = {
        value: setting.value,
        type: setting.type,
        description: setting.description
      };
    });

    const success = absMan.updateWidgetProps(selectedWidget.id, {
      logic: logicObject
    });

    if (success) {
      console.log("✅ Logic settings saved");
      setLogicSettings(tempSettings);
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

  const handleCancel = () => {
    setTempSettings(logicSettings);
    setIsEditing(false);
  };

  const handleRefresh = () => {
    if (!selectedWidget) return;
    
    const widget = absMan.getWidgetById(selectedWidget.id);
    if (widget) {
      setSelectedWidget(widget);
      
      const logicArray: LogicSetting[] = [];
      if (widget.logic) {
        Object.entries(widget.logic).forEach(([key, config]: [string, any]) => {
          logicArray.push({
            id: `${key}_${Date.now()}`,
            key,
            value: config.value,
            type: config.type,
            description: config.description || ""
          });
        });
      }
      
      setLogicSettings(logicArray);
      setTempSettings(logicArray);
    }
  };

  const applyCommonSetting = (key: string, type: 'boolean' | 'string' | 'number', description: string, defaultValue: any) => {
    setNewSetting({
      key,
      type,
      value: defaultValue,
      description
    });
    setExpandedSections(prev => ({ ...prev, addNew: true }));
  };

  if (!selectedWidget) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <Settings className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Widget Selected
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a widget to edit logic settings
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Logic Settings
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
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded"
                title="Save settings"
              >
                <Check className="w-3 h-3" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded"
                title="Cancel"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded"
              title="Edit settings"
            >
              <Edit3 className="w-3 h-3" />
            </button>
          )}
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
              {tempSettings.length} logic settings
            </p>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {selectedWidget.type}
          </div>
        </div>
      </div>

      {/* Existing Settings Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('existing')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <ListChecks className="w-3 h-3 mr-2" />
            <span>Settings ({tempSettings.length})</span>
          </div>
          {expandedSections.existing ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.existing && (
          <div className="space-y-2">
            {tempSettings.length === 0 ? (
              <div className="p-3 text-center bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No logic settings defined
                </p>
              </div>
            ) : (
              tempSettings.map(setting => (
                <div key={setting.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Code className="w-3 h-3 text-gray-500" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 font-mono">
                          {setting.key}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                          {setting.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {setting.description || "No description"}
                      </p>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeSetting(setting.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Remove setting"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Value Editor */}
                  <div className="mt-2">
                    {setting.type === 'boolean' ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Value:
                        </span>
                        <button
                          onClick={() => toggleBoolean(setting.id, setting.value as boolean)}
                          disabled={!isEditing}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${setting.value ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.value ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ) : setting.type === 'number' ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Value:
                        </span>
                        {isEditing ? (
                          <input
                            type="number"
                            value={setting.value as number}
                            onChange={(e) => handleNumberChange(setting.id, e.target.value)}
                            className="w-24 p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                          />
                        ) : (
                          <span className="text-xs font-medium text-gray-900 dark:text-white">
                            {setting.value}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Value:
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={setting.value as string}
                            onChange={(e) => updateSetting(setting.id, e.target.value)}
                            className="w-32 p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        ) : (
                          <span className="text-xs font-medium text-gray-900 dark:text-white max-w-[120px] truncate">
                            {setting.value}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add New Setting Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('addNew')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <Plus className="w-3 h-3 mr-2" />
            <span>Add New Setting</span>
          </div>
          {expandedSections.addNew ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.addNew && (
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600 space-y-3">
            {/* Key */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Setting Key
              </label>
              <input
                type="text"
                value={newSetting.key}
                onChange={(e) => setNewSetting(prev => ({ ...prev, key: e.target.value }))}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="e.g., isEnabled, maxItems"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </label>
              <div className="flex gap-1">
                {(['boolean', 'string', 'number'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setNewSetting(prev => ({ ...prev, type }))}
                    className={`flex-1 px-2 py-1.5 text-xs rounded border ${newSetting.type === type
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newSetting.description}
                onChange={(e) => setNewSetting(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="What does this setting do?"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={addSetting}
                disabled={!newSetting.key.trim()}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
              >
                Add Setting
              </button>
              <button
                onClick={() => {
                  setNewSetting({
                    key: "",
                    type: 'boolean',
                    value: true,
                    description: ""
                  });
                  setExpandedSections(prev => ({ ...prev, addNew: false }));
                }}
                className="flex-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Common Settings */}
      {isEditing && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
            Common Settings
          </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => applyCommonSetting("isEnabled", 'boolean', "Enable the component", true)}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition-colors"
            >
              isEnabled
            </button>
            <button
              onClick={() => applyCommonSetting("autoSave", 'boolean', "Auto-save changes", false)}
              className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
            >
              autoSave
            </button>
            <button
              onClick={() => applyCommonSetting("timeout", 'number', "Timeout in milliseconds", 5000)}
              className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 rounded transition-colors"
            >
              timeout
            </button>
            <button
              onClick={() => applyCommonSetting("theme", 'string', "Component theme", "dark")}
              className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded transition-colors"
            >
              theme
            </button>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div>
          <span>Total settings: {tempSettings.length}</span>
          {tempSettings.filter(s => s.type === 'boolean').length > 0 && (
            <span className="ml-2">
              Toggles: {tempSettings.filter(s => s.type === 'boolean').length}
            </span>
          )}
        </div>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default LogicPanel;