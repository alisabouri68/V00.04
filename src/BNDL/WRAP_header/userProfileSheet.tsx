import { useState, useRef, useEffect } from "react";
import { FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";
import Avatar from "COMP/RCMP_avatar_VAR.01_V00.04";
import ImageUser from "../../ASST/images/avatar.png";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

export default function IndexUserProfile() {
  const { resetDyna, envi } = initDyna();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState<string>(""); 
  const [city, setCity] = useState<string>(""); 
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    resetDyna();
    setIsDropdownOpen(false);
  };

  const handleProfileEdit = () => setIsDropdownOpen(false);
  const handleSettings = () => setIsDropdownOpen(false);

  useEffect(() => {
    if (envi?.ENVI_Profile) {
      setName(envi.ENVI_Profile.username ?? "Unknown");
      setCity(envi.ENVI_Profile.city ?? "");
    } else {
      setName("Unknown");
      setCity("");
    }
  }, [envi?.ENVI_Profile]);

  useEffect(() => {
    console.log("envi changed:", envi);
  }, [envi]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 relative" ref={dropdownRef}>
      <div className="flex gap-2 items-center cursor-pointer" onClick={toggleDropdown}>
        <Avatar alt="user" variant="single" fallbackText="" isOnline size="md" src={ImageUser} />
        <div className="flex flex-col items-start">
          <div className="hidden lg:flex">
            <span className="text-dark dark:text-white font-medium">{name}</span>
          </div>
          <div className="hidden lg:flex">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {city || "Unknown"}
            </span>
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
    </div>
  );
}
