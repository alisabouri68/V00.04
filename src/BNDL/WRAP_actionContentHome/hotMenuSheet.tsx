import { useState, useEffect } from "react"
import {
    FaTrash,
    FaPlus,
    FaCube,
    FaPalette,
    FaMousePointer,
    FaEye,
    FaRegObjectGroup,
} from "react-icons/fa"
import { MdWidgets } from "react-icons/md"
import Widget1 from "WIDG/RWDG_test1/index"
import Widget2 from "WIDG/RWDG_test2/index"
import Widget3 from "WIDG/RWDG_test3/index"
import Dropdown from "WIDG/RWDG_dropdown_V00.04"
import { ComponentProvider, ComponentData } from "STOR/COMPContext/index"
import Dynaman from "../../ACTR/RACT_dynaman_V00.0"; // ایمپورت Dynaman

function Index() {
    const [components, setComponents] = useState<{ [key: string]: ComponentData }>({})
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [dynaman, setDynaman] = useState<Dynaman | null>(null)

    // Initialize Dynaman
    useEffect(() => {
        const dynamanInstance = new Dynaman();
        setDynaman(dynamanInstance);
        
        // Load components from globalAppState
        const savedState = dynamanInstance.init();
        const savedComponents = savedState?.components || {};
        
        if (Object.keys(savedComponents).length > 0) {
            setComponents(savedComponents);
        } else {
            createInitialComponents();
        }
        setIsLoaded(true);
    }, [])

    // Save to globalAppState when components change
    useEffect(() => {
        if (isLoaded && dynaman && Object.keys(components).length > 0) {
            try {
                dynaman.reconfig({ components });
                console.log('Components saved to globalAppState:', components);
            } catch (error) {
                console.error('Error saving components to globalAppState:', error);
            }
        }
    }, [components, isLoaded, dynaman])

    const createInitialComponents = () => {
        const initialComponents: { [key: string]: ComponentData } = {}
        for (let i = 0; i < 3; i++) {
            const id = `comp_${Date.now()}_${i}`
            initialComponents[id] = {
                id,
                widgets: [],
                meta: {
                    title: `Component ${i + 1}`,
                    createdAt: new Date().toISOString()
                }
            }
        }
        setComponents(initialComponents)
    }

    // Listen for widget property changes from Assistant
    useEffect(() => {
        const handleWidgetPropertyChange = (event: any) => {
            const { componentId, widgetIndex, section, key, value } = event.detail;

            if (componentId && widgetIndex !== undefined) {
                console.log("Updating widget property in globalAppState:", { componentId, widgetIndex, section, key, value });

                setComponents((prev: any) => {
                    const updated = { ...prev };
                    const component = updated[componentId];

                    if (!component) {
                        console.warn('Component not found:', componentId);
                        return prev;
                    }

                    // Create or update widgetsData
                    const widgetKey = `widget_${widgetIndex}`;
                    const currentWidgetData = component.widgetsData?.[widgetKey] || {};
                    
                    updated[componentId] = {
                        ...component,
                        widgetsData: {
                            ...component.widgetsData,
                            [widgetKey]: {
                                ...currentWidgetData,
                                [section]: {
                                    ...currentWidgetData[section],
                                    [key]: value
                                }
                            }
                        }
                    };

                    return updated;
                });
            }
        };

        window.addEventListener('widgetPropertyChange', handleWidgetPropertyChange);
        return () => {
            window.removeEventListener('widgetPropertyChange', handleWidgetPropertyChange);
        };
    }, [])

    const componentIds = Object.keys(components)

    const handleSelectComponent = (id: string) => {
        setSelectedComponent(id)
    }

    const handleAddWidget = (widgetName: string) => {
        if (!selectedComponent) return

        setComponents(prev => ({
            ...prev,
            [selectedComponent]: {
                ...prev[selectedComponent],
                widgets: [...(prev[selectedComponent]?.widgets || []), widgetName]
            }
        }))
    }

const handleRemoveComponent = (compId: string) => {
    setComponents(prev => {
        const newComponents = { ...prev }
        delete newComponents[compId]
        
        // آپدیت مستقیم globalAppState
        if (dynaman) {
            const currentState = dynaman.getState();
            // ایجاد یک کپی جدید بدون کامپوننت حذف شده
            const updatedState = {
                ...currentState,
                components: newComponents
            };
            // پاک کردن و rebuild کامل
            localStorage.removeItem('globalAppState');
            const newDynaman = new Dynaman(updatedState);
            setDynaman(newDynaman);
        }
        
        return newComponents
    })

    if (selectedComponent === compId) {
        setSelectedComponent(null)
    }
}
    const handleAddComponent = () => {
        const newId = `comp_${Date.now()}_${Math.floor(Math.random() * 1000)}`
        setComponents(prev => ({
            ...prev,
            [newId]: {
                id: newId,
                widgets: [],
                meta: {
                    title: `New Component`,
                    createdAt: new Date().toISOString()
                }
            }
        }))
    }

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all components data?')) {
            if (dynaman) {
                dynaman.reconfig({ components: {} });
            }
            setComponents({})
            setSelectedComponent(null)
            createInitialComponents()
        }
    }

    const handleResetToDefault = () => {
        if (window.confirm('Are you sure you want to reset ALL globalAppState to default?')) {
            if (dynaman) {
                const resetState = dynaman.resetToDefault();
                setComponents(resetState.components || {});
            }
            setSelectedComponent(null)
        }
    }

    const WidgetRenderer = ({ compId }: { compId: string }) => {
        const componentData : any = components[compId];
        const widgetNames = componentData?.widgets || [];
        const widgetsData = componentData?.widgetsData || {};

        if (!widgetNames.length) {
            return (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                    <MdWidgets className="text-2xl mb-2" />
                    <span className="text-sm">No widgets</span>
                </div>
            );
        }

        return (
            <ComponentProvider component={componentData}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {widgetNames.map((name :any, index: any) => {
                        const widgetKey = `widget_${index}`;
                        const widgetData = widgetsData[widgetKey] || {};
                        
                        return (
                            <div
                                key={`${compId}_${name}_${index}`}
                                className="relative group"
                                onClick={() => {
                                    window.dispatchEvent(new CustomEvent('activateWidget', {
                                        detail: { componentId: compId, widgetIndex: index }
                                    }));
                                }}
                            >
                                <div className="h-full cursor-pointer">
                                    {name === "widget_1" && (
                                        <Widget1 
                                            widgetIndex={index}
                                            componentId={compId}
                                            {...widgetData}
                                        />
                                    )}
                                    {name === "widget_2" && (
                                        <Widget2 
                                            widgetIndex={index}
                                            componentId={compId}
                                            {...widgetData}
                                        />
                                    )}
                                    {name === "widget_3" && (
                                        <Widget3 
                                            widgetIndex={index}
                                            componentId={compId}
                                            {...widgetData}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ComponentProvider>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                                <FaRegObjectGroup className="text-gray-600 dark:text-gray-400 text-xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    Component Manager
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    {componentIds.length} components •
                                    {selectedComponent ? ` Selected: ${selectedComponent.substring(0, 8)}...` : ' No component selected'}
                                    {isLoaded && ' • 💾 Saved in globalAppState'}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleAddComponent}
                                className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-5 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                                <FaPlus className="text-sm" />
                                New Component
                            </button>

                            {selectedComponent && (
                                <Dropdown
                                    logic={{
                                        trigger: (
                                            <button className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-5 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                                                <FaPalette className="text-sm" />
                                                Add Widget
                                            </button>
                                        ),
                                        placement: "bottom",
                                        items: [
                                            { type: "header", label: "Select Widget" },
                                            {
                                                type: "item",
                                                label: "Widget 1",
                                                onClick: () => handleAddWidget("widget_1"),
                                            },
                                            {
                                                type: "item",
                                                label: "Widget 2",
                                                onClick: () => handleAddWidget("widget_2"),
                                            },
                                            {
                                                type: "item",
                                                label: "Widget 3",
                                                onClick: () => handleAddWidget("widget_3"),
                                            },
                                        ],
                                    }}
                                />
                            )}

                            <button
                                onClick={handleClearData}
                                className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-4 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                                <FaTrash className="text-sm" />
                                Clear Components
                            </button>
                        </div>
                    </div>
                </div>

                {/* Components List */}
                <div className="space-y-6">
                    {componentIds.map((id) => {
                        const isSelected = selectedComponent === id
                        const widgetCount = components[id]?.widgets?.length || 0

                        return (
                            <div
                                key={id}
                                onClick={() => handleSelectComponent(id)}
                                className={`bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${isSelected
                                    ? "border-gray-400 dark:border-gray-500 shadow-lg bg-gray-50 dark:bg-gray-700"
                                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                                    }`}
                            >
                                <div className="p-6">
                                    {/* Component Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${isSelected
                                                ? "bg-gray-200 dark:bg-gray-600"
                                                : "bg-gray-100 dark:bg-gray-700"
                                                }`}>
                                                <FaCube className={
                                                    isSelected
                                                        ? "text-gray-700 dark:text-gray-300"
                                                        : "text-gray-600 dark:text-gray-400"
                                                } />
                                            </div>
                                            <div>
                                                <div className="font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-600">
                                                    {components[id]?.meta?.title || id}
                                                </div>
                                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <MdWidgets className="text-xs" />
                                                    {widgetCount} widgets
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {isSelected && (
                                                <span className="flex items-center gap-2 bg-gray-600 text-white px-3 py-1 rounded-lg text-sm">
                                                    <FaMousePointer className="text-xs" />
                                                    Selected
                                                </span>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    if (window.confirm(`Are you sure you want to delete this component?`)) {
                                                        handleRemoveComponent(id)
                                                    }
                                                }}
                                                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                            >
                                                <FaTrash className="text-xs" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Widgets Content */}
                                    <WidgetRenderer compId={id} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Empty State */}
                {componentIds.length === 0 && (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <div className="text-6xl mb-4 text-gray-400 dark:text-gray-500">
                            <FaRegObjectGroup />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No components found</p>
                        <button
                            onClick={handleAddComponent}
                            className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-6 py-3 rounded-xl font-medium transition-colors duration-200 mx-auto"
                        >
                            <FaPlus />
                            Create First Component
                        </button>
                    </div>
                )}

                {/* Management Buttons */}
                <div className="fixed bottom-6 left-6 flex flex-col gap-3">
                    <button
                        onClick={() => {
                            console.log('Components State:', components)
                            console.log('Selected Component:', selectedComponent)
                            console.log('Global App State:', dynaman?.getState())
                        }}
                        className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors duration-200 shadow-lg"
                    >
                        <FaEye />
                        Check State
                    </button>
                    
                    <button
                        onClick={handleResetToDefault}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 shadow-lg"
                    >
                        <FaTrash />
                        Reset All Data
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Index