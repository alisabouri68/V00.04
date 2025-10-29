/************************************
 * Step 01: import dependencies
 ************************************/

/************************************
 * Step 02: Class Definition
 ************************************/
export class HybMan {
  private config: AuthenticationConfig;
  private state: AuthenticationState;
  private refreshTimeout: number | null = null; // تغییر از NodeJS.Timeout به number
  private activityListeners: Array<() => void> = [];
  private events: { [key: string]: Array<(data?: any) => void> } = {};

  constructor(config: Partial<AuthenticationConfig> = {}) {
    this.config = this.initializeConfig(config);
    this.state = this.initializeState();
    this.setupEventListeners();
    this.restoreSession();
  }

  // ==========================================================================
  // INITIALIZATION METHODS
  // ==========================================================================

  private initializeConfig(userConfig: Partial<AuthenticationConfig>): AuthenticationConfig {
    const defaultConfig: AuthenticationConfig = {
      appName: 'HybridApp',
      version: '1.0.0',
      environment: 'development',
      
      tokenRefreshThreshold: 300, // 5 minutes
      maxTokenRefreshAttempts: 3,
      tokenStorageKey: 'hybman_auth_data',
      
      enableTwoFactor: false,
      enableBiometric: false,
      sessionTimeout: 30, // 30 minutes
      maxLoginAttempts: 5,
      
      authEndpoints: {
        login: '/api/auth/login',
        logout: '/api/auth/logout',
        refresh: '/api/auth/refresh',
        verify: '/api/auth/verify',
        profile: '/api/auth/profile',
        twoFactor: '/api/auth/2fa'
      },
      
      debugMode: false,
      logLevel: 'error'
    };

    return { ...defaultConfig, ...userConfig };
  }

  private initializeState(): AuthenticationState {
    return {
      isAuthenticated: false,
      isVerifying: false,
      isRefreshing: false,
      user: null,
      token: null,
      refreshToken: null,
      tokenExpiry: null,
      loginAttempts: 0,
      lastActivity: Date.now(),
      twoFactorRequired: false,
      biometricEnabled: false
    };
  }

  private setupEventListeners(): void {
    if (typeof window !== 'undefined') {
      ['click', 'keypress', 'mousemove', 'scroll'].forEach(event => {
        window.addEventListener(event, this.updateActivity.bind(this), { passive: true });
      });
    }
  }

  // ==========================================================================
  // CORE AUTHENTICATION METHODS
  // ==========================================================================

  public async authenticate(credentials: { 
    username: string; 
    password: string; 
    rememberMe?: boolean;
  }): Promise<boolean> {
    try {
      this.log('info', 'Starting authentication process', { username: credentials.username });

      if (this.state.loginAttempts >= this.config.maxLoginAttempts) {
        this.emit('authFailed', { reason: 'MAX_ATTEMPTS_EXCEEDED' });
        throw new Error('تعداد تلاش‌های ورود بیش از حد مجاز است');
      }

      this.setState({ isVerifying: true });

      const authResult = await this.mockAuthRequest(credentials);

      if (authResult.success) {
        await this.handleSuccessfulAuth(authResult, credentials.rememberMe || false);
        return true;
      } else {
        this.handleFailedAuth();
        return false;
      }

    } catch (error) {
      this.log('error', 'Authentication failed', { error, credentials: { username: credentials.username } });
      this.setState({ isVerifying: false });
      this.emit('authError', { error });
      return false;
    }
  }

  private async handleSuccessfulAuth(authResult: any, rememberMe: boolean): Promise<void> {
    const { token, refreshToken, user, requires2FA } = authResult;

    if (requires2FA && this.config.enableTwoFactor) {
      this.setState({ 
        twoFactorRequired: true,
        isVerifying: false 
      });
      this.emit('twoFactorRequired', { user });
      return;
    }

    this.setState({
      isAuthenticated: true,
      isVerifying: false,
      user: user,
      token: token,
      refreshToken: refreshToken,
      tokenExpiry: this.calculateTokenExpiry(token),
      loginAttempts: 0,
      twoFactorRequired: false
    });

    await this.persistAuthData(rememberMe);
    this.scheduleTokenRefresh();
    
    this.log('info', 'Authentication successful', { userId: user.id, username: user.username });
    this.emit('authSuccess', { user });
  }

  private handleFailedAuth(): void {
    this.setState({ 
      isVerifying: false,
      loginAttempts: this.state.loginAttempts + 1 
    });

    this.emit('authFailed', { 
      reason: 'INVALID_CREDENTIALS',
      remainingAttempts: this.config.maxLoginAttempts - this.state.loginAttempts 
    });
  }

