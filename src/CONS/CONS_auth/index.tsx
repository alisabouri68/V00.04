import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hybMan } from "ACTR/RACT_hybman_V00.04";
import { profileMan } from "ACTR/RACT_profileman_V00.04";
import { panelman } from "ACTR/RACT_panelman_V00.04";
import { defaultRouteManager } from "ROUTS/routeManager";
import Button from "COMP/RCMP_button_V00.04";

/**
 * @component AuthGateway
 * @description کامپوننت دروازه احراز هویت پیشرفته با استفاده از HybMan
 */
export default function AuthGateway() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(hybMan.isAuthenticated());
  const [profile, setProfile] = useState(hybMan.getUser());
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // تنظیم شنوندگان رویدادهای HybMan
    const handleAuthSuccess = (data: any) => {
      setIsLoggedIn(true);
      setProfile(data.user);
      setErrorMessage("");
      handlePostLoginRedirect();
    };

    const handleAuthFailed = (data: any) => {
      setErrorMessage(
        data.reason === 'MAX_ATTEMPTS_EXCEEDED' 
          ? 'تعداد تلاش‌های ورود بیش از حد مجاز است' 
          : 'نام کاربری یا رمز عبور نادرست است'
      );
    };

    const handleAuthError = (data: any) => {
      setErrorMessage("خطا در ارتباط با سرور. لطفاً مجدداً تلاش کنید.");
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
      setProfile(null);
      setUsername("");
      setPassword("");
    };

    const handleSessionExpired = () => {
      setIsLoggedIn(false);
      setProfile(null);
      setErrorMessage("Session شما منقضی شده است. لطفاً مجدداً وارد شوید.");
    };

    const handleTwoFactorRequired = (data: any) => {
      setErrorMessage("احراز هویت دو مرحله‌ای مورد نیاز است");
      // در اینجا می‌توانید کاربر را به صفحه 2FA هدایت کنید
      navigate('/2fa-verification');
    };

    // ثبت شنوندگان
    hybMan.on('authSuccess', handleAuthSuccess);
    hybMan.on('authFailed', handleAuthFailed);
    hybMan.on('authError', handleAuthError);
    hybMan.on('logout', handleLogout);
    hybMan.on('sessionExpired', handleSessionExpired);
    hybMan.on('twoFactorRequired', handleTwoFactorRequired);

    // بررسی وضعیت اولیه
    const authStatus = hybMan.isAuthenticated();
    setIsLoggedIn(authStatus);
    setProfile(hybMan.getUser());

    if (authStatus) {
      handlePostLoginRedirect();
    }

    // پاکسازی شنوندگان هنگام unmount
    return () => {
      hybMan.off('authSuccess', handleAuthSuccess);
      hybMan.off('authFailed', handleAuthFailed);
      hybMan.off('authError', handleAuthError);
      hybMan.off('logout', handleLogout);
      hybMan.off('sessionExpired', handleSessionExpired);
      hybMan.off('twoFactorRequired', handleTwoFactorRequired);
    };
  }, []);

  /**
   * @handler handleAuthentication
   * @description مدیریت فرآیند احراز هویت با استفاده از HybMan
   */
  const handleAuthentication = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("لطفاً نام کاربری و رمز عبور را وارد کنید");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // استفاده از سیستم احراز هویت HybMan
      const success = await hybMan.authenticate({
        username,
        password,
        rememberMe: true
      });

      if (success) {
        // پروفایل و پنل‌ها را به‌روزرسانی کنید
        const user = hybMan.getUser();
        if (user) {
          profileMan.setProfile({
            username: user.username,
            role: user.role,
            permissions: user.permissions
          });
          panelman.initByRole();
        }

        defaultRouteManager.addToHistory('auth-gateway');
      }

    } catch (error) {
      console.error("خطا در احراز هویت:", error);
      setErrorMessage("خطا در ورود به سیستم. لطفاً مجدداً تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @handler handlePostLoginRedirect
   * @description هدایت هوشمند کاربر پس از ورود موفق
   */
  const handlePostLoginRedirect = () => {
    const user = hybMan.getUser();
    const userPermissions = user?.permissions || [];
    const previousRoute = defaultRouteManager.getPreviousRoute();
    
    if (previousRoute && defaultRouteManager.canUserAccessRoute(previousRoute, userPermissions)) {
      navigateToRoute(previousRoute);
      return;
    }

    const accessibleRoutes = defaultRouteManager.getRoutesByPermission(userPermissions);
    const targetRoute = findBestRedirectRoute(accessibleRoutes, userPermissions);
    
    if (targetRoute) {
      navigate(targetRoute.path);
    } else {
      navigate("/");
    }
  };

  /**
   * @handler navigateToRoute
   * @description ناوبری به مسیر مشخص شده
   */
  const navigateToRoute = (routeName: string) => {
    const routeMap: { [key: string]: string } = {
      'dashboard-home': '/',
      'trending-content': '/hot',
      'cast-management': '/cast',
      'wiki-knowledge-base': '/wiki',
      'gasma-platform': '/gasma',
      'admin-panel': '/admin',
      'premium-content': '/premium'
    };
    
    const path = routeMap[routeName] || '/';
    navigate(path);
  };

  /**
   * @handler handleLogout
   * @description مدیریت خروج کاربر با استفاده از HybMan
   */
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await hybMan.logout();
      
      // پاکسازی local state
      profileMan.resetProfile();
      setUsername("");
      setPassword("");
      defaultRouteManager.addToHistory('logged-out');
      
    } catch (error) {
      console.error("خطا در خروج:", error);
      setErrorMessage("خطا در خروج از سیستم");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * @handler toggleAuthMode
   * @description تغییر حالت بین ورود و ثبت‌نام
   */
  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  /**
   * @function findBestRedirectRoute
   * @description یافتن بهترین مسیر برای هدایت کاربر
   */
  const findBestRedirectRoute = (routes: any[], permissions: string[]): any => {
    const priorityRoutes = ['dashboard-home', 'trending-content', 'cast-management'];
    
    for (const routeName of priorityRoutes) {
      const route = routes.find(r => r.name === routeName);
      if (route && defaultRouteManager.canUserAccessRoute(routeName, permissions)) {
        return route;
      }
    }
    
    return routes.length > 0 ? routes[0] : undefined;
  };

  /**
   * @function isDevelopment
   * @description بررسی محیط توسعه بدون استفاده از process
   */
  const isDevelopment = (): boolean => {
    // روش جایگزین برای تشخیص محیط توسعه
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('dev-') ||
           window.location.hostname.includes('local-');
  };

  // اگر کاربر وارد شده باشد، پنل مدیریت نمایش داده می‌شود
  if (isLoggedIn && profile) {
    return (
      <div className="w-96 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">خوش آمدید</h2>
          <p className="text-gray-600 mt-2">شما با موفقیت وارد شده‌اید</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="text-center text-green-800">
            <p className="font-semibold">ورود به عنوان:</p>
            <p className="text-lg font-bold mt-1">{profile.username}</p>
            <p className="text-sm mt-1">سطح دسترسی: {profile.role}</p>
            <p className="text-xs mt-2">
              آخرین ورود: {new Date(profile.metadata?.lastLogin || Date.now()).toLocaleString('fa-IR')}
            </p>
          </div>
        </div>

        {/* نمایش توکن (فقط در حالت توسعه) */}
        {isDevelopment() && hybMan.getToken() && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
            <p className="text-xs text-blue-700 text-center break-all">
              توکن: <code>{hybMan.getToken()?.substring(0, 20)}...</code>
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={() => navigate('/')}
            buttunTitle="رفتن به پیشخوان"
            variant="filled"
            fullWidth={true}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          />
          
          <Button
            onClick={handleLogout}
            buttunTitle={isLoading ? "در حال خروج..." : "خروج از حساب"}
            variant="outlined"
            fullWidth={true}
            className="border-red-500 text-red-600 hover:bg-red-50"
            disabled={isLoading}
          />
        </div>
      </div>
    );
  }

  // نمایش فرم ورود/ثبت‌نام
  return (
    <div className="w-96 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isLoginMode ? 'ورود به حساب' : 'ایجاد حساب جدید'}
        </h2>
        <p className="text-gray-600 mt-2">
          {isLoginMode ? 'لطفاً اطلاعات حساب خود را وارد کنید' : 'لطفاً اطلاعات مورد نیاز را تکمیل کنید'}
        </p>
      </div>

      {/* نمایش خطا */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <p className="text-red-700 text-sm text-center">{errorMessage}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* فیلد نام کاربری */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نام کاربری
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
            placeholder="نام کاربری خود را وارد کنید"
            disabled={isLoading}
            onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
          />
        </div>

        {/* فیلد رمز عبور */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رمز عبور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100"
            placeholder="رمز عبور خود را وارد کنید"
            disabled={isLoading}
            onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
          />
          {!isLoginMode && (
            <p className="text-xs text-gray-500 mt-1">رمز عبور باید حداقل ۶ کاراکتر باشد</p>
          )}
        </div>

        {/* دکمه اقدام اصلی */}
        <Button
          onClick={handleAuthentication}
          buttunTitle={isLoading ? "در حال پردازش..." : (isLoginMode ? "ورود به حساب" : "ایجاد حساب")}
          variant="filled"
          fullWidth={true}
          disabled={isLoading}
          className={`${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
        />

        {/* دکمه تغییر حالت */}
        <button
          onClick={toggleAuthMode}
          disabled={isLoading}
          className="w-full text-center text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors text-sm"
        >
          {isLoginMode ? 'حساب کاربری ندارید؟ ثبت‌نام کنید' : 'قبلاً حساب دارید؟ وارد شوید'}
        </button>

        {/* نکات امنیتی و تست */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mt-4">
          <p className="text-xs text-yellow-700 text-center">
            <strong>تست سیستم:</strong> از نام کاربری‌های زیر استفاده کنید:
            <br />
            <code className="text-xs bg-yellow-100 px-1 rounded">admin-user</code> (مدیر) - 
            <code className="text-xs bg-yellow-100 px-1 rounded mx-1">premium-user</code> (ویژه) - 
            <code className="text-xs bg-yellow-100 px-1 rounded">regular-user</code> (عادی)
            <br />
            <span className="text-yellow-600">رمز عبور: هر چیزی (حداقل ۶ کاراکتر)</span>
          </p>
        </div>

        {/* اطلاعات فنی برای توسعه‌دهندگان */}
        {isDevelopment() && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mt-2">
            <p className="text-xs text-gray-600 text-center">
              <strong>وضعیت سیستم:</strong> 
              <br />
              محیط: توسعه | 
              توکن: {hybMan.getToken() ? 'فعال' : 'غیرفعال'} | 
              وضعیت: {hybMan.isAuthenticated() ? 'وارد شده' : 'خارج شده'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}