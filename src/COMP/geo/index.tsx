// COMP/GeoPanel.tsx
import { useEffect, useState } from "react";
import {
  Edit3,
  Save,
  ChevronDown,
  ChevronRight,
  Maximize2,
  Move,
  RotateCw,
  Square,
  Minus,
  Expand
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

function GeoPanel() {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    dimensions: true,
    position: false,
    spacing: false
  });

  useEffect(() => {
    setGeoData({
      width: "100%",
      height: "auto",
      position: { x: "0", y: "0" },
      padding: "0",
      margin: "0",
      rotation: "0"
    });
    setIsEditing(true);
  }, []);

  const updateGeoData = (field: keyof GeoData, value: any) => {
    if (geoData) {
      setGeoData(prev => ({ ...prev!, [field]: value }));
    }
  };

  const updatePosition = (axis: 'x' | 'y', value: string) => {
    if (geoData) {
      setGeoData(prev => ({
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

  if (!geoData) return null;

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Geometry
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-1.5 rounded text-xs ${isEditing
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
            } transition-colors`}
          title={isEditing ? "Save changes" : "Edit geometry"}
        >
          {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
        </button>
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
                value={geoData.width}
                onChange={(e) => updateGeoData("width", e.target.value)}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                placeholder="e.g., 100px, 50%, auto"
              />
            ) : (
              <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                {geoData.width}
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
                value={geoData.height}
                onChange={(e) => updateGeoData("height", e.target.value)}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                placeholder="e.g., 100px, 50%, auto"
              />
            ) : (
              <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                {geoData.height}
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
                      value={geoData.position?.x || "0"}
                      onChange={(e) => updatePosition("x", e.target.value)}
                      className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  ) : (
                    <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                      {geoData.position?.x}
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
                      value={geoData.position?.y || "0"}
                      onChange={(e) => updatePosition("y", e.target.value)}
                      className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    />
                  ) : (
                    <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                      {geoData.position?.y}
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
                      value={geoData.rotation || "0"}
                      onChange={(e) => updateGeoData("rotation", e.target.value)}
                      className="flex-1 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="text"
                      value={geoData.rotation}
                      onChange={(e) => updateGeoData("rotation", e.target.value)}
                      className="w-16 p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
                    />
                  </>
                ) : (
                  <div className="flex-1 p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                    {geoData.rotation}°
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
                  value={geoData.padding}
                  onChange={(e) => updateGeoData("padding", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  placeholder="e.g., 10px 5px"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                  {geoData.padding}
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
                  value={geoData.margin}
                  onChange={(e) => updateGeoData("margin", e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  placeholder="e.g., 10px auto"
                />
              ) : (
                <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded border">
                  {geoData.margin}
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
              onClick={() => {
                updateGeoData("width", "100%");
                updateGeoData("height", "auto");
              }}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Full Width
            </button>
            <button
              onClick={() => {
                updateGeoData("width", "50%");
                updateGeoData("height", "50%");
              }}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Half
            </button>
            <button
              onClick={() => {
                updateGeoData("padding", "16px");
                updateGeoData("margin", "8px");
              }}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Spaced
            </button>
            <button
              onClick={() => updateGeoData("rotation", "45")}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              45°
            </button>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span>Size: {geoData.width} × {geoData.height}</span>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default GeoPanel;