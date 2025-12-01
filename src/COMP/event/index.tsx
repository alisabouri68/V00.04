// COMP/EventPanel.tsx
import { useEffect, useState } from "react";
import {
  Edit3,
  Save,
  Plus,
  ChevronDown,
  ChevronRight,
  Trash2,
  PlayCircle,
  MousePointerClick,
  Keyboard,
  Eye,
  AlertCircle
} from "lucide-react";

interface EventHandler {
  id: string;
  event: string;
  handler: string;
  description: string;
}

function EventPanel() {
  const [eventHandlers, setEventHandlers] = useState<EventHandler[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    existing: true,
    addNew: false
  });
  const [newEventHandler, setNewEventHandler] = useState({
    event: "",
    handler: "",
    description: ""
  });

  const commonEvents = [
    { value: "click", label: "Click", icon: <MousePointerClick className="w-3 h-3" /> },
    { value: "change", label: "Change", icon: <AlertCircle className="w-3 h-3" /> },
    { value: "mouseenter", label: "Mouse Enter", icon: <Eye className="w-3 h-3" /> },
    { value: "mouseleave", label: "Mouse Leave", icon: <Eye className="w-3 h-3" /> },
    { value: "focus", label: "Focus", icon: <AlertCircle className="w-3 h-3" /> },
    { value: "blur", label: "Blur", icon: <AlertCircle className="w-3 h-3" /> },
    { value: "submit", label: "Submit", icon: <PlayCircle className="w-3 h-3" /> },
    { value: "keydown", label: "Key Down", icon: <Keyboard className="w-3 h-3" /> },
    { value: "keyup", label: "Key Up", icon: <Keyboard className="w-3 h-3" /> }
  ];

  useEffect(() => {
    setEventHandlers([
      {
        id: "1",
        event: "click",
        handler: "handleClick()",
        description: "Handle button click"
      },
      {
        id: "2",
        event: "change",
        handler: "onValueChange(e.target.value)",
        description: "Handle input change"
      },
      {
        id: "3",
        event: "mouseenter",
        handler: "showTooltip()",
        description: "Show tooltip on hover"
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

  const addEventHandler = () => {
    if (newEventHandler.event.trim() && newEventHandler.handler.trim()) {
      setEventHandlers(prev => [...prev, {
        id: Date.now().toString(),
        event: newEventHandler.event.trim(),
        handler: newEventHandler.handler.trim(),
        description: newEventHandler.description.trim()
      }]);
      setNewEventHandler({ event: "", handler: "", description: "" });
      setExpandedSections(prev => ({ ...prev, addNew: false }));
    }
  };

  const updateEventHandler = (id: string, field: keyof EventHandler, value: string) => {
    setEventHandlers(prev => prev.map(handler => 
      handler.id === id ? { ...handler, [field]: value } : handler
    ));
  };

  const removeEventHandler = (id: string) => {
    setEventHandlers(prev => prev.filter(handler => handler.id !== id));
  };

  const getEventIcon = (eventName: string) => {
    const event = commonEvents.find(e => e.value === eventName);
    return event ? event.icon : <PlayCircle className="w-3 h-3" />;
  };

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <PlayCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Event Handlers
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-1.5 rounded text-xs ${isEditing
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
            } transition-colors`}
          title={isEditing ? "Save events" : "Edit events"}
        >
          {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
        </button>
      </div>

      {/* Existing Event Handlers */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('existing')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <MousePointerClick className="w-3 h-3 mr-2" />
            <span>Handlers ({eventHandlers.length})</span>
          </div>
          {expandedSections.existing ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.existing && (
          <div className="space-y-2">
            {eventHandlers.length === 0 ? (
              <div className="p-3 text-center bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No event handlers defined
                </p>
              </div>
            ) : (
              eventHandlers.map(handler => (
                <div key={handler.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-gray-200 dark:bg-gray-700 rounded">
                        {getEventIcon(handler.event)}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {handler.event}
                        </span>
                        {handler.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {handler.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeEventHandler(handler.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Remove handler"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Handler Code */}
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Handler
                    </label>
                    {isEditing ? (
                      <textarea
                        value={handler.handler}
                        onChange={(e) => updateEventHandler(handler.id, 'handler', e.target.value)}
                        className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none"
                        rows={2}
                      />
                    ) : (
                      <div className="p-2 text-xs text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600/50 rounded font-mono">
                        {handler.handler}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add New Event Handler */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('addNew')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <Plus className="w-3 h-3 mr-2" />
            <span>Add New Handler</span>
          </div>
          {expandedSections.addNew ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.addNew && (
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600 space-y-3">
            {/* Event Type */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Event Type
              </label>
              <div className="grid grid-cols-3 gap-1 mb-2">
                {commonEvents.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setNewEventHandler(prev => ({ ...prev, event: value }))}
                    className={`flex flex-col items-center justify-center p-2 rounded border ${newEventHandler.event === value
                      ? 'bg-gray-800 text-white border-gray-800 dark:bg-gray-600 dark:border-gray-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                      }`}
                  >
                    <div className="mb-1">{icon}</div>
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={newEventHandler.event}
                onChange={(e) => setNewEventHandler(prev => ({ ...prev, event: e.target.value }))}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                placeholder="Or enter custom event name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                value={newEventHandler.description}
                onChange={(e) => setNewEventHandler(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                placeholder="What does this handler do?"
              />
            </div>

            {/* Handler Code */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Handler Code
              </label>
              <textarea
                value={newEventHandler.handler}
                onChange={(e) => setNewEventHandler(prev => ({ ...prev, handler: e.target.value }))}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none"
                rows={3}
                placeholder="e.g., console.log('Event triggered'); handleClick();"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={addEventHandler}
                disabled={!newEventHandler.event.trim() || !newEventHandler.handler.trim()}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
              >
                Add Handler
              </button>
              <button
                onClick={() => {
                  setNewEventHandler({ event: "", handler: "", description: "" });
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

      {/* Quick Examples */}
      {isEditing && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
            Quick Examples
          </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setNewEventHandler({
                event: "click",
                handler: "handleClick()",
                description: "Handle click event"
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Click Handler
            </button>
            <button
              onClick={() => setNewEventHandler({
                event: "change",
                handler: "onChange(e.target.value)",
                description: "Handle input change"
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Change Handler
            </button>
            <button
              onClick={() => setNewEventHandler({
                event: "mouseenter",
                handler: "setHover(true)",
                description: "Handle mouse enter"
              })}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
            >
              Hover Handler
            </button>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span>Handlers: {eventHandlers.length}</span>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default EventPanel;