  public async logout(): Promise<void> {
    try {
      this.log('info', 'Logging out user', { userId: this.state.user?.id });

      if (this.state.token) {
        await this.mockLogoutRequest();
      }

      this.clearAuthState();
      this.clearStorage();
      this.clearRefreshTimeout();

      this.emit('logout', { manual: true });
      
    } catch (error) {
      this.log('error', 'Logout error', { error });
      this.clearAuthState();
      this.clearStorage();
    }
  }

  public async refreshToken(): Promise<boolean> {
    if (!this.state.refreshToken || this.state.isRefreshing) {
      return false;
    }

    try {
      this.setState({ isRefreshing: true });
      this.log('debug', 'Refreshing access token');

      const newTokens = await this.mockRefreshToken(this.state.refreshToken);

      this.setState({
        token: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
        tokenExpiry: this.calculateTokenExpiry(newTokens.accessToken),
        isRefreshing: false
      });

      await this.persistAuthData(true);
      this.scheduleTokenRefresh();

      this.emit('tokenRefreshed');
      this.log('info', 'Token refreshed successfully');
      
      return true;

    } catch (error) {
      this.log('error', 'Token refresh failed', { error });
      this.setState({ isRefreshing: false });
      
      await this.logout();
      this.emit('sessionExpired');
      
      return false;
    }
  }

  // ==========================================================================
  // TOKEN MANAGEMENT
  // ==========================================================================

  public async validateToken(): Promise<boolean> {
    if (!this.state.token) {
      return false;
    }

    if (this.state.tokenExpiry && Date.now() >= this.state.tokenExpiry) {
      this.log('warn', 'Token expired');
      return false;
    }

    try {
      const isValid = await this.mockVerifyToken(this.state.token);
      return isValid;
    } catch (error) {
      this.log('error', 'Token validation failed', { error });
      return false;
    }
  }

  private scheduleTokenRefresh(): void {
    this.clearRefreshTimeout();

    if (!this.state.tokenExpiry) {
      return;
    }

    const refreshTime = this.state.tokenExpiry - (this.config.tokenRefreshThreshold * 1000);
    const timeUntilRefresh = refreshTime - Date.now();

    if (timeUntilRefresh > 0) {
      // استفاده از number به جای NodeJS.Timeout
      this.refreshTimeout = window.setTimeout(async () => {
        await this.refreshToken();
      }, timeUntilRefresh);

      this.log('debug', `Token refresh scheduled in ${Math.round(timeUntilRefresh / 1000)} seconds`);
    }
  }

  private calculateTokenExpiry(token: string): number {
    const tokenLifetime = 3600 * 1000; // 1 hour
    return Date.now() + tokenLifetime;
  }

  // ==========================================================================
  // SESSION MANAGEMENT
  // ==========================================================================

  private updateActivity(): void {
    this.setState({ lastActivity: Date.now() });
  }

  public checkSessionTimeout(): boolean {
    const sessionDuration = Date.now() - this.state.lastActivity;
    const timeoutMs = this.config.sessionTimeout * 60 * 1000;

    if (sessionDuration > timeoutMs) {
      this.log('warn', 'Session timeout detected');
      this.emit('sessionTimeout');
      this.logout();
      return true;
    }

    return false;
  }

  private async restoreSession(): Promise<void> {
    try {
      const storedData = this.getStoredAuthData();
      
      if (storedData && storedData.token) {
        this.setState({
          ...storedData,
          isAuthenticated: true
        });

        const isValid = await this.validateToken();
        
        if (isValid) {
          this.scheduleTokenRefresh();
          this.emit('sessionRestored', { user: storedData.user });
          this.log('info', 'Session restored successfully');
        } else {
          this.clearAuthState();
          this.clearStorage();
        }
      }
    } catch (error) {
      this.log('error', 'Session restoration failed', { error });
      this.clearAuthState();
      this.clearStorage();
    }
  }

  // ==========================================================================
  // STORAGE MANAGEMENT
  // ==========================================================================

  private async persistAuthData(rememberMe: boolean): Promise<void> {
    try {
      const storageData = {
        user: this.state.user,
        token: this.state.token,
        refreshToken: this.state.refreshToken,
        tokenExpiry: this.state.tokenExpiry,
        lastActivity: this.state.lastActivity
      };

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(this.config.tokenStorageKey, JSON.stringify(storageData));
      
    } catch (error) {
      this.log('error', 'Failed to persist auth data', { error });
    }
  }

