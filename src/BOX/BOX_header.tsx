import { ReactNode, useState } from "react";
import ConsoleSwitche from "../COMP/RCMP_consoleSwitcher_VAR.01_V00.04";
import Dropdown from "COMP/RCMP_dropdown_V00.04";
import { GoSun, GoMoon } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "RDUX/theme/hook";
import { setTheme } from "../RDUX/theme/themeSlice";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { GrLanguage } from "react-icons/gr";
import Avatar from "COMP/RCMP_avatar_VAR.01_V00.04";

interface DropdownOption {
  id: string;
  name: string;
  icon?: React.ReactNode;
}
const Header = ({ children, console }: { children?: ReactNode, console: string }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const [selectedTheme, setSelectedTheme] = useState<DropdownOption | null>(
    null
  );
  const [selectedLang, setSelectedLang] = useState<DropdownOption | null>(null);
  const themeOptions = [
    { id: "light", name: "Light", icon: <GoSun /> },
    { id: "dark", name: "Dark", icon: <GoMoon /> },
    {
      id: "system",
      name: "System Default",
      icon: <HiOutlineComputerDesktop />,
    },
  ];

  // Language options
  const languageOptions = [
    { id: "en", name: "English" },
    { id: "fa", name: "فارسی (Persian)" },
    { id: "es", name: "Español (Spanish)" },
    { id: "fr", name: "Français (French)" },
  ];

  return (
    <>
      <header className="w-full h-14 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300
">
        <div className="2xl:container mx-auto flex w-full h-full px-1 ">
          <div className="w-h-f justify-between">
            {/* start header */}
            <div className="">
              <ConsoleSwitche console={console} />
            </div>
            {/* end header */}
            <div className="flex items-center w-max justify-end">
              <div>
                <Dropdown
                  options={themeOptions}
                  selected={
                    selectedTheme ||
                    themeOptions.find((item) => item.id === theme) ||
                    null
                  }
                  onSelect={(selected) => {
                    setSelectedTheme(selected);
                    dispatch(
                      setTheme(selected.id as "light" | "dark" | "system")
                    );
                  }}
                  placeholder={theme}
                />
              </div>
              <div>
                <Dropdown
                  options={languageOptions}
                  selected={
                    selectedLang || {
                      id: "1",
                      icon: <GrLanguage />,
                      name: "Language",
                    }
                  }
                  onSelect={setSelectedLang}
                  placeholder="Language"
                />
              </div>
              <div className="flex gap-2">
                <div>
                  <Avatar alt="user" fallbackText="" />
                </div>
                <div className="flex flex-col items-start">
                  <div><span className="">Hana Rezaei</span></div>
                  <div><span className="">Tehran</span></div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </header>
    </>
  );
};

export default Header;
