// ACTR/RACT_panelman_V00.04/index.ts
import React from "react";
import { componentLoader } from "./g2";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

// import کامپوننت‌های BOX
import BOX_header from 'BOX/BOX_header';
import BOX_nav from 'BOX/BOX_nav';
import BOX_actionn from 'BOX/BOX_action';
import BOX_actiomMenue from 'BOX/BOX_actionMenue';
import BOX_actiomContent from 'BOX/BOX_actionContent';
import BOX_assistant from 'BOX/BOX_assistant';
import Jini from "BOX/BOX_Jinni";

export class PanelMan {
  private envi: any;
  private currentRole: string = 'default';

  constructor() {
    this.envi = null;
  }

  public setContext(envi: any) {
    this.envi = envi;
    console.log("✅ PanelMan context set with ENVI data");
  }

  public initByRole(role: string = 'default'): void {
    this.currentRole = role;
    console.log(`✅ PanelMan initialized with role: ${role}`);
  }

  public getAccessibleRoutes(): string[] {
    if (!this.envi?.ENVI_CONS) return [];
    return Object.keys(this.envi.ENVI_CONS);
  }

  public getRouteState(id: string): boolean {
    return !!this.envi?.ENVI_CONS?.[id];
  }

  public getRouteConfig(id: string): any | null {
    const routeData = this.envi?.ENVI_CONS?.[id];
    if (!routeData) return null;

    return {
      ...routeData.General,
      bundle: routeData.bundle
    };
  }

  /** ساخت کامل صفحه از روی ENVI data */
  public buildPage(pageKey: string): React.ReactNode {
    if (!this.envi) {
      console.log("❌ No ENVI data available");
      return null;
    }

    const routeConfig = this.getRouteConfig(pageKey);
    if (!routeConfig) {
      console.log(`❌ No route config found for: ${pageKey}`);
      return null;
    }

    console.log(`✅ Building page for: ${pageKey}`, routeConfig);

    // ساخت هدر و ناوبری داینامیک بر اساس باندل
    const headerContent = this.buildHeader(pageKey);
    const navigationContent = this.buildNavigation(pageKey);

    return this.renderPageLayout(headerContent, navigationContent, routeConfig, pageKey);
  }

  /** ساخت هدر داینامیک بر اساس باندل */
  private buildHeader(pageKey: string): any {
    console.log(`🔍 Building header for: ${pageKey}`);
    
    const routeData = this.envi?.ENVI_CONS?.[pageKey];
    if (!routeData?.bundle) {
      console.log(`❌ No bundles found for page: ${pageKey}`);
      return {};
    }

    const headerBundleId = routeData.bundle.header;
    if (!headerBundleId) {
      console.log(`❌ No header bundle found for page: ${pageKey}`);
      return {};
    }

    const headerBundleDef = this.envi?.ENVI_BUNDL?.header;
    if (!headerBundleDef || headerBundleDef.id !== headerBundleId) {
      console.log(`❌ Header bundle definition not found: ${headerBundleId}`);
      return {};
    }

    console.log(`🔧 Header bundle components:`, headerBundleDef.components);

    const headerSlots: Record<string, React.ReactNode> = {};
    
    if (headerBundleDef.components) {
      headerBundleDef.components.forEach((compName: string, index: number) => {
        console.log(`🔄 Loading header component: ${compName}`);
        const Comp = componentLoader.getComponent(compName);
        const props = this.getComponentProps(compName);
        
        if (Comp) {
          console.log(`✅ Header component ${compName} loaded successfully`);
          headerSlots[`slot${index}`] = React.createElement(Comp, props);
        } else {
          console.warn(`❌ Header component not found: ${compName}`);
        }
      });
    }

    return { slots: headerSlots };
  }

  /** ساخت ناوبری داینامیک بر اساس باندل */
  private buildNavigation(pageKey: string): React.ReactNode {
    console.log(`🔍 Building navigation for: ${pageKey}`);
    
    const routeData = this.envi?.ENVI_CONS?.[pageKey];
    if (!routeData?.bundle) {
      console.log(`❌ No bundles found for page: ${pageKey}`);
      return this.renderFallbackNavigation();
    }

    const navBundleId = routeData.bundle.navigation;
    if (!navBundleId) {
      console.log(`❌ No navigation bundle found for page: ${pageKey}`);
      return this.renderFallbackNavigation();
    }

    const navBundleDef = this.envi?.ENVI_BUNDL?.navigation;
    if (!navBundleDef || navBundleDef.id !== navBundleId) {
      console.log(`❌ Navigation bundle definition not found: ${navBundleId}`);
      return this.renderFallbackNavigation();
    }

    console.log(`🔧 Navigation bundle components:`, navBundleDef.components);

    // ساخت آیتم‌های ناوبری
    const navItems = this.buildNavItems(navBundleDef.components || []);
    
    console.log(`🎉 Final navigation items:`, navItems.length);
    
    // استفاده از کامپوننت BoxNav برای رندر آیتم‌ها
    return this.renderBoxNav(navItems);
  }

  /** ساخت آیتم‌های ناوبری */
  private buildNavItems(componentNames: string[]): React.ReactNode[] {
    const navItems: React.ReactNode[] = [];
    
    componentNames.forEach((compName: string, index: number) => {
      console.log(`🔄 Processing nav component: ${compName} at index ${index}`);
      const Comp = componentLoader.getComponent(compName);
      
      if (Comp) {
        // ساخت props داینامیک بر اساس index
        const props = this.getNavItemProps(index);
        console.log(`✅ Nav component ${compName} processed with props:`, props);
        
        // ایجاد کامپوننت nav item
        const navItem = this.createNavItem(props);
        navItems.push(navItem);
      } else {
        console.warn(`❌ Nav component not found: ${compName}`);
      }
    });

    return navItems;
  }

