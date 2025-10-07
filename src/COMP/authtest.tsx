import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { regman } from "ACTR/RACT_regman_V00.04/index";
import { panelman } from "ACTR/RACT_panelman_V00.04";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

export default function AuthTestPanel() {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const { reconfigDyna } = initDyna();

  const handleLogin = () => {
    if (!username.trim()) return alert("لطفاً نام کاربری را وارد کنید");

    const token = "FAKE-TOKEN-" + Date.now();
    regman.setAuthToken(token);
    regman.setUserProfile({ username, role: "admin", city });
    panelman.initByRole();

    reconfigDyna((prev: any) => ({
      ...prev,
      ENVI_CONS: { home: { id: "home", value: true }, hot: { id: "hot", value: true } },
      ENVI_Profile: { username, role: "admin", city },
      ENVI_HYB: { token, username, role: "admin" },
    }));

    setTimeout(() => navigate("/"), 500);
  };

  const handleLogout = () => {
    regman.logout();
    reconfigDyna((prev: any) => ({ ...prev, ENVI_CONS: {}, ENVI_Profile: {}, ENVI_HYB: {} }));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-center text-xl font-bold text-primary mb-6"> ENVI_profile & ENVI_HYB تست ورود برای </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">نام کاربری:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="نام کاربری"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">شهر:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="شهر"
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          ورود
        </button>
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          خروج
        </button>
      </div>
    </div>
  );
}
