// contexts/AssistantContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AssistantState {
  activeId: string | null;
  activeType: 'component' | 'widget' | null;
  section: 'meta' | 'geo' | 'logic' | 'style';
  componentId?: string;
  widgetIndex?: number;
}

interface AssistantContextType {
  assistantState: AssistantState;
  activateComponent: (componentId: string) => void;
  activateWidget: (componentId: string, widgetIndex: number) => void;
  deactivate: () => void;
  setSection: (section: AssistantState['section']) => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

interface AssistantProviderProps {
  children: ReactNode;
}

export const AssistantProvider: React.FC<AssistantProviderProps> = ({ children }) => {
  const [assistantState, setAssistantState] = useState<AssistantState>({
    activeId: null,
    activeType: null,
    section: 'meta'
  });

  const activateComponent = (componentId: string) => {
    setAssistantState({
      activeId: componentId,
      activeType: 'component',
      section: 'meta',
      componentId
    });
  };

  const activateWidget = (componentId: string, widgetIndex: number) => {
    setAssistantState({
      activeId: `${componentId}_widget_${widgetIndex}`,
      activeType: 'widget',
      section: 'meta',
      componentId,
      widgetIndex
    });
  };

  const deactivate = () => {
    setAssistantState({
      activeId: null,
      activeType: null,
      section: 'meta'
    });
  };

  const setSection = (section: AssistantState['section']) => {
    setAssistantState(prev => ({ ...prev, section }));
  };

  const value: AssistantContextType = {
    assistantState,
    activateComponent,
    activateWidget,
    deactivate,
    setSection
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};