  /** ایجاد یک آیتم ناوبری */
  private createNavItem(props: any): React.ReactNode {
    const { id, title, icon, href, enabled } = props;
    
    if (!enabled) return null;

    return (
      <li key={id} className="flex items-center justify-center w-full" role="none">
        <a
          href={href}
          className="border-s-transparent border-s-4 flex flex-col items-center justify-center p-1 w-full bg-light text-dark hover:text-primary"
        >
          <span
            className="flex items-center justify-center p-2 rounded-full text-2xl transition-all w-10 h-10 text-inherit"
            aria-hidden="true"
          >
            {icon}
          </span>
          <span className="text-sm font-medium capitalize text-inherit">
            {title}
          </span>
        </a>
      </li>
    );
  }

  /** رندر BoxNav با children */
  private renderBoxNav(navItems: React.ReactNode[]): React.ReactNode {
    const BoxNavComp = componentLoader.getComponent("BoxNav");
    
    if (BoxNavComp) {
      console.log(`✅ BoxNav component found, rendering with ${navItems.length} items`);
      return React.createElement(BoxNavComp, {}, ...navItems);
    } else {
      console.error(`❌ BoxNav component not found in ComponentLoader`);
      return this.renderFallbackNavigation();
    }
  }

  /** ناوبری fallback در صورت بروز مشکل */
  private renderFallbackNavigation(): React.ReactNode {
    console.log("🔄 Using fallback navigation");
    
    const fallbackItems = [
      { id: "home", title: "خانه", icon: "🏠", href: "/", enabled: true },
      { id: "hot", title: "داغ‌ها", icon: "🔥", href: "/hot", enabled: true },
      { id: "cast", title: "کست", icon: "🎙️", href: "/cast", enabled: true },
      { id: "wiki", title: "ویکی", icon: "📚", href: "/wiki", enabled: true },
      { id: "gasma", title: "گاسما", icon: "⭐", href: "/gasma", enabled: true }
    ];

    const navItems = fallbackItems.map(item => this.createNavItem(item));
    
    const BoxNavComp = componentLoader.getComponent("BoxNav");
    if (BoxNavComp) {
      return React.createElement(BoxNavComp, {}, ...navItems);
    } else {
      return (
        <div className="text-red-500 p-4">
          ❌ ناوبری در دسترس نیست - BoxNav component missing
        </div>
      );
    }
  }

  /** گرفتن پروپرتی‌های داینامیک برای آیتم‌های ناوبری بر اساس index */
  private getNavItemProps(index: number): any {
    const navItemsConfig = [
      { id: "home", title: "خانه", icon: "🏠", href: "/", enabled: true },
      { id: "hot", title: "داغ‌ها", icon: "🔥", href: "/hot", enabled: true },
      { id: "cast", title: "کست", icon: "🎙️", href: "/cast", enabled: true },
      { id: "wiki", title: "ویکی", icon: "📚", href: "/wiki", enabled: true },
      { id: "gasma", title: "گاسما", icon: "⭐", href: "/gasma", enabled: true }
    ];

    return index < navItemsConfig.length ? navItemsConfig[index] : {};
  }

  /** گرفتن پروپرتی‌های کامپوننت از ENVI_CANV */
  private getComponentProps(compName: string): any {
    const props = this.envi?.ENVI_CANV?.[compName] || {};
    return props;
  }

  /** رندر layout صفحه با کامپوننت‌های BOX */
  private renderPageLayout(headerContent: any, navigationContent: any, config: any, pageKey: string): React.ReactNode {
    console.log(`🎨 Rendering layout for: ${pageKey}`);
    
    return (
      <div className='flex flex-wrap items-center w-full h-full bg-secendory gap-1 px-1 font-sans font-semibold'>
        {/* هدر داینامیک */}
        <BOX_header {...headerContent} consolName={pageKey} />
        
        <div className="flex items-center w-full h-full gap-1">
          {/* ناوبری داینامیک */}
          {navigationContent}
          
          <BOX_actionn>
            <div className='w-9/12 h-full bg-light text-dark rounded-md overflow-y-auto custom-scrollbar'>
              <Jini />

              <BOX_actiomMenue>
                منوی {config.name || pageKey}
              </BOX_actiomMenue>
              
              <BOX_actiomContent>
                <div className='bg-light text-dark'>
                  <h1>{config.name || pageKey}</h1>
                  <div>مسیر: {config.path}</div>
                  <div>کلید: {pageKey}</div>

                  <div>
                    <h3>محتوای صفحه {pageKey}</h3>
                    <p>این بخش می‌تواند بر اساس pageKey کامپوننت مختلفی نمایش دهد</p>

                    {config.bundle && (
                      <div>
                        <strong>اطلاعات BUNDL:</strong>
                        <pre style={{ fontSize: '12px', marginTop: '10px' }}>
                          {JSON.stringify(config.bundle, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </BOX_actiomContent>
            </div>

            <BOX_assistant>
              {/* محتوای دستیار */}
            </BOX_assistant>
          </BOX_actionn>
        </div>
      </div>
    );
  }
}

// هوک برای استفاده آسان از PanelMan
export function usePanelMan() {
  const { envi } = initDyna();
  const panelmanRef = React.useRef(new PanelMan());

  React.useEffect(() => {
    if (envi) {
      panelmanRef.current.setContext(envi);
    }
  }, [envi]);

  return panelmanRef.current;
}

export const panelman = new PanelMan();