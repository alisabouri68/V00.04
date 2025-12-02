import { useEffect, useState, useRef } from "react";
import { absMan, WidgetData } from "ACTR/RACT_absman_V00.04";
import Button from "WIDG_mGhazi_D2025.11.16/RWDG_button/index";
import ButtonGroup from "WIDG_mGhazi_D2025.11.16/RWDG_buttonGroup/index";
import Avatar from "WIDG_mGhazi_D2025.11.16/RWDG_avatar/index";
import Input from "WIDG_mGhazi_D2025.11.16/RWDG_input/index";
import Badge from "WIDG_mGhazi_D2025.11.16/RWDG_badge/index";
import setupDefaultWidgets from "./widgetsetup";
function Index() {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentlySelectedWidgetId, setCurrentlySelectedWidgetId] = useState<string | null>(null);
  const initialized = useRef(false);
useEffect(() => {
  if (initialized.current) return;
  initialized.current = true;
  
  console.log("🚀 Index component initializing...");
  
  // ابتدا ویجت‌های موجود را بگیر
  const loadedWidgets = absMan.getWidgets();
  console.log("📦 Initial loaded widgets count:", loadedWidgets.length);
  
  if (loadedWidgets.length === 0) {
    console.log("🆕 No widgets found, running setup...");
    setupDefaultWidgets();
    
    // بعد از setup، ویجت‌ها را بگیر
    setTimeout(() => {
      const newWidgets = absMan.getWidgets();
      console.log("✅ After setup widgets count:", newWidgets.length);
      console.log("Sample widget:", newWidgets[0]);
      
      setWidgets(newWidgets);
      setLoading(false);
    }, 1000);
  } else {
    console.log("✅ Widgets already exist:", loadedWidgets.length);
    setWidgets(loadedWidgets);
    setLoading(false);
  }

  // گوش دادن به تغییرات ویجت‌ها
  const unsubscribeWidgets = absMan.subscribeToWidgets((updatedWidgets) => {
    console.log("🔄 Widgets subscription update:", updatedWidgets.length);
    setWidgets([...updatedWidgets]);
  });

  // گوش دادن به ویجت انتخاب شده
  const unsubscribeSelected = absMan.subscribeToSelectedWidget((widget) => {
    console.log("🎯 Selected widget subscription:", 
      widget ? `${widget.name} (${widget.id})` : "null"
    );
    setCurrentlySelectedWidgetId(widget?.id || null);
  });

  return () => {
    unsubscribeWidgets();
    unsubscribeSelected();
  };
}, []);
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const openModal = (widget: WidgetData) => {
    setSelectedWidget(widget);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWidget(null);
  };

  const handleRowClick = (widget: WidgetData) => {
    console.log("📝 Row clicked:", widget.name);

    // انتخاب ویجت در absMan
    absMan.selectWidget(widget.id);

    // تست: ویجت انتخاب شده را از absMan بگیر
    const selected = absMan.getSelectedWidget();
    console.log("Selected from absMan:", selected);

    // ثبت event
    absMan.logWidgetEvent(widget.id, {
      event: "widget_selected",
      description: `Widget ${widget.name} selected from table row`,
      handler: "table_row_click"
    });

    console.log(`📝 Selected widget: ${widget.name} (ID: ${widget.id})`);
  };

  const handleSelectButtonClick = (widget: WidgetData, e: React.MouseEvent) => {
    e.stopPropagation(); // جلوگیری از انتشار event به ردیف

    console.log("✅ Select button clicked for:", widget.name);

    // انتخاب ویجت در absMan
    absMan.selectWidget(widget.id);

    // تست مستقیم
    const selected = absMan.getSelectedWidget();
    console.log("Immediate check - Selected widget:", selected);

    // ثبت event
    absMan.logWidgetEvent(widget.id, {
      event: "widget_selected",
      description: `Widget ${widget.name} selected via button`,
      handler: "select_button"
    });

    console.log(`✅ Widget "${widget.name}" selected for editing`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const renderWidget = (widget: WidgetData) => {
    const widgetName = widget.name;

    const props: any = {};

    if (widget.geo) {
      props.style = {};
      if (widget.geo.width) props.style.width = widget.geo.width;
      if (widget.geo.height) props.style.height = widget.geo.height;
      if (widget.geo.padding) props.style.padding = widget.geo.padding;
      if (widget.geo.margin) props.style.margin = widget.geo.margin;
    }

    if (widget.style) {
      props.style = { ...props.style, ...widget.style };
    }

    switch (widget.type) {
      case 'button':
        return <Button {...props}>{widgetName}</Button>;

      case 'button-group':
        const buttons = [
          { key: '1', children: 'Option 1' },
          { key: '2', children: 'Option 2' },
          { key: '3', children: 'Option 3' }
        ];
        return (
          <ButtonGroup {...props}>
            {buttons.map(btn => (
              <Button key={btn.key}>{btn.children}</Button>
            ))}
          </ButtonGroup>
        );

      case 'avatar':
        return <Avatar {...props}>{widgetName.charAt(0)}</Avatar>;

      case 'input':
        return <Input {...props} placeholder={`Enter ${widgetName}`} />;

      case 'badge':
        return <Badge {...props} count={5} />;

      default:
        return <div className="text-gray-500 dark:text-gray-400">Widget {widget.type} cannot be displayed</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading widgets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* بخش اصلی با جدول */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Widget Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{widgets.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Widgets</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {widgets.filter(w => w.status === 'active').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {widgets.filter(w => w.status === 'draft').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Draft</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {widgets.filter(w => w.status === 'inactive').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Inactive</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-4">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Version</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {widgets.map((widget) => (
                  <tr
                    key={widget.id}
                    className={`
                      hover:bg-gray-50 dark:hover:bg-gray-700 
                      border-b border-gray-200 dark:border-gray-700 
                      cursor-pointer transition-colors
                      ${currentlySelectedWidgetId === widget.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                        : ''
                      }
                    `}
                    onClick={() => handleRowClick(widget)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{widget.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{widget.description}</div>
                        {currentlySelectedWidgetId === widget.id && (
                          <div className="mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Selected
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                        {widget.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(widget.status)}`}>
                        {widget.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{widget.version}</td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => openModal(widget)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm px-3 py-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                        >
                          Preview
                        </button>
                        <button
                          onClick={(e) => handleSelectButtonClick(widget, e)}
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm px-3 py-1 hover:bg-green-50 dark:hover:bg-green-900/30 rounded"
                        >
                          {currentlySelectedWidgetId === widget.id ? 'Selected ✓' : 'Select'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Status Bar */}
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow text-sm">
            <div className="flex items-center justify-between">
              <div className="text-gray-600 dark:text-gray-400">
                {currentlySelectedWidgetId ? (
                  <span>
                    Currently selected: <span className="font-medium text-gray-900 dark:text-white">
                      {widgets.find(w => w.id === currentlySelectedWidgetId)?.name}
                    </span>
                    <button
                      onClick={() => {
                        absMan.selectWidget(null);
                        console.log("Selection cleared");
                      }}
                      className="ml-2 text-xs text-red-500 hover:text-red-700"
                    >
                      Clear
                    </button>
                  </span>
                ) : (
                  <span>No widget selected</span>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Total: {widgets.length} widgets
              </div>
            </div>
          </div>

          {isModalOpen && selectedWidget && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedWidget.name}</h3>
                    <button onClick={closeModal} className="text-gray-500 dark:text-gray-400">×</button>
                  </div>

                  <div className="my-4 p-4 border border-gray-200 dark:border-gray-700 rounded flex justify-center bg-gray-50 dark:bg-gray-900">
                    {renderWidget(selectedWidget)}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p><span className="font-medium text-gray-900 dark:text-white">Type:</span> {selectedWidget.type}</p>
                    <p><span className="font-medium text-gray-900 dark:text-white">Description:</span> {selectedWidget.description}</p>
                    <p><span className="font-medium text-gray-900 dark:text-white">Status:</span> {selectedWidget.status}</p>
                    <p><span className="font-medium text-gray-900 dark:text-white">ID:</span> {selectedWidget.id}</p>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;