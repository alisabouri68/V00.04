import { useEffect, useState } from "react";
import { absMan, WidgetData } from "ACTR/RACT_absman_V00.04";
import { Box, Edit2, Save, X, RefreshCw, Plus, Trash2 } from "lucide-react";

export default function StylePanel() {
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [styleInputs, setStyleInputs] = useState<{[key: string]: string}>({});
  const [newStyleKey, setNewStyleKey] = useState("");
  const [newStyleValue, setNewStyleValue] = useState("");

  useEffect(() => {
    console.log("🎯 StylePanel mounted");
    
    const unsubscribe = absMan.subscribeToSelectedWidget((widget) => {
      console.log("🎯 Widget update received:", widget?.name);
      if (widget) {
        setSelectedWidget(widget);
        // استایل‌ها را برای inputs کپی کن
        setStyleInputs(widget.style || {});
      } else {
        setSelectedWidget(null);
        setStyleInputs({});
      }
    });

    return unsubscribe;
  }, []);

  const handleStyleChange = (key: string, value: string) => {
    console.log("🎨 Changing style:", key, "=>", value);
    
    const newStyles = { ...styleInputs, [key]: value };
    setStyleInputs(newStyles);
    
    // بلافاصله در absMan ذخیره کن
    if (selectedWidget) {
      absMan.updateWidgetProps(selectedWidget.id, {
        style: newStyles
      });
      
      // ویجت را آپدیت کن
      setTimeout(() => {
        const updated = absMan.getWidgetById(selectedWidget.id);
        if (updated) {
          setSelectedWidget(updated);
        }
      }, 100);
    }
  };

  const handleRemoveStyle = (key: string) => {
    const newStyles = { ...styleInputs };
    delete newStyles[key];
    setStyleInputs(newStyles);
    
    if (selectedWidget) {
      absMan.updateWidgetProps(selectedWidget.id, {
        style: newStyles
      });
    }
  };

  const handleAddStyle = () => {
    if (!newStyleKey.trim() || !newStyleValue.trim()) return;
    
    handleStyleChange(newStyleKey.trim(), newStyleValue.trim());
    setNewStyleKey("");
    setNewStyleValue("");
  };

  const handleSave = () => {
    console.log("💾 Saving all styles...");
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (selectedWidget) {
      setStyleInputs(selectedWidget.style || {});
    }
    setIsEditing(false);
  };

  const handleRefresh = () => {
    const widget = absMan.getSelectedWidget();
    console.log("🔄 Refreshing widget:", widget);
    setSelectedWidget(widget);
    if (widget) {
      setStyleInputs(widget.style || {});
    }
  };

  if (!selectedWidget) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-900">
        <Box className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Widget Selected
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Click "Select" on any widget in the table
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedWidget.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedWidget.type} • {Object.keys(styleInputs).length} styles
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Common Styles */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Common Properties
            </h3>
            
            {/* Background Color */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Background Color
              </label>
              <input
                type="text"
                value={styleInputs["background-color"] || ""}
                onChange={(e) => handleStyleChange("background-color", e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded ${
                  isEditing 
                    ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
                placeholder="#ffffff"
                disabled={!isEditing}
                onClick={(e) => isEditing && e.stopPropagation()}
              />
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Text Color
              </label>
              <input
                type="text"
                value={styleInputs.color || ""}
                onChange={(e) => handleStyleChange("color", e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded ${
                  isEditing 
                    ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
                placeholder="#000000"
                disabled={!isEditing}
                onClick={(e) => isEditing && e.stopPropagation()}
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Font Size
              </label>
              <input
                type="text"
                value={styleInputs["font-size"] || ""}
                onChange={(e) => handleStyleChange("font-size", e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded ${
                  isEditing 
                    ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
                placeholder="14px"
                disabled={!isEditing}
                onClick={(e) => isEditing && e.stopPropagation()}
              />
            </div>

            {/* Padding */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Padding
              </label>
              <input
                type="text"
                value={styleInputs.padding || ""}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded ${
                  isEditing 
                    ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
                placeholder="8px 16px"
                disabled={!isEditing}
                onClick={(e) => isEditing && e.stopPropagation()}
              />
            </div>
          </div>

          {/* Add New Style */}
          {isEditing && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded border">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Style
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Property
                  </label>
                  <input
                    type="text"
                    value={newStyleKey}
                    onChange={(e) => setNewStyleKey(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    placeholder="border-radius"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={newStyleValue}
                    onChange={(e) => setNewStyleValue(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    placeholder="8px"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <button
                onClick={handleAddStyle}
                disabled={!newStyleKey.trim() || !newStyleValue.trim()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Add Style
              </button>
            </div>
          )}

          {/* All Styles List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white">
                All Styles ({Object.keys(styleInputs).length})
              </h3>
            </div>
            
            {Object.keys(styleInputs).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(styleInputs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded border">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-mono text-blue-600 dark:text-blue-400 truncate">
                          {key}
                        </span>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveStyle(key)}
                            className="p-1 text-red-500 hover:text-red-700 ml-2"
                            title="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleStyleChange(key, e.target.value)}
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <div className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 rounded truncate">
                          {value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                No styles defined yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Widget ID: {selectedWidget.id.substring(0, 8)}...</span>
            <span className={isEditing ? "text-green-600 dark:text-green-400" : ""}>
              {isEditing ? "Editing Mode" : "View Mode"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}