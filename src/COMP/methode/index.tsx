// COMP/MethodPanel.tsx
import { useEffect, useState } from "react";
import { absMan, WidgetData } from "ACTR/RACT_absman_V00.04";
import {
  Edit3,
  Save,
  Plus,
  ChevronDown,
  ChevronRight,
  Trash2,
  FunctionSquare,
  Play,
  Zap,
  Hash,
  Type,
  Cpu,
  RefreshCw
} from "lucide-react";

interface MethodFlag {
  id: string;
  name: string;
  type: 'function' | 'getter' | 'setter' | 'async' | 'static';
  description: string;
  enabled: boolean;
}

interface MethodPanelProps {
  widgetId?: string;
}

function MethodPanel({ widgetId }: MethodPanelProps) {
  const [methods, setMethods] = useState<MethodFlag[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    existing: true,
    addNew: false
  });
  const [newMethod, setNewMethod] = useState({
    name: "",
    type: 'function' as 'function' | 'getter' | 'setter' | 'async' | 'static',
    description: "",
    enabled: true
  });

  // گوش دادن به تغییرات ویجت انتخاب شده
  useEffect(() => {
    if (!widgetId) {
      const unsubscribe = absMan.subscribeToSelectedWidget((widget) => {
        console.log("📝 MethodPanel: Widget update received:", widget?.name);
        if (widget) {
          setSelectedWidget(widget);
          loadMethodsFromWidget(widget);
        } else {
          setSelectedWidget(null);
          setMethods([]);
        }
      });

      return () => unsubscribe();
    } else {
      // اگر widgetId مستقیم داده شده باشد
      const widget = absMan.getWidgetById(widgetId);
      if (widget) {
        setSelectedWidget(widget);
        loadMethodsFromWidget(widget);
      }
    }
  }, [widgetId]);

  const loadMethodsFromWidget = (widget: WidgetData) => {
    // بارگذاری متدها از ویجت
    if (widget.methods && Array.isArray(widget.methods)) {
      setMethods(widget.methods);
    } else {
      // اگر متدی تعریف نشده، نمونه‌های پیش‌فرض را بارگذاری کن
      setMethods([
        {
          id: "1",
          name: "initialize",
          type: 'function',
          description: "Initialize component",
          enabled: true
        },
        {
          id: "2",
          name: "getData",
          type: 'getter',
          description: "Fetch data from API",
          enabled: true
        },
        {
          id: "3",
          name: "updateState",
          type: 'setter',
          description: "Update component state",
          enabled: true
        },
        {
          id: "4",
          name: "validate",
          type: 'function',
          description: "Validate input data",
          enabled: false
        },
        {
          id: "5",
          name: "fetchAsync",
          type: 'async',
          description: "Async data fetching",
          enabled: true
        }
      ]);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addMethod = () => {
    if (newMethod.name.trim() && selectedWidget) {
      const methodToAdd: MethodFlag = {
        id: Date.now().toString(),
        name: newMethod.name.trim(),
        type: newMethod.type,
        description: newMethod.description.trim(),
        enabled: newMethod.enabled
      };

      const updatedMethods = [...methods, methodToAdd];
      setMethods(updatedMethods);
      saveMethodsToWidget(updatedMethods);
      
      setNewMethod({
        name: "",
        type: 'function',
        description: "",
        enabled: true
      });
      setExpandedSections(prev => ({ ...prev, addNew: false }));
    }
  };

  const updateMethod = (id: string, field: keyof MethodFlag, value: any) => {
    const updatedMethods = methods.map(method => 
      method.id === id ? { ...method, [field]: value } : method
    );
    setMethods(updatedMethods);
    
    if (isEditing && selectedWidget) {
      saveMethodsToWidget(updatedMethods);
    }
  };

  const removeMethod = (id: string) => {
    const updatedMethods = methods.filter(method => method.id !== id);
    setMethods(updatedMethods);
    
    if (isEditing && selectedWidget) {
      saveMethodsToWidget(updatedMethods);
    }
  };

  const toggleMethodEnabled = (id: string, currentEnabled: boolean) => {
    updateMethod(id, 'enabled', !currentEnabled);
  };

  const saveMethodsToWidget = (methodsToSave: MethodFlag[]) => {
    if (!selectedWidget) return;

    const success = absMan.updateWidgetProps(selectedWidget.id, {
      methods: methodsToSave
    });

    if (success) {
      console.log("✅ Methods saved to widget:", methodsToSave.length);
    }
  };

  const handleSave = () => {
    if (!selectedWidget) return;

    console.log("💾 Saving methods...");
    const success = absMan.updateWidgetProps(selectedWidget.id, {
      methods: methods
    });

    if (success) {
      console.log("✅ Methods saved");
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
      loadMethodsFromWidget(widget);
    }
  };

  const getMethodTypeIcon = (type: string) => {
    switch (type) {
      case 'function': return <Play className="w-3 h-3" />;
      case 'getter': return <Zap className="w-3 h-3" />;
      case 'setter': return <Hash className="w-3 h-3" />;
      case 'async': return <Cpu className="w-3 h-3" />;
      case 'static': return <Type className="w-3 h-3" />;
      default: return <FunctionSquare className="w-3 h-3" />;
    }
  };

  const getMethodTypeColor = (type: string) => {
    switch (type) {
      case 'function': return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case 'getter': return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case 'setter': return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case 'async': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case 'static': return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (!selectedWidget) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <FunctionSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Widget Selected
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a widget to manage methods
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FunctionSquare className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Method Flags
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
            title={isEditing ? "Save changes" : "Edit methods"}
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

      {/* Existing Methods Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('existing')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <FunctionSquare className="w-3 h-3 mr-2" />
            <span>Methods ({methods.length})</span>
          </div>
          {expandedSections.existing ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.existing && (
          <div className="space-y-2">
            {methods.length === 0 ? (
              <div className="p-3 text-center bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No methods defined
                </p>
              </div>
            ) : (
              methods.map(method => (
                <div key={method.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          {getMethodTypeIcon(method.type)}
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 font-mono">
                            {method.name}
                          </span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${getMethodTypeColor(method.type)}`}>
                            {method.type}
                          </span>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => removeMethod(method.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Remove method"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      {method.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {method.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Enabled Toggle */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${method.enabled ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {method.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                      <button
                        onClick={() => toggleMethodEnabled(method.id, method.enabled)}
                        disabled={!isEditing}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${method.enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${method.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add New Method Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('addNew')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <Plus className="w-3 h-3 mr-2" />
            <span>Add New Method</span>
          </div>
          {expandedSections.addNew ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.addNew && (
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600 space-y-3">
            {/* Method Name */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                <FunctionSquare className="w-3 h-3 inline ml-1" />
                Method Name
              </label>
              <input
                type="text"
                value={newMethod.name}
                onChange={(e) => setNewMethod(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="e.g., initialize, getData, update"
              />
            </div>

            {/* Method Type */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['function', 'getter', 'setter', 'async', 'static'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewMethod(prev => ({ ...prev, type }))}
                    className={`flex flex-col items-center justify-center p-2 rounded border ${newMethod.type === type
                      ? 'bg-gray-800 text-white border-gray-800 dark:bg-gray-600 dark:border-gray-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                      }`}
                  >
                    <div className="mb-1">{getMethodTypeIcon(type)}</div>
                    <span className="text-xs capitalize">{type}</span>
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
                value={newMethod.description}
                onChange={(e) => setNewMethod(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="What does this method do?"
              />
            </div>

            {/* Enabled Status */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Enabled by default
              </label>
              <button
                onClick={() => setNewMethod(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${newMethod.enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${newMethod.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addMethod}
                disabled={!newMethod.name.trim()}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
              >
                Add Method
              </button>
              <button
                onClick={() => {
                  setNewMethod({
                    name: "",
                    type: 'function',
                    description: "",
                    enabled: true
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

      {/* Quick Templates */}
      {isEditing && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
            Common Methods
          </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setNewMethod({
                name: "init",
                type: 'function',
                description: "Initialize component",
                enabled: true
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              initialize
            </button>
            <button
              onClick={() => setNewMethod({
                name: "validate",
                type: 'function',
                description: "Validate input",
                enabled: true
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              validate
            </button>
            <button
              onClick={() => setNewMethod({
                name: "getValue",
                type: 'getter',
                description: "Get current value",
                enabled: true
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              getValue
            </button>
            <button
              onClick={() => setNewMethod({
                name: "setValue",
                type: 'setter',
                description: "Set new value",
                enabled: true
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              setValue
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <div className="grid grid-cols-3 gap-1 text-center">
          <div>
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {methods.filter(m => m.enabled).length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Enabled
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {methods.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Total
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {methods.filter(m => m.type === 'async').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Async
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <span>Widget: {selectedWidget.name}</span>
          <span className="text-gray-400">•</span>
          <span>Methods: {methods.length}</span>
        </div>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default MethodPanel;