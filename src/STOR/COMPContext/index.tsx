
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ComponentData {
  id: string;
  widgets: string[];
  meta?: {
    title?: string;
    description?: string;
    createdAt?: string;
  };
}

interface ComponentContextType {
  component: ComponentData;
  addWidget: (widgetName: string) => void;
  removeWidget: (widgetIndex: number) => void;
  updateMeta: (meta: Partial<ComponentData['meta']>) => void;
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

interface ComponentProviderProps {
  component: ComponentData;
  children: ReactNode;
}

export const ComponentProvider: React.FC<ComponentProviderProps> = ({ 
  component: initialComponent, 
  children 
}) => {
  const [component, setComponent] = useState<ComponentData>(initialComponent);

  const addWidget = (widgetName: string) => {
    setComponent(prev => ({
      ...prev,
      widgets: [...prev.widgets, widgetName]
    }));
  };

  const removeWidget = (widgetIndex: number) => {
    setComponent(prev => ({
      ...prev,
      widgets: prev.widgets.filter((_, index) => index !== widgetIndex)
    }));
  };

  const updateMeta = (meta: Partial<ComponentData['meta']>) => {
    setComponent(prev => ({
      ...prev,
      meta: { ...prev.meta, ...meta }
    }));
  };

  const value: ComponentContextType = {
    component,
    addWidget,
    removeWidget,
    updateMeta
  };

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
};

// Hook برای استفاده از context در ویجت‌ها
export const useComponent = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error('useComponent must be used within a ComponentProvider');
  }
  return context;
};