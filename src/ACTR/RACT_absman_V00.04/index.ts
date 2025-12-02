// managers/absMan.ts
import { DynaMan } from "../RACT_dynaMan_V00.04";

const getEnvVariable = (key: string, fallback: string = ''): string => {
  if (typeof process !== 'undefined' && process.env) {
    return (process.env as any)[key] || fallback;
  }
  return fallback;
};
interface WidgetData {
  id: string;
  name: string;
  type: string;
  version: string;
  status: 'active' | 'inactive' | 'draft';
  description: string;
  author: string;
  lastModified: string;
  tags: string[];
  meta?: {
    model_id?: string;
    model_title?: string;
    model_version?: string;
    model_lastUpgrade?: string;
    model_owner?: string;
    model_type?: string;
    origin_model?: string;
    origin_model_Ver?: string;
    model_rem?: string;
  };
  geo?: {
    width?: string;
    height?: string;
    position?: { x: string; y: string };
    padding?: string;
    margin?: string;
    rotation?: string;
  };
  logic?: {
    [key: string]: {
      value: boolean | string | number;
      type: 'boolean' | 'string' | 'number';
      description: string;
    };
  };
  // اصلاح این قسمت - handler را optional کنید
  events?: Array<{
    id: string;
    event: string;
    handler?: string;  // از ? استفاده کنید
    description: string;
    timestamp?: string;
  }>;
  methods?: Array<{
    id: string;
    name: string;
    type: 'function' | 'getter' | 'setter' | 'async' | 'static';
    description: string;
    enabled: boolean;
  }>;
  style?: {
    [key: string]: string;
  };
  buttonConfig?: {
    geometric?: {
      width?: string;
      height?: string;
    };
    logic?: {
      content?: any;
      icon?: string;
      iconPosition?: 'left' | 'right';
    };
  };
  // برای پیگیری وضعیت
  isSelected?: boolean;
  isEditing?: boolean;
}

