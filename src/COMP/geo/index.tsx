// COMP/GeoPanel.tsx
import { useEffect, useState } from "react";
import { absMan, WidgetData } from "ACTR/RACT_absman_V00.04";
import {
  Edit3,
  ChevronDown,
  ChevronRight,
  Maximize2,
  Move,
  RotateCw,
  Square,
  Minus,
  Expand,
  RefreshCw,
  X,
  Check
} from "lucide-react";

interface GeoData {
  width?: string;
  height?: string;
  position?: {
    x: string;
    y: string;
  };
  padding?: string;
  margin?: string;
  rotation?: string;
}

interface GeoPanelProps {
  widgetId?: string;
}

function GeoPanel({ widgetId }: GeoPanelProps) {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempGeoData, setTempGeoData] = useState<GeoData | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    dimensions: true,
    position: false,
    spacing: false
  });

  // گوش دادن به تغییرات ویجت انتخاب شده
  useEffect(() => {
    const loadGeoData = (widget: WidgetData | null) => {
      if (widget) {
        console.log("📐 GeoPanel: Loading geo data for:", widget.name);
        setSelectedWidget(widget);
        
        const geo = widget.geo || {};
        const newGeoData: GeoData = {
          width: geo.width || "auto",
          height: geo.height || "auto",
          position: geo.position || { x: "0", y: "0" },
          padding: geo.padding || "0",
          margin: geo.margin || "0",
          rotation: geo.rotation || "0"
        };
        
        setGeoData(newGeoData);
        setTempGeoData(newGeoData);
      } else {
        setSelectedWidget(null);
        setGeoData(null);
        setTempGeoData(null);
      }
    };

    if (!widgetId) {
      const unsubscribe = absMan.subscribeToSelectedWidget((widget) => {
        loadGeoData(widget);
      });

      return () => unsubscribe();
    } else {
      const widget = absMan.getWidgetById(widgetId);
      loadGeoData(widget);
    }
  }, [widgetId]);

  const updateTempGeoData = (field: keyof GeoData, value: any) => {
    if (tempGeoData) {
      setTempGeoData(prev => ({ ...prev!, [field]: value }));
    }
  };

  const updateTempPosition = (axis: 'x' | 'y', value: string) => {
    if (tempGeoData) {
      setTempGeoData(prev => ({
        ...prev!,
        position: { ...prev?.position!, [axis]: value }
      }));
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = () => {
    if (!selectedWidget || !tempGeoData) return;

    console.log("💾 Saving geo data:", tempGeoData);
    
    const success = absMan.updateWidgetProps(selectedWidget.id, {
      geo: tempGeoData
    });

    if (success) {
      console.log("✅ Geo data saved");
      setGeoData(tempGeoData);
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
    setTempGeoData(geoData);
    setIsEditing(false);
  };

  const handleRefresh = () => {
    if (!selectedWidget) return;
    
    const widget = absMan.getWidgetById(selectedWidget.id);
    if (widget) {
      setSelectedWidget(widget);
      const geo = widget.geo || {};
      const newGeoData: GeoData = {
        width: geo.width || "auto",
        height: geo.height || "auto",
        position: geo.position || { x: "0", y: "0" },
        padding: geo.padding || "0",
        margin: geo.margin || "0",
        rotation: geo.rotation || "0"
      };
      setGeoData(newGeoData);
      setTempGeoData(newGeoData);
    }
  };

  const applyPreset = (preset: 'full-width' | 'half' | 'spaced' | 'rotated') => {
    if (!tempGeoData) return;

    let newTempData = { ...tempGeoData };

    switch (preset) {
      case 'full-width':
        newTempData.width = "100%";
        newTempData.height = "auto";
        break;
      case 'half':
        newTempData.width = "50%";
        newTempData.height = "50%";
        break;
      case 'spaced':
        newTempData.padding = "16px";
        newTempData.margin = "8px";
        break;
      case 'rotated':
        newTempData.rotation = "45";
        break;
    }

    setTempGeoData(newTempData);
  };

  if (!selectedWidget || !geoData || !tempGeoData) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <Maximize2 className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Widget Selected
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a widget to edit geometry properties
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Geometry Properties
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
                title="Save changes"
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
              title="Edit geometry"
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
              Editing geometry properties
            </p>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {tempGeoData.width} × {tempGeoData.height}
          </div>
        </div>
      </div>

      {/* Dimensions Section - Always Visible */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Width */}
          <div>
            <label className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
              <Square className="w-3 h-3 mr-1" />
              Width
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempGeoData.width}
                onChange={(e) => updateTempGeoData("width", e.target.value)}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="e.g., 100px, 50%, auto"
              />
            ) : (
              <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                {tempGeoData.width}
              </div>
            )}
          </div>

          {/* Height */}
          <div>
            <label className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
              <Square className="w-3 h-3 mr-1 rotate-90" />
              Height
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempGeoData.height}
                onChange={(e) => updateTempGeoData("height", e.target.value)}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="e.g., 100px, 50%, auto"
              />
            ) : (
              <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                {tempGeoData.height}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Position Section - Expandable */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('position')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <Move className="w-3 h-3 mr-2" />
            <span>Position & Rotation</span>
          </div>
          {expandedSections.position ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.position && (
          <div className="space-y-2 pl-1">
            {/* Position */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Position
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    X
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempGeoData.position?.x || "0"}
                      onChange={(e) => updateTempPosition("x", e.target.value)}
                      className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                  ) : (
                    <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                      {tempGeoData.position?.x || "0"}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Y
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempGeoData.position?.y || "0"}
                      onChange={(e) => updateTempPosition("y", e.target.value)}
                      className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                  ) : (
                    <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                      {tempGeoData.position?.y || "0"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rotation */}
            <div>
              <label className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                <RotateCw className="w-3 h-3 mr-1" />
                Rotation
              </label>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={tempGeoData.rotation || "0"}
                      onChange={(e) => updateTempGeoData("rotation", e.target.value)}
                      className="flex-1 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempGeoData.rotation}
                      onChange={(e) => updateTempGeoData("rotation", e.target.value)}
                      className="w-16 p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
                    />
                  </>
                ) : (
                  <div className="flex-1 p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                    {tempGeoData.rotation || "0"}°
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacing Section - Expandable */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('spacing')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <Expand className="w-3 h-3 mr-2" />
            <span>Spacing</span>
          </div>
          {expandedSections.spacing ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.spacing && (
          <div className="space-y-2 pl-1">
            {/* Padding */}
            <div>
              <label className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                <Minus className="w-3 h-3 mr-1 rotate-90" />
                Padding
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempGeoData.padding}
                  onChange={(e) => updateTempGeoData("padding", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="e.g., 10px 5px"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                  {tempGeoData.padding}
                </div>
              )}
            </div>

            {/* Margin */}
            <div>
              <label className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                <Minus className="w-3 h-3 mr-1" />
                Margin
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempGeoData.margin}
                  onChange={(e) => updateTempGeoData("margin", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="e.g., 10px auto"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                  {tempGeoData.margin}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Presets */}
      {isEditing && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => applyPreset('full-width')}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition-colors"
            >
              Full Width
            </button>
            <button
              onClick={() => applyPreset('half')}
              className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
            >
              Half Size
            </button>
            <button
              onClick={() => applyPreset('spaced')}
              className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 rounded transition-colors"
            >
              Spaced
            </button>
            <button
              onClick={() => applyPreset('rotated')}
              className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded transition-colors"
            >
              45° Rotation
            </button>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div>
          <span>Size: {tempGeoData.width} × {tempGeoData.height}</span>
          {tempGeoData.padding !== "0" && (
            <span className="ml-2">Padding: {tempGeoData.padding}</span>
          )}
        </div>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default GeoPanel;