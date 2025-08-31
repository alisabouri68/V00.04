import Dropdown from "../../COMP/RCMP_dropdown_V00.04";
import { GoSun, GoMoon } from "react-icons/go";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { useGlobalState } from "../../RDUX/dynamanContext";
import { DropdownOption } from "../../COMP/RCMP_dropdown_V00.04";  

function themeSheet() {
  const [selectedTheme, setSelectedTheme] = useState<DropdownOption | null>(
    null
  );
const { globalState, updateGlobalState } = useGlobalState();
  const themeOptions = [
    { id: "light", name: "Popcorn", icon: <GoSun /> },
    { id: "dark", name: "Nightwish", icon: <GoMoon /> },
    {
      id: "system",
      name: "System Default",
      icon: <HiOutlineComputerDesktop />,
    },
  ];

  // مقداردهی اولیه selectedTheme بر اساس theme فعلی
  useEffect(() => {
    const currentTheme = themeOptions.find(
      (item) => item.id === globalState.theme
    );
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, [globalState.theme]);

  const handleThemeChange = (selected: DropdownOption) => {
    setSelectedTheme(selected);
    updateGlobalState({ theme: selected.id });
  };

  return (
    <div className="flex">
      <Dropdown
        options={themeOptions}
        selected={selectedTheme}
        onSelect={handleThemeChange}
        placeholder={globalState.theme}
      />
    </div>
  );
}
export default themeSheet;
