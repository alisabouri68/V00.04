// COMP/LogicPanel.tsx
import { useEffect, useState } from "react";
import {
  Edit3,
  Save,
  Plus,
  ChevronDown,
  ChevronRight,
  Trash2,
  Settings,
  ListChecks,
  Code
} from "lucide-react";

interface LogicSetting {
  id: string;
  key: string;
  value: boolean | string | number;
  type: 'boolean' | 'string' | 'number';
  description: string;
}

function LogicPanel() {
  const [settings, setSettings] = useState<LogicSetting[]>([]);
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

  useEffect(() => {
    // Load sample logic settings from widget
    setSettings([
      {
        id: "1",
        key: "isActive",
        value: true,
        type: 'boolean',
        description: "Enable/disable component"
      },
      {
        id: "2",
        key: "autoUpdate",
        value: false,
        type: 'boolean',
        description: "Automatically update data"
      },
      {
        id: "3",
        key: "maxRetries",
        value: 3,
        type: 'number',
        description: "Maximum retry attempts"
      },
      {
        id: "4",
        key: "theme",
        value: "dark",
        type: 'string',
        description: "Component theme"
      }
    ]);
    setIsEditing(true);
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addSetting = () => {
    if (newSetting.key.trim()) {
      const value = newSetting.type === 'boolean' ? true : 
                   newSetting.type === 'number' ? 0 : "";
      
      setSettings(prev => [...prev, {
        id: Date.now().toString(),
        key: newSetting.key.trim(),
        value: value,
        type: newSetting.type,
        description: newSetting.description.trim()
      }]);
      setNewSetting({
        key: "",
        type: 'boolean',
        value: true,
        description: ""
      });
      setExpandedSections(prev => ({ ...prev, addNew: false }));
    }
  };

  const updateSetting = (id: string, value: boolean | string | number) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  const removeSetting = (id: string) => {
    setSettings(prev => prev.filter(setting => setting.id !== id));
  };

  const toggleBoolean = (id: string, currentValue: boolean) => {
    updateSetting(id, !currentValue);
  };

  const handleNumberChange = (id: string, value: string) => {
    // Convert string to number, default to 0 if invalid
    const numValue = parseInt(value, 10);
    updateSetting(id, isNaN(numValue) ? 0 : numValue);
  };

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Logic Settings
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-1.5 rounded text-xs ${isEditing
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
            } transition-colors`}
          title={isEditing ? "Save settings" : "Edit settings"}
        >
          {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
        </button>
      </div>

      {/* Existing Settings Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('existing')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <ListChecks className="w-3 h-3 mr-2" />
            <span>Settings ({settings.length})</span>
          </div>
          {expandedSections.existing ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.existing && (
          <div className="space-y-2">
            {settings.length === 0 ? (
              <div className="p-3 text-center bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No logic settings defined
                </p>
              </div>
            ) : (
              settings.map(setting => (
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
                        {setting.description}
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
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
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
                      ? 'bg-gray-800 text-white border-gray-800 dark:bg-gray-600 dark:border-gray-600'
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
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                placeholder="What does this setting do?"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={addSetting}
                disabled={!newSetting.key.trim()}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
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
              onClick={() => setNewSetting({
                key: "isEnabled",
                type: 'boolean',
                value: true,
                description: "Enable the component"
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              isEnabled
            </button>
            <button
              onClick={() => setNewSetting({
                key: "autoSave",
                type: 'boolean',
                value: false,
                description: "Auto-save changes"
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              autoSave
            </button>
            <button
              onClick={() => setNewSetting({
                key: "timeout",
                type: 'number',
                value: 5000,
                description: "Timeout in milliseconds"
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              timeout
            </button>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span>Settings: {settings.length}</span>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default LogicPanel;