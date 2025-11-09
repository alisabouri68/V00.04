// PLAY/MockInjector.tsx
import { useEffect, useRef } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

const MockInjector = () => {
  const dynaRef = useRef<any>(null);

  if (!dynaRef.current) {
    dynaRef.current = initDyna();
  }

  const { reconfigDyna } = dynaRef.current;
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;

    const timer = setTimeout(() => {
      injected.current = true;

      const testData = {
        ENVI_HYB: {
          token: "fake_token_ABC123456",
          environment: "development",
          appVersion: "1.0.0-mock",
        },
        ENVI_Profile: {
          username: "mock_user",
          displayName: "کاربر آزمایشی",

          role: "admin",
          email: "mock_user@example.com",
          lastLogin: new Date().toISOString(),

        },
        ENVI_CANV: {
          boxheader: {
            title: "سامانه مدیریت",
            version: "1.0.0"
          },
          consoleSwitcher: {
            consoles: ["Home", "Admin", "Settings"]
          },
          theme: {
            current: "Popcorn",
            options: ["Popcorn", "Nightwish", "System Default"]
          },
          language: {
            current: "Persian",
            options: ["English", "Persian"]
          },
          profile: {
            username: "mock_user",
            displayName: "کاربر آزمایشی"
          }
        },
        // BODY با ساختار درست برای اسلات‌ها
        BODY: {
          "home": {
            "general": {
              "name": "HOME",
              "path": "/",
              "id": "home",
              "layout": "desktop"
            },
            "boxes": {
              "header": {
                "enabled": true,
                "type": "header",
                // کامپوننت boxheader باید اول باشه، بقیه به عنوان اسلات می‌روند
                "components": ["boxheader", "consoleSwitcher", "theme", "language", "profile"]
              },
              "navigation": {
                "enabled": true,
                "type": "navigation",
                "components": ["navigator1"]
              }
            }
          }
        }
      };

      console.log("🎯 Injecting data with header slots...");
      reconfigDyna(testData);

    }, 500);

    return () => clearTimeout(timer);
  }, [reconfigDyna]);

  return null;
};

export default MockInjector;