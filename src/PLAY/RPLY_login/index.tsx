/******************************************
Play- Dynactrl Mock Injector (Full Role Aware)
Last Update:    2025.11.02
By:             APPS.68
******************************************/

import { useEffect, useRef } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

const MockInjector = () => {
  const { reconfigDyna } = initDyna();
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;

    const timer = setTimeout(() => {
      injected.current = true;

      // داده فیک برای محیط و کاربر
      const fakeData = {
        ENVI_HYB: {
          token: "fake_token_ABC123456",
          refreshToken: "refresh_token_DEF987654",
          expiresIn: 3600,
          environment: "development",
          appVersion: "1.0.0-mock",
        },
        ENVI_Profile: {
          username: "mock_user",
          displayName: "کاربر آزمایشی",
          role: "admin", // ← تغییر بده به "admin" برای تست
          email: "mock_user@example.com",
          lastLogin: new Date().toISOString(),
        },
      };

      // ساخت دستی ENVI_CONS
      const allConsoles = {
        home: {
          General: { name: "خانه", path: "/", id: "home" },
          bundle: { header: "BUNDLE_HEADER", navigation: "BUNDLE_NAV" },
        },
        hot: {
          General: { name: "داغ‌ها", path: "/hot", id: "hot" },
          bundle: { header: "BUNDLE_HEADER", navigation: "BUNDLE_NAV" },
        },
        cast: {
          General: { name: "کست", path: "/cast", id: "cast" },
          bundle: { header: "BUNDLE_HEADER", navigation: "BUNDLE_NAV" },
        },
        wiki: {
          General: { name: "ویکی", path: "/wiki", id: "wiki" },
          bundle: { header: "BUNDLE_HEADER", navigation: "BUNDLE_NAV" },
        },
        gasma: {
          General: { name: "گاسما", path: "/gasma", id: "gasma" },
          bundle: { header: "BUNDLE_HEADER", navigation: "BUNDLE_NAV" },
        },
      };

      // فیلتر کنسول‌ها بر اساس نقش
      const role = fakeData.ENVI_Profile.role;
      const allowedKeys =
        role === "admin" ? Object.keys(allConsoles) : ["home", "hot"];

      const filteredCONS = Object.fromEntries(
        Object.entries(allConsoles).filter(([key]) =>
          allowedKeys.includes(key)
        )
      );

      const newState = {
        ...fakeData,
        ENVI_CONS: filteredCONS,
      };

      reconfigDyna(newState);
      console.log(`✅ Mock env + consoles injected for role [${role}]`, newState);
    }, 2000);

    return () => clearTimeout(timer);
  }, [reconfigDyna]);

  return null;
};

export default MockInjector;
