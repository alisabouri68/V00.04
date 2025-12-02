// COMP/EventPanel.tsx
import { useEffect, useState } from "react";
import { absMan, WidgetData } from "ACTR/RACT_absman_V00.04";
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
  AlertCircle,
  RefreshCw,
  X,
  Check,
  History
} from "lucide-react";

interface EventHandler {
  id: string;
  event: string;
  handler: string;
  description: string;
  timestamp?: string;
}

interface EventPanelProps {
  widgetId?: string;
}

function EventPanel({ widgetId }: EventPanelProps) {
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [eventHandlers, setEventHandlers] = useState<EventHandler[]>([]);
  const [tempEventHandlers, setTempEventHandlers] = useState<EventHandler[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    existing: true,
    addNew: false,
    history: false
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

  // گوش دادن به تغییرات ویجت انتخاب شده
  useEffect(() => {
    const loadEventData = (widget: WidgetData | null) => {
      if (widget) {
        console.log("🎯 EventPanel: Loading events for:", widget.name);
        setSelectedWidget(widget);
        
        // تبدیل events array
        const eventsArray: EventHandler[] = [];
        if (widget.events) {
          widget.events.forEach((event: any) => {
            eventsArray.push({
              id: event.id,
              event: event.event,
              handler: event.handler || "default",
              description: event.description,
              timestamp: event.timestamp
            });
          });
        }
        
        setEventHandlers(eventsArray);
        setTempEventHandlers(eventsArray);
      } else {
        setSelectedWidget(null);
        setEventHandlers([]);
        setTempEventHandlers([]);
      }
    };

    if (!widgetId) {
      const unsubscribe = absMan.subscribeToSelectedWidget(loadEventData);
      return () => unsubscribe();
    } else {
      const widget = absMan.getWidgetById(widgetId);
      loadEventData(widget);
    }
  }, [widgetId]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addEventHandler = () => {
    if (newEventHandler.event.trim() && newEventHandler.handler.trim()) {
      const newHandler: EventHandler = {
        id: `event_${Date.now()}`,
        event: newEventHandler.event.trim(),
        handler: newEventHandler.handler.trim(),
        description: newEventHandler.description.trim(),
        timestamp: new Date().toISOString()
      };

      setTempEventHandlers(prev => [...prev, newHandler]);
      setNewEventHandler({ event: "", handler: "", description: "" });
      setExpandedSections(prev => ({ ...prev, addNew: false }));
    }
  };

  const updateEventHandler = (id: string, field: keyof EventHandler, value: string) => {
    setTempEventHandlers(prev => prev.map(handler => 
      handler.id === id ? { ...handler, [field]: value } : handler
    ));
  };

  const removeEventHandler = (id: string) => {
    setTempEventHandlers(prev => prev.filter(handler => handler.id !== id));
  };

  const getEventIcon = (eventName: string) => {
    const event = commonEvents.find(e => e.value === eventName);
    return event ? event.icon : <PlayCircle className="w-3 h-3" />;
  };

  const handleSave = () => {
    if (!selectedWidget) return;

    console.log("💾 Saving event handlers...");
    
    const success = absMan.updateWidgetProps(selectedWidget.id, {
      events: tempEventHandlers
    });

    if (success) {
      console.log("✅ Event handlers saved");
      setEventHandlers(tempEventHandlers);
      setIsEditing(false);
      
      // ثبت event log
      absMan.logWidgetEvent(selectedWidget.id, {
        event: "event_handlers_updated",
        handler: "EventPanel.save",
        description: `Updated ${tempEventHandlers.length} event handlers`
      });
      
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
    setTempEventHandlers(eventHandlers);
    setIsEditing(false);
  };

  const handleRefresh = () => {
    if (!selectedWidget) return;
    
    const widget = absMan.getWidgetById(selectedWidget.id);
    if (widget) {
      setSelectedWidget(widget);
      
      const eventsArray: EventHandler[] = [];
      if (widget.events) {
        widget.events.forEach((event: any) => {
          eventsArray.push({
            id: event.id,
            event: event.event,
            handler: event.handler || "default",
            description: event.description,
            timestamp: event.timestamp
          });
        });
      }
      
      setEventHandlers(eventsArray);
      setTempEventHandlers(eventsArray);
    }
  };

  const applyExample = (event: string, handler: string, description: string) => {
    setNewEventHandler({
      event,
      handler,
      description
    });
    setExpandedSections(prev => ({ ...prev, addNew: true }));
  };

  const triggerTestEvent = (eventName: string) => {
    if (!selectedWidget) return;

    console.log(`🎯 Triggering test event: ${eventName}`);
    absMan.logWidgetEvent(selectedWidget.id, {
      event: `test_${eventName}`,
      handler: "EventPanel.test",
      description: `Test event triggered: ${eventName}`
    });
  };

  if (!selectedWidget) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <PlayCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Widget Selected
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a widget to manage event handlers
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <PlayCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Event Handlers
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
                title="Save events"
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
              title="Edit events"
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
              {tempEventHandlers.length} event handlers
            </p>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => triggerTestEvent("click")}
              className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test Click
            </button>
            <button
              onClick={() => triggerTestEvent("change")}
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Change
            </button>
          </div>
        </div>
      </div>

      {/* Existing Event Handlers */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('existing')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <MousePointerClick className="w-3 h-3 mr-2" />
            <span>Handlers ({tempEventHandlers.length})</span>
          </div>
          {expandedSections.existing ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.existing && (
          <div className="space-y-2">
            {tempEventHandlers.length === 0 ? (
              <div className="p-3 text-center bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No event handlers defined
                </p>
              </div>
            ) : (
              tempEventHandlers.map(handler => (
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
                        {handler.timestamp && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {new Date(handler.timestamp).toLocaleTimeString()}
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
                        className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none"
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

      {/* Event History */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
        <button
          onClick={() => toggleSection('history')}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <History className="w-3 h-3 mr-2" />
            <span>Event History</span>
          </div>
          {expandedSections.history ?
            <ChevronDown className="w-3 h-3" /> :
            <ChevronRight className="w-3 h-3" />
          }
        </button>

        {expandedSections.history && (
          <div className="space-y-2">
            {selectedWidget.events && selectedWidget.events.length > 0 ? (
              selectedWidget.events.slice(0, 5).map((event: any) => (
                <div key={event.id} className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {event.event}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {event.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3 text-center bg-gray-50 dark:bg-gray-700/50 rounded border">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No event history
                </p>
              </div>
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
                      ? 'bg-blue-600 text-white border-blue-600'
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
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Or enter custom event name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newEventHandler.description}
                onChange={(e) => setNewEventHandler(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
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
                className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none"
                rows={3}
                placeholder="e.g., console.log('Event triggered'); handleClick();"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={addEventHandler}
                disabled={!newEventHandler.event.trim() || !newEventHandler.handler.trim()}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
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
              onClick={() => applyExample("click", "handleClick()", "Handle click event")}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition-colors"
            >
              Click Handler
            </button>
            <button
              onClick={() => applyExample("change", "onChange(e.target.value)", "Handle input change")}
              className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
            >
              Change Handler
            </button>
            <button
              onClick={() => applyExample("mouseenter", "setHover(true)", "Handle mouse enter")}
              className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 rounded transition-colors"
            >
              Hover Handler
            </button>
            <button
              onClick={() => applyExample("submit", "handleSubmit(e)", "Handle form submit")}
              className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded transition-colors"
            >
              Submit Handler
            </button>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div>
          <span>Total handlers: {tempEventHandlers.length}</span>
          <span className="ml-2">History: {selectedWidget.events?.length || 0}</span>
        </div>
        <span className={`px-2 py-0.5 rounded ${isEditing ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}>
          {isEditing ? "Editing" : "Viewing"}
        </span>
      </div>
    </div>
  );
}

export default EventPanel;