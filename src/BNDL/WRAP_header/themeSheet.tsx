import Dropdown from "../../COMP/RCMP_dropdown_V00.04";
import { GoSun, GoMoon } from "react-icons/go";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import { DropdownOption } from "../../COMP/RCMP_dropdown_V00.04";
function themeSheet() {
  const [selectedTheme, setSelectedTheme] = useState<DropdownOption | null>(
    null
  );
  const { envi, reconfigDyna } = initDyna();
  const themeOptions = [
    { id: "light", name: "Popcorn", icon: <GoSun /> },
    { id: "dark", name: "Nightwish", icon: <GoMoon /> },
    {
      id: "system",
      name: "System Default",
      icon: <HiOutlineComputerDesktop />,
    },
  ];
  const theme = envi?.ENVI_GLOB?.globalState?.theme?.value ?? "dark";
  useEffect(() => {
    const currentTheme = themeOptions.find((item) => item.id === theme);
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = (selected: DropdownOption) => {
    setSelectedTheme(selected);

reconfigDyna((prev:any) => ({
  ...prev,
  ENVI_GLOB: {
    ...prev.ENVI_GLOB,
    globalState: {
      ...prev.ENVI_GLOB.globalState ,  
      theme: { id: "theme", value: selected.id },
    },
  },
}));

  };
  return (
    <div className="flex">
      <Dropdown
        options={themeOptions}
        selected={selectedTheme}
        onSelect={handleThemeChange}
        placeholder={theme}
      />
    </div>
  );
}
export default themeSheet;
