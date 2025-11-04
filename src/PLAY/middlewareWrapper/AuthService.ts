// routes/layers/auth/AuthService.ts
import { User, AuthCredentials, AuthResponse } from 'TYPE/index';

export class AuthService {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly USER_KEY = 'user_data';
  private static readonly TOKEN_EXPIRY_KEY = 'token_expiry';

  static async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      // شبیه‌سازی درخواست به API
      const response = await this.mockAuthAPI(credentials);
      
      // ذخیره در localStorage
      this.setTokens(response);
      this.setUser(response.user);
      
      return response;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    const userData = localStorage.getItem(this.USER_KEY);

    if (!token || !userData) {
      return null;
    }

    try {
      const user: User = JSON.parse(userData);
      
      // بررسی انقضای توکن
      if (this.isTokenExpired()) {
        await this.refreshToken();
        return this.getCurrentUser(); // فراخوانی مجدد پس از refresh
      }

      return user;
    } catch {
      this.logout();
      return null;
    }
  }

  static async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const newToken = await this.mockRefreshToken(refreshToken);
      localStorage.setItem(this.TOKEN_KEY, newToken);
      this.updateTokenExpiry();
      
      return newToken;
    } catch {
      this.logout();
      throw new Error('Failed to refresh token');
    }
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  static hasPermission(permission: string): boolean {
    const user = this.getCurrentUserSync();
    return user?.permissions.includes(permission) || false;
  }

  static hasRole(role: string): boolean {
    const user = this.getCurrentUserSync();
    return user?.role === role;
  }

  // ==================== Private Methods ====================
  private static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private static getCurrentUserSync(): User | null {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  private static isTokenExpired(): boolean {
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiry) return true;
    
    return Date.now() > parseInt(expiry);
  }

  private static setTokens(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    this.updateTokenExpiry(response.expiresIn);
  }

  private static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private static updateTokenExpiry(expiresIn: number = 24 * 60 * 60 * 1000): void {
    const expiryTime = Date.now() + expiresIn;
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  private static async mockAuthAPI(credentials: AuthCredentials): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const users: Record<string, User> = {
      'admin': {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'admin'],
        isAuthenticated: true,
        lastLogin: new Date()
      },
      'userA': {
        id: '2',
        username: 'userA',
        email: 'usera@example.com',
        role: 'userA',
        permissions: ['read', 'write'],
        isAuthenticated: true,
        lastLogin: new Date()
      },
      'userB': {
        id: '3',
        username: 'userB',
        email: 'userb@example.com',
        role: 'userB',
        permissions: ['read', 'write', 'delete'],
        isAuthenticated: true,
        lastLogin: new Date()
      }
    };

    const user = users[credentials.username];
    
    if (!user || credentials.password !== 'password') {
      throw new Error('INVALID_CREDENTIALS');
    }

    return {
      user,
      token: this.generateToken(user),
      refreshToken: this.generateRefreshToken(user),
      expiresIn: 24 * 60 * 60 * 1000 // 24 ساعت
    };
  }

  private static async mockRefreshToken(refreshToken: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));
   console.log(refreshToken) 
    // در واقعیت باید refreshToken را validate کنید
    return this.generateToken({ username: 'refreshed', role: 'user' } as User);
  }

  private static generateToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      username: user.username,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    }));
    
    return `${header}.${payload}.mock_signature`;
  }

  private static generateRefreshToken(user: User): string {
    return `refresh_${user.id}_${Date.now()}`;
  }

  private static getErrorMessage(error: any): string {
    const messages: Record<string, string> = {
      'INVALID_CREDENTIALS': 'نام کاربری یا رمز عبور اشتباه است',
      'NETWORK_ERROR': 'خطا در ارتباط با سرور',
      'SERVER_ERROR': 'خطای داخلی سرور'
    };
    
    return messages[error.message] || 'خطای ناشناخته رخ داده است';
  }
}