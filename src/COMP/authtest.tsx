import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { regman } from "ACTR/RACT_regman_V00.04/index";
import { panelman } from "ACTR/RACT_panelman_V00.04";

export default function AuthTestPanel() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(regman.isAuthenticated());
  const [profile, setProfile] = useState(regman.getUserProfile());
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      alert("لطفاً نام کاربری را وارد کنید");
      return;
    }

    // ست کردن توکن و پروفایل تستی
    regman.setAuthToken("FAKE-TOKEN-" + Date.now());
    regman.setUserProfile({ username, role: "user" });
    panelman.initByRole();

    setIsLoggedIn(true);
    setProfile(regman.getUserProfile());

    setTimeout(() => navigate("/"), 500);
  };

  const handleLogout = () => {
    regman.logout();
    setIsLoggedIn(false);
    setProfile({});
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "70px auto",
        padding: 30,
        borderRadius: 16,
        background: "#ffffff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        fontFamily: "IRANSans, sans-serif",
        direction: "rtl",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: 25 }}>
        🧪 تست ورود (AuthTest)
      </h2>

      {!isLoggedIn ? (
        <>
          <label style={{ fontSize: 14, color: "#555" }}>نام کاربری:</label>
          <input
            type="text"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 6,
              marginBottom: 16,
              border: "1px solid #ccc",
              borderRadius: 8,
              fontSize: 14,
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: 12,
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#0069d9")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#007bff")}
          >
            ورود به سیستم
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
              padding: "10px 0 20px",
              color: "#2e7d32",
              fontSize: 15,
            }}
          >
            ✅ وارد شدید به عنوان:
            <br />
            <b style={{ fontSize: 17 }}>{profile.username}</b>
          </div>

          <div
            style={{
              background: "#f9f9f9",
              padding: 10,
              borderRadius: 8,
              marginBottom: 20,
              fontSize: 13,
              color: "#555",
              direction: "ltr",
              textAlign: "left",
            }}
          >
            Token: <code>{regman.getAuthToken()}</code>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: 12,
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#c82333")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#dc3545")}
          >
            خروج از حساب
          </button>
        </>
      )}
    </div>
  );
}
