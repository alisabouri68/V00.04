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
  events?: Array<{
    id: string;
    event: string;
    handler?: string;
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
  isSelected?: boolean;
  isEditing?: boolean;
}

class AbsMan {
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

  private dbName: string = 'WidgetDB';
  private dbVersion: number = 1;
  private db: IDBDatabase | null = null;
  private dbInitialized: boolean = false;

  constructor() {
    DynaMan.set("ENVI_profile", this.initialProfile);
    DynaMan.set("ENVI_HYB", this.initialHyb);
    DynaMan.set("ENVI_widget", this.initialWidget);

    DynaMan.set("environment.API_URL", getEnvVariable('REACT_APP_API_URL', 'http://localhost:3000/api'));
    DynaMan.set("environment.APP_NAME", getEnvVariable('REACT_APP_APP_NAME', 'My App'));
    DynaMan.set("environment.ENVIRONMENT", getEnvVariable('REACT_APP_ENVIRONMENT', 'development'));

    // Initialize IndexedDB
    this.initIndexedDB().then(() => {
      console.log("✅ AbsMan initialized with IndexedDB");
      this.loadWidgetsFromIndexedDB();
    }).catch(error => {
      console.error("❌ Failed to initialize IndexedDB:", error);
      this.dbInitialized = false;
    });
  }

