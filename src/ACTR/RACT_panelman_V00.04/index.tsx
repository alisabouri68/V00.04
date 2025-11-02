import React from "react";
import { componentLoader } from "./g2";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

// BOX Components
import BOX_header from "BOX/BOX_header";
import BOX_actionn from "BOX/BOX_action";
import BOX_actiomMenue from "BOX/BOX_actionMenue";
import BOX_actiomContent from "BOX/BOX_actionContent";
import BOX_assistant from "BOX/BOX_assistant";
import Jini from "BOX/BOX_Jinni";

export class PanelMan {
  private envi: any;

  constructor() {
    this.envi = null;
  }

  public setContext(envi: any) {
    this.envi = envi;
  }

  public getAccessibleRoutes(): string[] {
    return Object.keys(this.envi?.ENVI_CONS || {});
  }

  public getRouteState(id: string): boolean {
    return !!this.envi?.ENVI_CONS?.[id];
  }

  public getRouteConfig(id: string): any | null {
    const routeData = this.envi?.ENVI_CONS?.[id];
    if (!routeData) return null;
    return { ...routeData.General, bundle: routeData.bundle };
  }

  /** 🧩 ساخت کامل صفحه */
  public buildPage(pageKey: string): React.ReactNode {
    if (!this.envi) return null;
    const routeConfig = this.getRouteConfig(pageKey);
    if (!routeConfig) return null;

    const headerContent = this.buildHeader(pageKey);
    const navigationContent = this.buildNavigation(pageKey);
    const actionContent = this.buildActionContent(pageKey);
    const assistantContent = this.buildAssistantContent(pageKey);

    return this.renderPageLayout(
      headerContent,
      navigationContent,
      actionContent,
      assistantContent,
      routeConfig,
      pageKey
    );
  }

  /** 🧱 ساخت Header */
  private buildHeader(pageKey: string): any {
    const routeData = this.envi?.ENVI_CONS?.[pageKey];
    const headerId = routeData?.bundle?.header;

    const headerBundle =
      (Object.values(this.envi?.ENVI_BUNDL || {}) as any[]).find(
        (b) => b.id === headerId
      ) || { components: [] };

    const slots: Record<string, React.ReactNode> = {};
    headerBundle.components.forEach((compName: string, i: number) => {
      const Comp = componentLoader.getComponent(compName);
      const props = this.getComponentProps(compName);
      if (Comp) slots[`slot${i}`] = <Comp key={compName} {...props} />;
    });

    return { slots };
  }

  /** 🧭 ساخت Navigation */
  private buildNavigation(pageKey: string): React.ReactNode {
    const routeData = this.envi?.ENVI_CONS?.[pageKey];
    const navId = routeData?.bundle?.navigation;

    const navBundle =
      (Object.values(this.envi?.ENVI_BUNDL || {}) as any[]).find(
        (b) => b.id === navId
      ) || { components: [] };

    const navItems = (navBundle.components || []).map((_: any, i: number) =>
      this.createNavItem(this.getNavItemProps(i))
    );

    const BoxNav = componentLoader.getComponent("BoxNav");
    return BoxNav
      ? React.createElement(BoxNav, {}, ...navItems)
      : this.renderFallbackNavigation();
  }

  /** ⚙️ ساخت Action Content */
  private buildActionContent(pageKey: string): React.ReactNode {
    const routeData = this.envi?.ENVI_CONS?.[pageKey];
    const actionId = routeData?.bundle?.action;

    if (!actionId) return this.renderFallbackActionContent();

    const actionBundle =
      (Object.values(this.envi?.ENVI_BUNDL || {}) as any[]).find(
        (b) => b.id === actionId
      ) || { components: [] };

    const components = actionBundle.components || [];
    const renderedComponents = components.map((compName: string, index: number) => {
      const Comp = componentLoader.getComponent(compName);
      const props = this.getComponentProps(compName);
      return Comp ? <Comp key={`${compName}-${index}`} {...props} /> : null;
    });

    return (
      <BOX_actiomContent>
        {renderedComponents.length > 0
          ? renderedComponents
          : this.renderFallbackActionContent()}
      </BOX_actiomContent>
    );
  }

