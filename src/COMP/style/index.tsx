// COMP/StylePanel.tsx
import { useEffect, useState } from "react";
import {
  Edit3,
  Save,
  Plus,
  ChevronDown,
  ChevronRight,
  Trash2,
  Palette,
  Type,
  Layout,
  Eye,
  Droplets,
  Square
} from "lucide-react";

interface StyleData {
  [key: string]: string;
}

function StylePanel() {
  const [styleData, setStyleData] = useState<StyleData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    typography: false,
    layout: false,
    borders: false,
    addNew: false
  });
  const [newStyleKey, setNewStyleKey] = useState("");
  const [newStyleValue, setNewStyleValue] = useState("");

  const styleCategories = {
    colors: ["color", "background-color", "border-color", "opacity"],
    typography: ["font-size", "font-weight", "font-family", "text-align", "line-height"],
    layout: ["width", "height", "display", "position", "margin", "padding"],
    borders: ["border", "border-radius", "box-shadow", "outline"]
  };

  useEffect(() => {
    setStyleData({
      "color": "#333333",
      "background-color": "#ffffff",
      "font-size": "14px",
      "font-weight": "400",
      "border": "1px solid #e0e0e0",
      "border-radius": "8px",
      "padding": "12px",
      "margin": "8px"
    });
    setIsEditing(true);
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateStyle = (key: string, value: string) => {
    if (styleData) {
      setStyleData(prev => ({ ...prev!, [key]: value }));
    }
  };

  const removeStyle = (key: string) => {
    if (styleData) {
      const newData = { ...styleData };
      delete newData[key];
      setStyleData(newData);
    }
  };

  const addNewStyle = () => {
    if (newStyleKey.trim() && newStyleValue.trim() && styleData) {
      setStyleData(prev => ({
        ...prev!,
        [newStyleKey.trim()]: newStyleValue.trim()
      }));
      setNewStyleKey("");
      setNewStyleValue("");
      setExpandedSections(prev => ({ ...prev, addNew: false }));
    }
  };

  if (!styleData) return null;

  const getStyleCategory = (key: string) => {
    for (const [category, styles] of Object.entries(styleCategories)) {
      if (styles.includes(key)) return category;
    }
    return "other";
  };

  const groupedStyles: Record<string, [string, string][]> = {};
  Object.entries(styleData).forEach(([key, value]) => {
    const category = getStyleCategory(key);
    if (!groupedStyles[category]) groupedStyles[category] = [];
    groupedStyles[category].push([key, value]);
  });

  const categoryIcons = {
    colors: <Droplets className="w-3 h-3 mr-2" />,
    typography: <Type className="w-3 h-3 mr-2" />,
    layout: <Layout className="w-3 h-3 mr-2" />,
    borders: <Square className="w-3 h-3 mr-2" />,
    other: <Eye className="w-3 h-3 mr-2" />
  };

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            CSS Styles
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-1.5 rounded text-xs ${isEditing
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
            } transition-colors`}
          title={isEditing ? "Save styles" : "Edit styles"}
        >
          {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
        </button>
      </div>

      {/* Color Styles */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('colors')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            {categoryIcons.colors}
            <span>Colors ({groupedStyles.colors?.length || 0})</span>
          </div>
          {expandedSections.colors ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.colors && groupedStyles.colors && (
          <div className="space-y-2 pl-1">
            {groupedStyles.colors.map(([key, value]) => (
              <StyleItem
                key={key}
                property={key}
                value={value}
                isEditing={isEditing}
                onUpdate={(newValue) => updateStyle(key, newValue)}
                onRemove={() => removeStyle(key)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Typography Styles */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('typography')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            {categoryIcons.typography}
            <span>Typography ({groupedStyles.typography?.length || 0})</span>
          </div>
          {expandedSections.typography ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.typography && groupedStyles.typography && (
          <div className="space-y-2 pl-1">
            {groupedStyles.typography.map(([key, value]) => (
              <StyleItem
                key={key}
                property={key}
                value={value}
                isEditing={isEditing}
                onUpdate={(newValue) => updateStyle(key, newValue)}
                onRemove={() => removeStyle(key)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Layout Styles */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('layout')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            {categoryIcons.layout}
            <span>Layout ({groupedStyles.layout?.length || 0})</span>
          </div>
          {expandedSections.layout ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.layout && groupedStyles.layout && (
          <div className="space-y-2 pl-1">
            {groupedStyles.layout.map(([key, value]) => (
              <StyleItem
                key={key}
                property={key}
                value={value}
                isEditing={isEditing}
                onUpdate={(newValue) => updateStyle(key, newValue)}
                onRemove={() => removeStyle(key)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Border Styles */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('borders')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            {categoryIcons.borders}
            <span>Borders ({groupedStyles.borders?.length || 0})</span>
          </div>
          {expandedSections.borders ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.borders && groupedStyles.borders && (
          <div className="space-y-2 pl-1">
            {groupedStyles.borders.map(([key, value]) => (
              <StyleItem
                key={key}
                property={key}
                value={value}
                isEditing={isEditing}
                onUpdate={(newValue) => updateStyle(key, newValue)}
                onRemove={() => removeStyle(key)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Other Styles */}
      {groupedStyles.other && groupedStyles.other.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <div className="flex items-center text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            {categoryIcons.other}
            <span>Other ({groupedStyles.other.length})</span>
          </div>
          <div className="space-y-2 pl-1">
            {groupedStyles.other.map(([key, value]) => (
              <StyleItem
                key={key}
                property={key}
                value={value}
                isEditing={isEditing}
                onUpdate={(newValue) => updateStyle(key, newValue)}
                onRemove={() => removeStyle(key)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add New Style Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('addNew')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <Plus className="w-3 h-3 mr-2" />
            <span>Add New Style</span>
          </div>
          {expandedSections.addNew ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.addNew && (
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Property
                </label>
                <select
                  value={newStyleKey}
                  onChange={(e) => setNewStyleKey(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                >
                  <option value="">Select property</option>
                  {Object.values(styleCategories).flat().map(style => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newStyleKey}
                  onChange={(e) => setNewStyleKey(e.target.value)}
                  placeholder="Or enter custom property"
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 mt-1"
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
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="e.g., red, 16px, bold"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addNewStyle}
                disabled={!newStyleKey.trim() || !newStyleValue.trim()}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
              >
                Add Style
              </button>
              <button
                onClick={() => {
                  setNewStyleKey("");
                  setNewStyleValue("");
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

      {/* Quick Style Presets */}
      {isEditing && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => {
                updateStyle("background-color", "#f3f4f6");
                updateStyle("border", "1px solid #d1d5db");
              }}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Light Card
            </button>
            <button
              onClick={() => {
                updateStyle("background-color", "#1f2937");
                updateStyle("color", "#f9fafb");
              }}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Dark Card
            </button>
            <button
              onClick={() => {
                updateStyle("border-radius", "0");
                updateStyle("box-shadow", "none");
              }}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Flat
            </button>
            <button
              onClick={() => {
                updateStyle("border-radius", "12px");
                updateStyle("box-shadow", "0 4px 6px -1px rgb(0 0 0 / 0.1)");
              }}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Rounded Shadow
            </button>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span>Styles: {Object.keys(styleData).length}</span>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

// Helper component for individual style items
interface StyleItemProps {
  property: string;
  value: string;
  isEditing: boolean;
  onUpdate: (value: string) => void;
  onRemove: () => void;
}

function StyleItem({ property, value, isEditing, onUpdate, onRemove }: StyleItemProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/30 rounded border border-gray-200 dark:border-gray-600">
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 truncate">
            {property}
          </span>
          {isEditing && (
            <button
              onClick={onRemove}
              className="p-1 text-red-500 hover:text-red-700 ml-2"
              title="Remove style"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onUpdate(e.target.value)}
            className="w-full p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
        ) : (
          <div className="p-1.5 text-xs text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600/50 rounded truncate">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

export default StylePanel;