  // === IndexedDB Methods ===
  private async initIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        reject(new Error('IndexedDB is not supported in this browser'));
        return;
      }

      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error('❌ IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.dbInitialized = true;
        console.log('✅ IndexedDB initialized');
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('widgets')) {
          const widgetStore = db.createObjectStore('widgets', { keyPath: 'id' });
          widgetStore.createIndex('name', 'name', { unique: false });
          widgetStore.createIndex('type', 'type', { unique: false });
          widgetStore.createIndex('status', 'status', { unique: false });
          widgetStore.createIndex('lastModified', 'lastModified', { unique: false });
        }

        if (!db.objectStoreNames.contains('widget_settings')) {
          db.createObjectStore('widget_settings', { keyPath: 'key' });
        }
      };
    });
  }

  private async saveToIndexedDB(widget: WidgetData): Promise<void> {
    if (!this.dbInitialized || !this.db) {
      console.warn('⚠️ IndexedDB not initialized, skipping save');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['widgets'], 'readwrite');
      const store = transaction.objectStore('widgets');
      const request = store.put(widget);

      request.onsuccess = () => {
        console.log('✅ Widget saved to IndexedDB:', widget.id);
        resolve();
      };

      request.onerror = () => {
        console.error('❌ Error saving to IndexedDB:', request.error);
        reject(request.error);
      };
    });
  }

  private async loadWidgetsFromIndexedDB(): Promise<void> {
    if (!this.dbInitialized || !this.db) {
      console.warn('⚠️ IndexedDB not initialized, using local state only');
      return;
    }

    try {
      const widgets = await this.getAllWidgetsFromIndexedDB();
      DynaMan.merge("ENVI_widget", {
        widgets: widgets,
        stats: this.calculateStats(widgets)
      });
      console.log('✅ Widgets loaded from IndexedDB:', widgets.length);
    } catch (error) {
      console.error('❌ Error loading widgets from IndexedDB:', error);
    }
  }

  private async getAllWidgetsFromIndexedDB(): Promise<WidgetData[]> {
    if (!this.dbInitialized || !this.db) {
      return [];
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['widgets'], 'readonly');
      const store = transaction.objectStore('widgets');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('❌ Error getting widgets from IndexedDB:', request.error);
        reject(request.error);
      };
    });
  }

  private async deleteFromIndexedDB(widgetId: string): Promise<void> {
    if (!this.dbInitialized || !this.db) {
      console.warn('⚠️ IndexedDB not initialized, skipping delete');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['widgets'], 'readwrite');
      const store = transaction.objectStore('widgets');
      const request = store.delete(widgetId);

      request.onsuccess = () => {
        console.log('✅ Widget deleted from IndexedDB:', widgetId);
        resolve();
      };

      request.onerror = () => {
        console.error('❌ Error deleting from IndexedDB:', request.error);
        reject(request.error);
      };
    });
  }

  private async saveAllWidgetsToIndexedDB(widgets: WidgetData[]): Promise<void> {
    if (!this.dbInitialized || !this.db) {
      console.warn('⚠️ IndexedDB not initialized, skipping save all');
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['widgets'], 'readwrite');
      const store = transaction.objectStore('widgets');

      // Clear existing data
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        // Add all widgets
        let completed = 0;
        const total = widgets.length;

        if (total === 0) {
          resolve();
          return;
        }

        const onComplete = () => {
          completed++;
          if (completed === total) {
            console.log(`✅ All ${total} widgets saved to IndexedDB`);
            resolve();
          }
        };

        widgets.forEach(widget => {
          const request = store.put(widget);
          request.onsuccess = onComplete;
          request.onerror = (event) => {
            console.error('❌ Error saving widget:', (event.target as IDBRequest).error);
            onComplete();
          };
        });
      };

      clearRequest.onerror = () => {
        reject(clearRequest.error);
      };
    });
  }

  // === Widget Management Methods ===
  addWidget(widgetData: Omit<WidgetData, 'id' | 'lastModified'>): string {
    const id = `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const widget: WidgetData = {
      id,
      ...widgetData,
      lastModified: new Date().toISOString()
    };

    const currentWidgets = this.getWidgets();
    const updatedWidgets = [widget, ...currentWidgets];

    // Save to IndexedDB
    this.saveToIndexedDB(widget).catch(error => {
      console.error('❌ Failed to save widget to IndexedDB:', error);
    });

    // Update DynaMan
    this.updateWidgetsInDynaMan(updatedWidgets);

    console.log(`✅ Widget added: ${widget.name} (${id})`);
    return id;
  }

  updateWidget(widgetId: string, updates: Partial<WidgetData>): boolean {
    const widgets = this.getWidgets();
    const index = widgets.findIndex(w => w.id === widgetId);

    if (index === -1) {
      console.warn(`⚠️ Widget not found: ${widgetId}`);
      return false;
    }

    const updatedWidget = {
      ...widgets[index],
      ...updates,
      lastModified: new Date().toISOString()
    };

    const updatedWidgets = [...widgets];
    updatedWidgets[index] = updatedWidget;

    // Save to IndexedDB
    this.saveToIndexedDB(updatedWidget).catch(error => {
      console.error('❌ Failed to update widget in IndexedDB:', error);
    });

    // Update DynaMan
    this.updateWidgetsInDynaMan(updatedWidgets);

    console.log(`✅ Widget updated: ${widgetId}`);
    return true;
  }

  deleteWidget(widgetId: string): boolean {
    const widgets = this.getWidgets();
    const widgetToDelete = widgets.find(w => w.id === widgetId);

    if (!widgetToDelete) {
      console.warn(`⚠️ Widget not found: ${widgetId}`);
      return false;
    }

    const updatedWidgets = widgets.filter(w => w.id !== widgetId);

    // Delete from IndexedDB
    this.deleteFromIndexedDB(widgetId).catch(error => {
      console.error('❌ Failed to delete widget from IndexedDB:', error);
    });

    // Update DynaMan
    this.updateWidgetsInDynaMan(updatedWidgets);

    console.log(`✅ Widget deleted: ${widgetToDelete.name} (${widgetId})`);
    return true;
  }

  getWidgets(): WidgetData[] {
    const widgetEnv = DynaMan.get("ENVI_widget");
    return widgetEnv?.widgets ? [...widgetEnv.widgets] : [];
  }

  getWidgetById(widgetId: string): WidgetData | null {
    const widgets = this.getWidgets();
    const widget = widgets.find(w => w.id === widgetId);
    return widget ? { ...widget } : null;
  }

  getSelectedWidget(): WidgetData | null {
    const widgetEnv = DynaMan.get("ENVI_widget");

    if (!widgetEnv || !widgetEnv.selectedWidgetId) {
      return null;
    }

    const selectedId = widgetEnv.selectedWidgetId;
    const widgets = widgetEnv.widgets || [];
    const widget = widgets.find((w: any) => w.id === selectedId);

    return widget ? { ...widget } : null;
  }

  selectWidget(widgetId: string | null): void {
    if (widgetId) {
      const widget = this.getWidgetById(widgetId);
      if (!widget) {
        console.error(`❌ Widget with ID ${widgetId} not found!`);
        return;
      }
    }

    // const currentWidgetEnv = DynaMan.get("ENVI_widget") || this.initialWidget;
    
    DynaMan.merge("ENVI_widget", {
      selectedWidgetId: widgetId,
      lastUpdated: new Date().toISOString()
    });

    console.log(`✅ Widget ${widgetId || 'null'} selected`);
  }

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
    
    const widget = this.getWidgetById(widgetId);
    if (!widget) {
      console.error("❌ Widget not found:", widgetId);
      return false;
    }

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
      updates.style = props.style;
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

    return this.updateWidget(widgetId, updates);
  }

  private updateWidgetsInDynaMan(widgets: WidgetData[]): void {
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
      lastUpdated: new Date().toISOString(),
      stats: this.calculateStats(widgetsCopy)
    });
  }

  private calculateStats(widgets: WidgetData[]): {
    total: number;
    active: number;
    inactive: number;
    draft: number;
  } {
    return {
      total: widgets.length,
      active: widgets.filter(w => w.status === 'active').length,
      inactive: widgets.filter(w => w.status === 'inactive').length,
      draft: widgets.filter(w => w.status === 'draft').length
    };
  }

  setWidgetFilters(filters: { searchTerm?: string; type?: string; status?: string }): void {
    const currentFilters = this.getWidgetFilters();
    const newFilters = { ...currentFilters, ...filters };
    DynaMan.merge("ENVI_widget.filters", newFilters);
  }

  getWidgetFilters() {
    const widgetEnv = DynaMan.get("ENVI_widget");
    return widgetEnv?.filters || this.initialWidget.filters;
  }

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

  getWidgetStats() {
    const widgetEnv = DynaMan.get("ENVI_widget");
    return widgetEnv?.stats || this.initialWidget.stats;
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
      handler: eventData.handler || "default",
      timestamp: new Date().toISOString()
    };

    const currentEvents = widget.events || [];
    const updatedEvents = [newEvent, ...currentEvents.slice(0, 9)];
    this.updateWidget(widgetId, { events: updatedEvents });
  }

  // === Sync Methods ===
  async syncWithIndexedDB(): Promise<void> {
    if (!this.dbInitialized) {
      console.warn('⚠️ IndexedDB not initialized, cannot sync');
      return;
    }

    try {
      const indexedDBWidgets = await this.getAllWidgetsFromIndexedDB();
      const currentWidgets = this.getWidgets();
      
      // If IndexedDB has data, use it
      if (indexedDBWidgets.length > 0) {
        this.updateWidgetsInDynaMan(indexedDBWidgets);
        console.log(`✅ Synced ${indexedDBWidgets.length} widgets from IndexedDB`);
      } 
      // If local state has data but IndexedDB doesn't, save to IndexedDB
      else if (currentWidgets.length > 0) {
        await this.saveAllWidgetsToIndexedDB(currentWidgets);
        console.log(`✅ Saved ${currentWidgets.length} widgets to IndexedDB`);
      }
    } catch (error) {
      console.error('❌ Error syncing with IndexedDB:', error);
    }
  }

  clearWidgets(): void {
    if (this.dbInitialized && this.db) {
      // Clear from IndexedDB
      const transaction = this.db.transaction(['widgets'], 'readwrite');
      const store = transaction.objectStore('widgets');
      store.clear();
    }

    // Clear from DynaMan
    DynaMan.merge("ENVI_widget", this.initialWidget);
    console.log("✅ Widgets cleared from both IndexedDB and local state");
  }

  // === Existing Methods ===
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

  subscribeToWidgets(callback: (widgets: WidgetData[]) => void): () => void {
    return DynaMan.subscribe((state: any) => {
      const widgets = state?.ENVI_widget?.widgets || [];
      callback([...widgets]);
    }, "ENVI_widget.widgets");
  }

  subscribeToSelectedWidget(callback: (widget: WidgetData | null) => void): () => void {
    return DynaMan.subscribe((fullState: any) => {
      if (!fullState || !fullState.ENVI_widget) {
        callback(null);
        return;
      }

      const widgetEnv = fullState.ENVI_widget;
      const selectedId = widgetEnv.selectedWidgetId;

      if (!selectedId) {
        callback(null);
        return;
      }

      const widgets = widgetEnv.widgets || [];
      const widget = widgets.find((w: WidgetData) => w.id === selectedId);

      if (widget) {
        callback({ ...widget });
      } else {
        callback(null);
      }
    });
  }
}

export const absMan = new AbsMan();
export type { WidgetData };