import { useEffect, useState, useRef } from "react";
import { absMan, WidgetData } from "ACTR/RACT_absman_V00.04";
import Button from "WIDG_mGhazi_D2025.11.16/RWDG_button/index";
import ButtonGroup from "WIDG_mGhazi_D2025.11.16/RWDG_buttonGroup/index";
import Avatar from "WIDG_mGhazi_D2025.11.16/RWDG_avatar/index";
import Input from "WIDG_mGhazi_D2025.11.16/RWDG_input/index";
import Badge from "WIDG_mGhazi_D2025.11.16/RWDG_badge/index";
import { DynaMan } from "ACTR/RACT_dynaMan_V00.04";

// تابع کمکی برای تبدیل geo به CSSProperties
const convertGeoToStyle = (geo: any): React.CSSProperties => {
  if (!geo) return {};
  
  const style: any = { ...geo };
  
  // تبدیل position اگر وجود دارد
  if (geo.position && typeof geo.position === 'object') {
    style.position = 'absolute';
    style.left = geo.position.x;
    style.top = geo.position.y;
  }
  
  // حذف fields اضافی
  delete style.position?.x;
  delete style.position?.y;
  
  return style;
};

function Index() {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  
  console.log("📝 Current ENVI_widget:", DynaMan.get("ENVI_widget"));

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    const loadWidgets = () => {
      const loadedWidgets = absMan.getWidgets();
      console.log("Widgets loaded:", loadedWidgets.length);
      
      if (loadedWidgets.length === 0) {
        console.log("Creating default widgets...");
        createDefaultWidgets();
      } else {
        setWidgets(loadedWidgets);
        setLoading(false);
      }
    };

    setTimeout(loadWidgets, 100);

    const unsubscribe = absMan.subscribeToWidgets((updatedWidgets) => {
      setWidgets([...updatedWidgets]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const createDefaultWidgets = () => {
    const defaultWidgets = [
      {
        name: "Button",
        type: "button",
        version: "2025.11.16",
        status: "active" as const,
        description: "Responsive button",
        author: "mGhazi",
        tags: ["ui", "button"],
      },
      {
        name: "ButtonGroup",
        type: "button-group",
        version: "2025.11.16",
        status: "active" as const,
        description: "Button group",
        author: "mGhazi",
        tags: ["ui", "group"],
      },
      {
        name: "Avatar",
        type: "avatar",
        version: "2025.11.16",
        status: "active" as const,
        description: "User avatar",
        author: "mGhazi",
        tags: ["ui", "profile"],
      },
      {
        name: "Input",
        type: "input",
        version: "2025.11.16",
        status: "active" as const,
        description: "Text input",
        author: "mGhazi",
        tags: ["ui", "form"],
      },
      {
        name: "Badge",
        type: "badge",
        version: "2025.11.16",
        status: "active" as const,
        description: "Status badge",
        author: "mGhazi",
        tags: ["ui", "notification"],
      }
    ];

    defaultWidgets.forEach(widget => {
      absMan.addWidget(widget);
    });

    const newWidgets = absMan.getWidgets();
    setWidgets(newWidgets);
    setLoading(false);
  };

  const openModal = (widget: WidgetData) => {
    setSelectedWidget(widget);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWidget(null);
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
    
    // تبدیل geo به style
    const geoStyle = convertGeoToStyle(widget.geo);
    const style = widget.style || {};
    
    const commonProps = {
      style: {
        ...geoStyle,
        ...style
      }
    };

    switch (widget.type) {
      case 'button':
        return <Button {...commonProps}>{widgetName}</Button>;
        
      case 'button-group':
        const buttons = [
          { key: '1', children: 'Option 1' },
          { key: '2', children: 'Option 2' },
          { key: '3', children: 'Option 3' }
        ];
        return (
          <ButtonGroup {...commonProps}>
            {buttons.map(btn => (
              <Button key={btn.key}>{btn.children}</Button>
            ))}
          </ButtonGroup>
        );
        
      case 'avatar':
        return <Avatar {...commonProps}>{widgetName.charAt(0)}</Avatar>;
        
      case 'input':
        return <Input {...commonProps} placeholder={`Enter ${widgetName}`} />;
        
      case 'badge':
        return <Badge {...commonProps}  />;
        
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
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
              <tr key={widget.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{widget.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{widget.description}</div>
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
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(widget)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
}

export default Index;