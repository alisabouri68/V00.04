import Dropdown from "../../COMP/RCMP_dropdown_V00.04";
import { GoSun, GoMoon } from "react-icons/go";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { useGlobalState } from "RDUX/dynamanContext";
interface DropdownOption {
  id?: string;
  name?: string;
  icon?: React.ReactNode;
}

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
  const theme = globalState?.packet_1?.filed_1?.value;
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
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = (selected: DropdownOption) => {
    setSelectedTheme(selected);

    updateGlobalState({
      packet_1: {
        filed_1: { id: "theme", value: selected.id },
        filed_2: { id: "language", value: "en" },
        filed_3: { id: "dir", value: "ltr" },
      },
    });
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