class AbsMan {
  // مقدار اولیه امن پروفایل
  private initialProfile = {
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      displayName: "",
      isEmailVerified: false,
      createdAt: new Date().toISOString(),
    },
    preferences: {
      theme: "system",
      notifications: true,
      emailNotifications: true,
      newsletter: true
    },
    social: {}
  };

  private initialHyb = {
    auth: {
      token: "",
      tokenExpiry: new Date().toISOString(),
      loginMethod: ""
    },
    appState: {
      lastLogin: new Date().toISOString(),
      sessionStart: new Date().toISOString(),
      loginCount: 0,
      isVerified: false
    },
    settings: {
      ui: { sidebarCollapsed: false, compactMode: false, fontSize: "medium" },
      privacy: { profileVisible: true, emailVisible: false, activityPublic: true }
    },
    temporary: { draftPosts: [], recentSearches: [], formData: {} }
  };

  // مقدار اولیه برای ویجت‌ها
  private initialWidget = {
    widgets: [] as WidgetData[],
    selectedWidgetId: null as string | null,
    filters: {
      searchTerm: "",
      type: "all",
      status: "all"
    },
    stats: {
      total: 0,
      active: 0,
      inactive: 0,
      draft: 0
    },
    lastUpdated: new Date().toISOString()
  };

  constructor() {
    // مقدار اولیه امن رو روی DynaMan ست می‌کنیم
    DynaMan.set("ENVI_profile", this.initialProfile);
    DynaMan.set("ENVI_HYB", this.initialHyb);
    DynaMan.set("ENVI_widget", this.initialWidget);

    DynaMan.set("environment.API_URL", getEnvVariable('REACT_APP_API_URL', 'http://localhost:3000/api'));
    DynaMan.set("environment.APP_NAME", getEnvVariable('REACT_APP_APP_NAME', 'My App'));
    DynaMan.set("environment.ENVIRONMENT", getEnvVariable('REACT_APP_ENVIRONMENT', 'development'));

    console.log("✅ AbsMan initialized with DynaMan");
  }

  // === متدهای مدیریت ویجت‌ها ===

  // اضافه کردن ویجت جدید
  addWidget(widgetData: Omit<WidgetData, 'id' | 'lastModified'>): string {
    const id = `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const widget: WidgetData = {
      id,
      ...widgetData,
      lastModified: new Date().toISOString()
    };

    const currentWidgets = this.getWidgets();
    const updatedWidgets = [widget, ...currentWidgets];

    this.updateWidgets(updatedWidgets);

    console.log(`✅ Widget added: ${widget.name} (${id})`);
    return id;
  }

  // به‌روزرسانی ویجت - اصلاح شده
  updateWidget(widgetId: string, updates: Partial<WidgetData>): boolean {
    const widgets = this.getWidgets();
    const index = widgets.findIndex(w => w.id === widgetId);

    if (index === -1) {
      console.warn(`⚠️ Widget not found: ${widgetId}`);
      return false;
    }

    // ایجاد یک کپی جدید از آرایه به جای تغییر مستقیم
    const updatedWidgets = [...widgets];
    updatedWidgets[index] = {
      ...updatedWidgets[index],
      ...updates,
      lastModified: new Date().toISOString()
    };

    this.updateWidgets(updatedWidgets);

    console.log(`✅ Widget updated: ${widgetId}`);
    return true;
  }

  // حذف ویجت
  deleteWidget(widgetId: string): boolean {
    const widgets = this.getWidgets();
    const widgetToDelete = widgets.find(w => w.id === widgetId);

    if (!widgetToDelete) {
      console.warn(`⚠️ Widget not found: ${widgetId}`);
      return false;
    }

    const updatedWidgets = widgets.filter(w => w.id !== widgetId);
    this.updateWidgets(updatedWidgets);

    console.log(`✅ Widget deleted: ${widgetToDelete.name} (${widgetId})`);
    return true;
  }

  // دریافت همه ویجت‌ها - اصلاح شده
  getWidgets(): WidgetData[] {
    const widgetEnv = DynaMan.get("ENVI_widget");
    // برگرداندن یک کپی از آرایه برای جلوگیری از تغییر مستقیم
    return widgetEnv?.widgets ? [...widgetEnv.widgets] : [];
  }

  // دریافت ویجت بر اساس ID
  getWidgetById(widgetId: string): WidgetData | null {
    const widgets = this.getWidgets();
    const widget = widgets.find(w => w.id === widgetId);
    return widget ? { ...widget } : null; // برگرداندن کپی
  }

  // در absMan.ts - متد getSelectedWidget را اصلاح کنید:
  getSelectedWidget(): WidgetData | null {
    const widgetEnv = DynaMan.get("ENVI_widget");
    console.log("🔍 getSelectedWidget - widgetEnv:", widgetEnv);

    if (!widgetEnv || !widgetEnv.selectedWidgetId) {
      console.log("🔍 No selected widget ID");
      return null;
    }

    const selectedId = widgetEnv.selectedWidgetId;
    console.log("🔍 Selected ID:", selectedId);

    const widgets = widgetEnv.widgets || [];
    console.log(`🔍 Searching in ${widgets.length} widgets`);

    const widget = widgets.find((w: any) => w.id === selectedId);

    if (widget) {
      console.log("✅ Found selected widget:", widget.name);
      return { ...widget };
    } else {
      console.warn("❌ Selected widget not found in widgets array");
      console.log("Available IDs:", widgets.map((w: any) => w.id));
      return null;
    }
  }
  selectWidget(widgetId: string | null): void {
    console.log(`🔵 selectWidget called with ID: ${widgetId}`);

    // ابتدا مطمئن شویم ویجت وجود دارد
    if (widgetId) {
      const widget = this.getWidgetById(widgetId);
      if (!widget) {
        console.error(`❌ Widget with ID ${widgetId} not found!`);
        return;
      }
      console.log(`✅ Found widget: ${widget.name}`);
    }

    // گرفتن state فعلی
    const currentWidgetEnv = DynaMan.get("ENVI_widget") || this.initialWidget;
    console.log("Current selectedWidgetId:", currentWidgetEnv.selectedWidgetId);

    // استفاده از merge برای آپدیت
    DynaMan.merge("ENVI_widget", {
      selectedWidgetId: widgetId,
      lastUpdated: new Date().toISOString()
    });

    // تأیید
    const updatedWidgetEnv = DynaMan.get("ENVI_widget");
    console.log("Updated selectedWidgetId:", updatedWidgetEnv?.selectedWidgetId);

    console.log(`✅ Widget ${widgetId || 'null'} selected`);
  }

  // فیلتر ویجت‌ها
  setWidgetFilters(filters: { searchTerm?: string; type?: string; status?: string }): void {
    const currentFilters = this.getWidgetFilters();
    const newFilters = { ...currentFilters, ...filters };

    DynaMan.merge("ENVI_widget.filters", newFilters);
  }

  // دریافت فیلترها
  getWidgetFilters() {
    const widgetEnv = DynaMan.get("ENVI_widget");
    return widgetEnv?.filters || this.initialWidget.filters;
  }

  // به‌روزرسانی آمار
  private updateStats(widgets: WidgetData[]): void {
    const stats = {
      total: widgets.length,
      active: widgets.filter(w => w.status === 'active').length,
      inactive: widgets.filter(w => w.status === 'inactive').length,
      draft: widgets.filter(w => w.status === 'draft').length
    };

    DynaMan.merge("ENVI_widget.stats", stats);
  }

  // به‌روزرسانی کل ویجت‌ها (همراه با آمار) - اصلاح شده
  private updateWidgets(widgets: WidgetData[]): void {
    // ایجاد کپی عمیق از ویجت‌ها
    const widgetsCopy = widgets.map(widget => ({
      ...widget,
      tags: [...(widget.tags || [])],
      events: widget.events ? [...widget.events] : undefined,
      methods: widget.methods ? [...widget.methods] : undefined,
      meta: widget.meta ? { ...widget.meta } : undefined,
      geo: widget.geo ? { ...widget.geo } : undefined,
      logic: widget.logic ? { ...widget.logic } : undefined,
      style: widget.style ? { ...widget.style } : undefined,
      buttonConfig: widget.buttonConfig ? { ...widget.buttonConfig } : undefined
    }));

    DynaMan.merge("ENVI_widget", {
      widgets: widgetsCopy,
      lastUpdated: new Date().toISOString()
    });

    this.updateStats(widgetsCopy);
  }

  // دریافت ویجت‌های فیلتر شده
  getFilteredWidgets(): WidgetData[] {
    const widgets = this.getWidgets();
    const filters = this.getWidgetFilters();

    return widgets.filter(widget => {
      const matchesSearch = !filters.searchTerm ||
        widget.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        widget.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        widget.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      const matchesType = filters.type === "all" || widget.type === filters.type;
      const matchesStatus = filters.status === "all" || widget.status === filters.status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }

  logWidgetEvent(widgetId: string, eventData: { event: string; handler?: string; description: string }): void {
    const widget = this.getWidgetById(widgetId);

    if (!widget) {
      console.warn(`⚠️ Widget not found for event: ${widgetId}`);
      return;
    }

    const newEvent = {
      id: `event_${Date.now()}`,
      ...eventData,
      handler: eventData.handler || "default", // مقدار پیش‌فرض بدهید
      timestamp: new Date().toISOString()
    };

    const currentEvents = widget.events || [];
    const updatedEvents = [newEvent, ...currentEvents.slice(0, 9)];
    this.updateWidget(widgetId, { events: updatedEvents });
  }
  // در absMan.ts - متد updateWidgetProps را اصلاح کنید:
  updateWidgetProps(widgetId: string, props: {
    meta?: any;
    geo?: any;
    logic?: any;
    style?: any;
    events?: any;
    methods?: any;
    buttonConfig?: any;
  }): boolean {
    console.log("🔄 updateWidgetProps called for:", widgetId);
    console.log("Props to update:", props);

    // ویجت فعلی را بگیر
    const widget = this.getWidgetById(widgetId);
    if (!widget) {
      console.error("❌ Widget not found:", widgetId);
      return false;
    }

    // ایجاد آپدیت‌ها
    const updates: Partial<WidgetData> = {};

    if (props.meta) {
      updates.meta = { ...widget.meta, ...props.meta };
    }

    if (props.geo) {
      updates.geo = { ...widget.geo, ...props.geo };
    }

    if (props.logic) {
      updates.logic = { ...widget.logic, ...props.logic };
    }

    if (props.style) {
      updates.style = props.style; // کاملاً جایگزین کن
    }
    if (props.events !== undefined) {
      updates.events = props.events;
    }

    if (props.methods !== undefined) {
      updates.methods = props.methods;
    }
    if (props.buttonConfig) {
      updates.buttonConfig = { ...widget.buttonConfig, ...props.buttonConfig };
    }

    console.log("🔄 Updates to apply:", updates);

    // استفاده از updateWidget
    const success = this.updateWidget(widgetId, updates);

    if (success) {
      console.log("✅ Widget props updated successfully");
      // تأیید تغییرات
      const updatedWidget = this.getWidgetById(widgetId);
      console.log("✅ Updated widget style:", updatedWidget?.style);
    } else {
      console.error("❌ Failed to update widget props");
    }

    return success;
  }

  // دریافت آمار ویجت‌ها
  getWidgetStats() {
    const widgetEnv = DynaMan.get("ENVI_widget");
    return widgetEnv?.stats || this.initialWidget.stats;
  }

  // === متدهای اصلی (موجود) ===

  saveUserData(userData: any, token: string): void {
    const userProfile = {
      ...userData,
      displayName: `${userData.firstName} ${userData.lastName}`
    };

    const authData = {
      token,
      tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      loginMethod: "email"
    };

    DynaMan.merge("ENVI_profile", { user: userProfile });
    DynaMan.merge("ENVI_HYB", { auth: authData });

    console.log("✅ User data saved via AbsMan");
  }

  updateUserProfile(updates: any) {
    DynaMan.merge("ENVI_profile.user", updates);
  }

  updateSettings(updates: any) {
    DynaMan.merge("ENVI_HYB.settings", updates);
  }

  getProfileEnv() { return DynaMan.get("ENVI_profile"); }
  getHybEnv() { return DynaMan.get("ENVI_HYB"); }
  getWidgetEnv() { return DynaMan.get("ENVI_widget"); }

  clearUserData() {
    DynaMan.merge("ENVI_profile", this.initialProfile);
    DynaMan.merge("ENVI_HYB", this.initialHyb);
    window.dispatchEvent(new Event("userLoggedOut"));
  }

  // ریست ویجت‌ها
  clearWidgets() {
    DynaMan.merge("ENVI_widget", this.initialWidget);
    console.log("✅ Widgets cleared");
  }

  // Subscription به تغییرات ویجت‌ها
  subscribeToWidgets(callback: (widgets: WidgetData[]) => void): () => void {
    return DynaMan.subscribe((state: any) => {
      const widgets = state?.ENVI_widget?.widgets || [];
      callback([...widgets]); // ارسال کپی
    }, "ENVI_widget.widgets");
  }

  subscribeToSelectedWidget(callback: (widget: WidgetData | null) => void): () => void {
    console.log("📡 Setting up selected widget subscription");

    // حالت 1: گوش دادن به کل ENVI_widget
    return DynaMan.subscribe((fullState: any) => {
      console.log("📡 Full subscription triggered");
      console.log("📡 Full state structure:", Object.keys(fullState || {}));

      // ابتدا مطمئن شویم ENVI_widget وجود دارد
      if (!fullState || !fullState.ENVI_widget) {
        console.log("📡 No ENVI_widget in state");
        callback(null);
        return;
      }

      const widgetEnv = fullState.ENVI_widget;
      console.log("📡 Widget env:", {
        selectedWidgetId: widgetEnv.selectedWidgetId,
        widgetsCount: widgetEnv.widgets?.length || 0
      });

      const selectedId = widgetEnv.selectedWidgetId;

      if (!selectedId) {
        console.log("📡 No selected widget ID");
        callback(null);
        return;
      }

      const widgets = widgetEnv.widgets || [];
      console.log(`📡 Searching for ID ${selectedId} in ${widgets.length} widgets`);

      const widget = widgets.find((w: WidgetData) => w.id === selectedId);

      if (widget) {
        console.log("✅ Subscription: Widget found:", widget.name);
        callback({ ...widget }); // ارسال کپی
      } else {
        console.warn("❌ Subscription: Widget not found with ID:", selectedId);
        console.log("Available IDs:", widgets.map((w: WidgetData) => w.id));
        callback(null);
      }
    }); // بدون path - به کل state گوش می‌دهیم
  }
}

export const absMan = new AbsMan();

// Export کردن تایپ‌ها برای استفاده در جاهای دیگر
export type { WidgetData };
