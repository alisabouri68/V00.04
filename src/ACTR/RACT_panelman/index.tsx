import React, { lazy, Suspense, useEffect, useMemo, ReactNode, ComponentType, useState } from "react";
import Header from "../../BOX/BOX_header";
import BoxNav from "../../BOX/BOX_nav";
import NavDesk from "../../COMP/RCMP_navigator_VAR.01_V00.04";
import NavMobile from "../../COMP/RCMP_navigator_VAR.02_V00.04";
import BoxJini from "../../BOX/BOX_Jinni";
import BoxAuxilary from "../../BOX/BOX_auxiliary";
import BoxAssistant from "../../BOX/BOX_assistant";
import Button from "COMP/RCMP_button_V00.04";
// Define props interfaces with optional children
interface LayoutComponentProps {
  children?: ReactNode;
  className?: string;
  staticDeskStyle?: string;
  floatLMobileStyle?: string;
  floatMobileStyle?: string;
  floatDDeskStyle?: string;
  staticMobileStyle?: string;
}

interface BoxComponentProps {
  children?: ReactNode;
  console?: string;
  onClick?: () => void;
}

// Lazy imports with proper typing
const Mobile_Deep_MultipleSubject = lazy(() => import("../../LAYOUT/LAYO_deepmultipeSubject_mobile_V00.04/Index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;
const Mobile_Flat = lazy(() => import("../../LAYOUT/LAYO_flat_mobile_V00.04/index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;
const Mobile_Float_Linear = lazy(() => import("../../LAYOUT/LAYO_floatLinear_mobile_V00.04/Index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;
const Mobile_Float_Deep = lazy(() => import("../../LAYOUT/LAYO_floatDeep_mobile_V00.04/Index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;
const Mobile_Static = lazy(() => import("../../LAYOUT/LAYO_static_mobile_V00.04/Index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;

const Desktop_Deep_MultipleSubject = lazy(() => import("../../LAYOUT/LAYO_deepmultipeSubject_desk_V00.04/Index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;
const Desktop_Flat = lazy(() => import("../../LAYOUT/LAYO_flat_desk_V00.04/index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;
const Desktop_Float_Deep = lazy(() => import("../../LAYOUT/LAYO_floatDeep_desk_V00.04/Index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;
const Desktop_Static = lazy(() => import("../../LAYOUT/LAYO_static_desk_V00.04/Index")) as React.LazyExoticComponent<ComponentType<LayoutComponentProps>>;

// Interface definitions with optional properties
interface LayerConfigItem {
  minWidth: number;
  layout: ComponentType<LayoutComponentProps>;
  box?: ComponentType<BoxComponentProps>;
  children?: React.ComponentType<any>;

}

interface ScreenActionConfig {
  jini: LayerConfigItem[];
  actionMenu: LayerConfigItem[];
  actionContent: LayerConfigItem[];
}


interface ScreenConfig {
  action: ScreenActionConfig;
  auxilary: LayerConfigItem[];
}

interface DeviceConfig {
  header: LayerConfigItem[];
  navigator: LayerConfigItem[];
  screen: ScreenConfig;
  assistant: LayerConfigItem[];
}

interface FullLayerConfig {
  mobile: DeviceConfig;
  desktop: DeviceConfig;
}

// Layer configuration
const LAYER_CONFIG: FullLayerConfig = {
  mobile: {
    header: [
      { minWidth: 0, layout: Mobile_Static, box: Header }
    ],
    navigator: [
      { minWidth: 0, layout: Mobile_Static, box: BoxNav, children: NavMobile }
    ],
    screen: {
      action: {
        jini: [
          { minWidth: 0, layout: Mobile_Static, box: BoxJini }
        ],
        actionMenu: [
          { minWidth: 0, layout: Mobile_Flat }
        ],
        actionContent: [
          { minWidth: 0, layout: Mobile_Deep_MultipleSubject }
        ],
      },
      auxilary: [
        { minWidth: 0, layout: Mobile_Float_Linear, box: BoxAuxilary },
      ],
    },
    assistant: [
      { minWidth: 0, layout: Mobile_Float_Deep, box: BoxAssistant }
    ],
  },
  desktop: {
    header: [
      { minWidth: 1024, layout: Desktop_Static, box: Header }
    ],
    navigator: [
      { minWidth: 1024, layout: Desktop_Static, box: BoxNav, children: NavDesk }
    ],
    screen: {
      action: {
        jini: [
          { minWidth: 1024, layout: Desktop_Static, box: BoxJini }
        ],
        actionMenu: [
          { minWidth: 1024, layout: Desktop_Flat }
        ],
        actionContent: [
          { minWidth: 1024, layout: Desktop_Deep_MultipleSubject }
        ],
      },
      auxilary: [
        { minWidth: 1024, layout: Desktop_Static, box: BoxAuxilary },
      ],
    },
    assistant: [
      { minWidth: 1024, layout: Desktop_Float_Deep, box: BoxAssistant }
    ],
  },
};

// Base layout component
const BaseLayout = ({ children }: { children: ReactNode }) => (
  <div className="relative flex flex-col min-h-screen">
    {children}
  </div>
);

const LayoutComposer = ({ console, actionChild, auxilaryChild, assistantChild }: { console: string; actionChild: ReactNode; auxilaryChild: ReactNode; assistantChild: ReactNode }) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsClient(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect device type
  const deviceType = useMemo(() =>
    windowSize.width < 1024 ? 'mobile' : 'desktop',
    [windowSize.width]
  );

  // Select layer with proper type handling
  const selectLayer = (path: string, defaultLayer: LayerConfigItem): LayerConfigItem => {
    if (!isClient) return defaultLayer;

    const parts = path.split('.');
    let current: any = LAYER_CONFIG[deviceType];

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return defaultLayer;
      }
    }

    // If we ended up with an array, return the first item
    if (Array.isArray(current)) {
      return current[0];
    }

    return current || defaultLayer;
  };

  // Select layers
  const headerLayer = selectLayer('header', {
    minWidth: 0,
    layout: Mobile_Static,
    box: Header
  });

  const navigatorLayer = selectLayer('navigator', {
    minWidth: 0,
    layout: Mobile_Float_Linear,
    box: BoxNav,
    children: NavDesk
  });

  const actionJiniLayer = selectLayer('screen.action.jini', {
    minWidth: 0,
    layout: Mobile_Static,
    box: BoxJini
  });
  const actionAxularyLayer = selectLayer('screen.auxilary', {
    minWidth: 0,
    layout: Mobile_Float_Deep,
    box: BoxAuxilary
  });
  const actionAssistantLayer = selectLayer('assistant', {
    minWidth: 0,
    layout: Mobile_Float_Deep,
    box: BoxAuxilary
  });

  // Extract components
  const HeaderLayout = headerLayer.layout;
  const HeaderBox = headerLayer.box || (() => null);
  const NavigatorLayout = navigatorLayer.layout;
  const NavigatorBox = navigatorLayer.box || (() => null);
  const NavigatorChildren = navigatorLayer.children || null;
  const ActionJiniLayout = actionJiniLayer.layout;
  const ActionJiniBox = actionJiniLayer.box || (() => null);
  const ActionAxularyLayout = actionAxularyLayer.layout;
  const ActionAxularyBox = actionAxularyLayer.box || (() => null);
  const ActionAssistantLayer = actionAssistantLayer.layout;
  const ActionAssistantBox = actionAssistantLayer.box || (() => null);

  if (!isClient) {
    return <LoadingIndicator />;
  }
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <BaseLayout>
        <HeaderLayout staticMobileStyle="h-max">
          {HeaderBox && <HeaderBox console={console} />}
        </HeaderLayout>

        <div className="flex flex-1 p-1 overflow-hidden flex-col-reverse lg:flex-row ">
          <NavigatorLayout staticMobileStyle="h-max" >
            {NavigatorBox && (
              <NavigatorBox>
                {NavigatorChildren && <NavigatorChildren />}
              </NavigatorBox>
            )}
          </NavigatorLayout>


          <main className="flex items-center h-full lg:h-full ">
            {/* Action Section */}
            <section className="relative flex flex-col h-full w-full lg:w-9/12 rounded-md overflow-y-auto custom-scrollbar lg:ms-1 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300">
              <div className="">
                <ActionJiniLayout>
                  {ActionJiniBox && <ActionJiniBox />}
                </ActionJiniLayout>
                {actionChild}
              </div>
            </section>

            {/* Auxiliary Section */}
            <ActionAxularyLayout
              floatLMobileStyle={`${isOpen ? "translate-y-0" : "translate-y-full"
                } transition-transform duration-1000 fixed bottom-0 start-0 top-0 w-full bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300 z-10`}
              staticDeskStyle="relative w-3/12 h-full ms-1 bg-white dark:bg-gray-950 overflow-y-auto custom-scrollbar text-gray-500 dark:text-gray-300 rounded-md flex items-center justify-center"
            >
              <ActionAxularyBox onClick={() => setIsOpen(!isOpen)} >
                {auxilaryChild}
              </ActionAxularyBox>
            </ActionAxularyLayout>
            <ActionAssistantLayer floatDDeskStyle="fixed w-full h-full top-0 left-0 right-0 buttom-0 bg-transparent pointer-events-none overflow-hidden">
              <ActionAssistantBox >
                {assistantChild}
              </ActionAssistantBox >
            </ActionAssistantLayer>
          </main>
        </div>
      </BaseLayout>
      <Button
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 lg:hidden"
        variant="filled"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        Auxilary
      </Button>
    </Suspense>
  );
};

const LoadingIndicator = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
    <p className="">Loading interface components...</p>
  </div>
);

export default LayoutComposer;


















// {
//         auxilaryMenu: [
//           { minWidth: 768, layout: Desktop_Flat }
//         ],
//         auxilaryContent: [
//           { minWidth: 768, layout: Desktop_Deep_MultipleSubject }
//         ],
//       }