// ACTR/RACT_panelman_V00.04/index.tsx
import React, { useEffect, useRef } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import { ResponsiveWrapper } from "./g1_ResponsiveWrapper";
import { componentLoader } from "./g2_componentLoader";

export class PanelMan {
  private envi: any;

  constructor() {
    this.envi = null;
  }

  public setContext(envi: any) {
    this.envi = envi;
  }

  public getAccessibleRoutes(): string[] {
    return Object.keys(this.envi?.BODY || {});
  }

  public getRouteState(routeKey: string): boolean {
    return this.getAccessibleRoutes().includes(routeKey);
  }

  public getRouteConfig(routeKey: string): any | null {
    const routeBody = this.envi?.BODY?.[routeKey];
    if (!routeBody) return null;

    return {
      ...routeBody.general,
      boxes: routeBody.boxes,
    };
  }

  public buildPage(pageKey: string): React.ReactNode {
    if (!this.envi) {
      return <div className="p-4 text-red-500">🚫 Environment not loaded</div>;
    }

    const routeBody = this.envi?.BODY?.[pageKey];
    if (routeBody) {
      const pageContent = this.buildPageFromBody(routeBody, pageKey);
      return <ResponsiveWrapper>{pageContent}</ResponsiveWrapper>;
    }

    return (
      <div className="p-4 bg-yellow-100">⚠️ Page not found: {pageKey}</div>
    );
  }

  private buildPageFromBody(routeBody: any, pageKey: string): React.ReactNode {
    const { boxes } = routeBody;

    if (!boxes) {
      return <div className="p-4 bg-orange-100">📭 No boxes for {pageKey}</div>;
    }

    return (
      <div className="flex flex-col w-full h-full bg-gray-100 dark:bg-gray-700 gap-2 p-1">
        {/* Header Box - با پشتیبانی از اسلات‌ها */}
        {boxes.header && this.renderHeaderBox(boxes.header, pageKey)}

        {/* Main Content */}
        <div className="flex h-full gap-1 mb-1 ">
          {/* Navigation Box */}
          {boxes.navigation &&
            this.renderBox("navigation", boxes.navigation, pageKey)}

          {/* Main Area */}
          <main className="flex-1 h-full flex gap-1">
            {/* Left Content Area */}
            <div className="w-9/12 h-full bg-light text-dark rounded-md overflow-y-auto custom-scrollbar mb-1">
              {boxes.actionjini &&
                this.renderBox("actionjini", boxes.actionjini, pageKey)}
              {boxes.actionMenu &&
                this.renderBox("actionMenu", boxes.actionMenu, pageKey)}
              {boxes.actionContent &&
                this.renderBox("actionContent", boxes.actionContent, pageKey)}
            </div>

            {/* Right Assistant Area */}
            <div className="flex flex-col mb-1 items-center bg-light text-dark rounded-md overflow-y-auto custom-scrollbar h-full w-3/12">
              {boxes.assistantMenu &&
                this.renderBox("assistantMenu", boxes.assistantMenu, pageKey)}
              {boxes.assistantContent &&
                this.renderBox(
                  "assistantContent",
                  boxes.assistantContent,
                  pageKey
                )}
            </div>
          </main>
        </div>
      </div>
    );
  }

  /** 🎨 رندر خاص برای باکس هدر با اسلات‌ها */
  private renderHeaderBox(box: any, pageKey: string): React.ReactNode {
    if (!box.enabled) return null;

    let components: string[] = [];

    if (Array.isArray(box.components)) {
      components = box.components;
    } else if (Array.isArray(box.component)) {
      components = box.component;
    } else if (typeof box.components === "string") {
      components = [box.components];
    } else if (typeof box.component === "string") {
      components = [box.component];
    }

    if (components.length === 0) {
      return null;
    }

    const headerComponentName = components.find((name) => name === "boxheader");
    const otherComponents = components.filter((name) => name !== "boxheader");

    if (!headerComponentName) {
      return null;
    }

    // ایجاد اسلات‌ها از کامپوننت‌های دیگر
    const slots: Record<string, React.ReactNode> = {};
    otherComponents.forEach((componentName, index) => {
      slots[`slot${index}`] = this.renderSingleComponent(
        componentName,
        "header",
        pageKey,
        index
      );
    });

    // رندر boxheader با اسلات‌ها
    const HeaderComponent = componentLoader.getComponent(headerComponentName);
    if (!HeaderComponent) return null;

    const componentProps = this.envi?.ENVI_CANV?.[headerComponentName] || {};

    return (
      <header className="flex items-center min-h-16 max-h-16 bg-light text-dark w-full *:grow rounded-md">
        <HeaderComponent
          {...componentProps}
          consolName={pageKey}
          slots={slots}
        />
      </header>
    );
  }

  /**  رندر یک باکس */
  private renderBox(
    boxType: string,
    box: any,
    pageKey: string
  ): React.ReactNode {
    if (!box.enabled) return null;

    let components: string[] = [];

    if (Array.isArray(box.components)) {
      components = box.components;
    } else if (Array.isArray(box.component)) {
      components = box.component;
    } else if (typeof box.components === "string") {
      components = [box.components];
    } else if (typeof box.component === "string") {
      components = [box.component];
    }

    if (components.length === 0) {
      return null;
    }

    return <>{this.renderBoxComponents(boxType, components, pageKey)}</>;
  }

  /**  رندر باندل های یک باکس */
  private renderBoxComponents(
    boxType: string,
    components: string[],
    pageKey: string
  ): React.ReactNode {
    return (
      <>
        {components.map((componentName: string, index: number) =>
          this.renderSingleComponent(componentName, boxType, pageKey, index)
        )}
      </>
    );
  }

  /**  رندر یک کنوس */
  private renderSingleComponent(
    componentName: string,
    boxType: string,
    pageKey: string,
    index: number
  ): React.ReactNode {
    const Component = componentLoader.getComponent(componentName);
    const componentProps = this.envi?.ENVI_CANV?.[componentName] || {};

    if (!Component) {
      return null;
    }

    const enhancedProps = {
      ...componentProps,
      ...(boxType === "header" && { consolName: pageKey }),
    };

    return (
      <div key={`${pageKey}-${boxType}-${index}`}>
        <Component {...enhancedProps} />
      </div>
    );
  }
}

export function usePanelMan() {
  const { envi } = initDyna();
  const ref = useRef(new PanelMan());

  useEffect(() => {
    if (envi) {
      ref.current.setContext(envi);
    }
  }, [envi]);

  return ref.current;
}

export const panelman = new PanelMan();
