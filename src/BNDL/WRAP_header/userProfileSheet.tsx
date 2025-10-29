import { useState, useRef, useEffect } from "react";
import { FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Avatar from "COMP/RCMP_avatar_VAR.01_V00.04";
import ImageUser from "../../ASST/images/avatar.png";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import { profileMan } from "ACTR/RACT_profileman_V00.04";
import Button from "COMP/RCMP_button_V00.04";

function useForceUpdate() {
  const [, setTick] = useState(0);
  return () => setTick((tick) => tick + 1);
}

export default function IndexUserProfile() {
  const { resetDyna } = initDyna();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();

  const user = profileMan.getProfile();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    resetDyna();
    profileMan.resetProfile();
    setIsDropdownOpen(false);
    navigate("/");
  };


  const handleLogin = () => navigate("/auth-test");

  const handleProfileEdit = () => setIsDropdownOpen(false);
  const handleSettings = () => setIsDropdownOpen(false);

  const UserName = user?.username || "Unknown";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    const handleStorageChange = () => forceUpdate();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="flex self- gap-2 relative" ref={dropdownRef}>
      {true ? (
        <>
          <div className="flex gap-2 items-center cursor-pointer" onClick={toggleDropdown}>
            <Avatar alt="user" variant="single" fallbackText="" isOnline size="md" src={ImageUser} />
            <div className="flex flex-col items-start">
              <div className="hidden lg:flex">
                <span className="text-dark dark:text-white font-medium">{UserName}</span>
              </div>
              <div className="hidden lg:flex">
                <span className="text-gray-500 dark:text-gray-400 text-sm">{UserName}</span>
              </div>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-light rounded-lg shadow-lg py-1 z-10 border border-secendory">
              <button
                onClick={handleProfileEdit}
                className="flex items-center w-full px-4 py-2 text-sm text-dark hover:bg-secendory transition-colors"
              >
                <FiEdit3 className="ml-2" />
                Edit
              </button>

              <button
                onClick={handleSettings}
                className="flex items-center w-full px-4 py-2 text-sm text-dark hover:bg-secendory transition-colors"
              >
                <FiSettings className="ml-2" />
                Settings
              </button>

              <div className="border-t border-stone-200 dark:border-zinc-800 my-1"></div>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-secendory transition-colors"
              >
                <FiLogOut className="ml-2" />
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Button
          onClick={handleLogin}
          variant="filled"
          buttunTitle="  Login / signIn"

        />
      )}
    </div>
  );
}