  private getStoredAuthData(): Partial<AuthenticationState> | null {
    try {
      const localStorageData = localStorage.getItem(this.config.tokenStorageKey);
      const sessionStorageData = sessionStorage.getItem(this.config.tokenStorageKey);

      const storedData = localStorageData || sessionStorageData;
      
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      this.log('error', 'Failed to retrieve stored auth data', { error });
    }

    return null;
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem(this.config.tokenStorageKey);
      sessionStorage.removeItem(this.config.tokenStorageKey);
    } catch (error) {
      this.log('error', 'Failed to clear storage', { error });
    }
  }

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================

  private setState(updates: Partial<AuthenticationState>): void {
    const previousState = { ...this.state };
    this.state = { ...this.state, ...updates };
    
    this.emit('stateChanged', { 
      previous: previousState, 
      current: this.state,
      changes: updates 
    });
  }

  private clearAuthState(): void {
    this.state = this.initializeState();
  }

  private clearRefreshTimeout(): void {
    if (this.refreshTimeout !== null) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  // ==========================================================================
  // EVENT SYSTEM
  // ==========================================================================

  public on(event: string, callback: (data?: any) => void): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  public off(event: string, callback: (data?: any) => void): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data?: any): void {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          this.log('error', `Event handler error for ${event}`, { error, data });
        }
      });
    }
  }

  // ==========================================================================
  // UTILITY METHODS
  // ==========================================================================

  public isAuthenticated(): boolean {
    return this.state.isAuthenticated && !this.checkSessionTimeout();
  }

  public getToken(): string | null {
    return this.state.token;
  }

  public getUser(): UserProfile | null {
    return this.state.user;
  }

  public hasPermission(permission: string): boolean {
    return this.state.user?.permissions.includes(permission) || false;
  }

  public updateUserProfile(updates: Partial<UserProfile>): void {
    if (this.state.user) {
      this.setState({
        user: { ...this.state.user, ...updates }
      });
      this.persistAuthData(true);
      this.emit('profileUpdated', { user: this.state.user });
    }
  }

  // ==========================================================================
  // MOCK METHODS
  // ==========================================================================

  private async mockAuthRequest(credentials: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: credentials.username && credentials.password,
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      user: {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        role: 'user',
        permissions: ['user.read', 'user.write'],
        metadata: {
          firstName: 'John',
          lastName: 'Doe',
          lastLogin: new Date().toISOString(),
          loginCount: 1
        },
        preferences: {
          language: 'en',
          theme: 'light',
          notifications: true
        }
      },
      requires2FA: false
    };
  }

  private async mockLogoutRequest(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  private async mockRefreshToken(refreshToken: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      accessToken: 'refreshed-jwt-token-' + Date.now(),
      refreshToken: 'refreshed-refresh-token-' + Date.now()
    };
  }

  private async mockVerifyToken(token: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return true;
  }

  // ==========================================================================
  // LOGGING
  // ==========================================================================

  private log(level: 'error' | 'warn' | 'info' | 'debug', message: string, data?: any): void {
    if (!this.config.debugMode && level === 'debug') return;

    const timestamp = new Date().toISOString();
    const logMessage = `[HybMan] ${timestamp} ${level.toUpperCase()}: ${message}`;

    switch (level) {
      case 'error':
        console.error(logMessage, data);
        break;
      case 'warn':
        console.warn(logMessage, data);
        break;
      case 'info':
        console.info(logMessage, data);
        break;
      case 'debug':
        console.debug(logMessage, data);
        break;
    }
  }
}

// ==========================================================================
// INTERFACES (اضافه کردن اینترفیس‌ها در همین فایل)
// ==========================================================================

export interface AuthenticationConfig {
  appName: string;
  version: string;
  environment: 'development' | 'production' | 'staging';
  tokenRefreshThreshold: number;
  maxTokenRefreshAttempts: number;
  tokenStorageKey: string;
  enableTwoFactor: boolean;
  enableBiometric: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  authEndpoints: {
    login: string;
    logout: string;
    refresh: string;
    verify: string;
    profile: string;
    twoFactor: string;
  };
  debugMode: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
}

export interface UserProfile {
  id: string | number;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  metadata: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    lastLogin?: string;
    loginCount?: number;
  };
  preferences: {
    language: string;
    theme: string;
    notifications: boolean;
  };
}

export interface AuthenticationState {
  isAuthenticated: boolean;
  isVerifying: boolean;
  isRefreshing: boolean;
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  loginAttempts: number;
  lastActivity: number;
  twoFactorRequired: boolean;
  biometricEnabled: boolean;
}

// ==========================================================================
// DEFAULT EXPORT
// ==========================================================================

export const hybMan = new HybMan();

export default HybMan;