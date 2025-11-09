import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";
import Avatar from "WIDG/RWID_avatar_V00.04";
import Button from "COMP/RCMP_button_V00.04";
import Dropdown from "WIDG/RWDG_dropdown_V00.04";
import ImageUser from "ASST/images/avatar.png";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

function useForceUpdate() {
  const [, setTick] = useState(0);
  return () => setTick((tick) => tick + 1);
}

export default function IndexUserProfile() {
  const { resetDyna } = initDyna();
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // فرض: بعداً از state واقعی می‌گیری

  useEffect(() => {
    const handleStorageChange = () => forceUpdate();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    resetDyna();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => navigate("/auth-test");
  const handleProfileEdit = () => navigate("/profile");
  const handleSettings = () => navigate("/settings");

  const dropdownItems = [
    {
      id: "edit",
      label: "Edit",
      icon: <FiEdit3 />,
      type: "item" as const,
      onClick: handleProfileEdit,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FiSettings />,
      type: "item" as const,
      onClick: handleSettings,
    },
    { id: "divider", type: "divider" as const },
    {
      id: "logout",
      label: "Logout",
      icon: <FiLogOut />,
      type: "item" as const,
      onClick: handleLogout,
    },
  ];

  if (!isLoggedIn) {
    return (
      <Button
        onClick={handleLogin}
        variant="filled"
        buttunTitle="Login / Sign In"
      />
    );
  }

  return (
    <div className="relative flex items-center">
      <Dropdown
        geometric={{ width: "w-44" }}
        logic={{
          trigger: (
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar
                img={ImageUser}
                logic={{ badgePosition: "bottom-left" }}

              />
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium  text-dark/60">
                  User Name
                </span>
                <span className="text-xs text-dark">Account</span>
              </div>
            </div>
          ),
          items: dropdownItems,
          inline: false,
          size: "md",
          color: "light",
          closeOnClick: true,
        }}
      />
    </div>
  );
}