  /** ⚙️ ساخت Assistant */
  private buildAssistantContent(pageKey: string): React.ReactNode {
    const routeData = this.envi?.ENVI_CONS?.[pageKey];
    const assistantId = routeData?.bundle?.assistant;

    if (!assistantId) return null;

    const assistantBundle =
      (Object.values(this.envi?.ENVI_BUNDL || {}) as any[]).find(
        (b) => b.id === assistantId
      ) || { components: [] };

    const components = assistantBundle.components || [];
    const renderedComponents = components.map((compName: string, index: number) => {
      const Comp = componentLoader.getComponent(compName);
      const props = this.getComponentProps(compName);
      return Comp ? <Comp key={`${compName}-${index}`} {...props} /> : null;
    });

    return <BOX_assistant>{renderedComponents}</BOX_assistant>;
  }

  /** 🎯 ایجاد آیتم ناوبری */
  private createNavItem(props: any): React.ReactNode {
    const { id, title, icon, href, enabled } = props;
    if (!enabled) return null;
    return (
      <li key={id} className="flex items-center justify-center w-full" role="none">
        <a
          href={href}
          className="border-s-transparent border-s-4 flex flex-col items-center justify-center p-1 w-full bg-light text-dark hover:text-primary"
        >
          <span className="p-2 text-2xl">{icon}</span>
          <span className="text-sm">{title}</span>
        </a>
      </li>
    );
  }

  private getNavItemProps(index: number): any {
    const items = [
      { id: "home", title: "خانه", icon: "🏠", href: "/", enabled: true },
      { id: "hot", title: "داغ‌ها", icon: "🔥", href: "/hot", enabled: true },
      { id: "cast", title: "کست", icon: "🎙️", href: "/cast", enabled: true },
      { id: "wiki", title: "ویکی", icon: "📚", href: "/wiki", enabled: true },
      { id: "gasma", title: "گاسما", icon: "⭐", href: "/gasma", enabled: true },
    ];
    return items[index] || {};
  }

  private getComponentProps(compName: string): any {
    return this.envi?.ENVI_CANV?.[compName] || {};
  }

/** 🚀 رندر نهایی صفحه */
private renderPageLayout(
  headerContent: any,
  navigationContent: any,
  actionContent: any,
  assistantContent: any,
  config: any,
  pageKey: string
): React.ReactNode {
  return (
    <div className="flex flex-col w-full h-full bg-secendory gap-1 px-1 font-sans font-semibold">
      
      {/* Header */}
      <BOX_header {...headerContent} consolName={pageKey} />

      <div className="flex flex-1 w-full h-full gap-1 overflow-hidden">
        
        {/* Navigation */}
        <div className="flex-none max-w-xs w-auto bg-gray-100 rounded-md overflow-y-auto">
          {navigationContent || this.renderFallbackNavigation()}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-2 overflow-hidden h-full">
          <BOX_actionn >
            <div className="flex-1 bg-light text-dark rounded-md overflow-y-auto p-2 h-full flex flex-col gap-2">
              <Jini />
              <BOX_actiomMenue>{config}</BOX_actiomMenue>
              {actionContent || this.renderFallbackActionContent()}
            </div>

            {/* Assistant */}
            {assistantContent || <BOX_assistant />}
          </BOX_actionn>
        </div>

      </div>
    </div>
  );
}


  /** 🧭 Fallback Navigation */
  private renderFallbackNavigation(): React.ReactNode {
    const fallbackItems = [
      { id: "home", title: "خانه", icon: "🏠", href: "/", enabled: true },
      { id: "hot", title: "داغ‌ها", icon: "🔥", href: "/hot", enabled: true },
      { id: "cast", title: "کست", icon: "🎙️", href: "/cast", enabled: true },
      { id: "wiki", title: "ویکی", icon: "📚", href: "/wiki", enabled: true },
      { id: "gasma", title: "گاسما", icon: "⭐", href: "/gasma", enabled: true },
    ];

    const navItems = fallbackItems.map((item) => this.createNavItem(item));
    const BoxNavComp = componentLoader.getComponent("BoxNav");
    return BoxNavComp ? (
      React.createElement(BoxNavComp, {}, ...navItems)
    ) : (
      <div className="text-red-500 p-4">
        ❌ ناوبری در دسترس نیست - BoxNav component missing
      </div>
    );
  }

  private renderFallbackActionContent(): React.ReactNode {
    return (
      <div className="text-gray-400 text-sm flex flex-col items-center gap-2">
        ⚙️ محتوای اکشن در دسترس نیست
      </div>
    );
  }
}

/** 🎮 هوک دسترسی */
export function usePanelMan() {
  const { envi } = initDyna();
  const ref = React.useRef(new PanelMan());

  React.useEffect(() => {
    if (envi && !ref.current["envi"]) {
      ref.current.setContext(envi);
    }
  }, [envi]);

  return ref.current;
}

export const panelman = new PanelMan();
