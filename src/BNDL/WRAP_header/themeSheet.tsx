import React, { useEffect, useState } from "react";
import Dropdown from "WIDG/RWDG_dropdown_V00.04";
import { GoSun, GoMoon } from "react-icons/go";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.0/dynaCtrl";
type ThemeOption = {
  id: string;
  name: string;
  icon?: React.ReactNode;
};

function themeSheet({ placeholder = "Theme" }: { placeholder?: string }) {
  const { envi, reconfigDyna } = initDyna();
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption | null>(
    null
  );

  const themeOptions: ThemeOption[] = [
    { id: "light", name: "Popcorn", icon: <GoSun /> },
    { id: "dark", name: "Nightwish", icon: <GoMoon /> },
    { id: "system", name: "System Default", icon: <HiOutlineComputerDesktop /> },
  ];

  // مقدار جاری از envi
  const theme = envi?.ENVI_GLOB?.theme?.value ?? "light";

  // همگام‌سازی اولیه selected بر اساس env
  useEffect(() => {
    const current = themeOptions.find((t) => t.id === theme);
    if (current) setSelectedTheme(current);
    else setSelectedTheme(themeOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // اعمال کلاس‌های html (dark / light) هنگام تغییر theme در env یا انتخاب
  useEffect(() => {
    const cur = selectedTheme?.id ?? theme;
    if (cur === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (cur === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      // system: پاک کن هر دو یا نگه دار طبق نیاز
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark");
    }
  }, [selectedTheme, theme]);

  const handleThemeChange = (selected: ThemeOption) => {
    setSelectedTheme(selected);

    // به روزرسانی dyna state (مثل ساختار قبلی)
    reconfigDyna((prevState: any) => ({
      ...prevState,
      ENVI_GLOB: {
        ...prevState.ENVI_GLOB,
        theme: {
          value: selected.id,
        },
      },
    }));
    // اگر خواستی همینجا هم کلاس html را تنظیم کن (همان کاری که useEffect انجام می‌دهد)
    if (selected.id === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (selected.id === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark");
    }
  };

  // تبدیل گزینه‌ها به ساختار items برای Dropdown جدید
  const dropdownItems = themeOptions.map((opt) => ({
    id: opt.id,
    label: opt.name,
    icon: opt.icon,
    type: "item" as const,
    onClick: () => handleThemeChange(opt),
  }));

  return (
    <div className="flex">
      <Dropdown
        geometric={{ width: "w-auto" }}
        logic={{
          trigger: (
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-dark/10">
              <span className="flex items-center">
                {selectedTheme?.icon ?? <GoSun />}
              </span>
              <span className="text-sm">
                {selectedTheme?.name ?? placeholder}
              </span>
            </button>
          ),
          items: dropdownItems,
          placement: "bottom",
          inline: false,
          size: "md",
          color: "light",
          closeOnClick: true,
        }}
      />
    </div>
  );
}

export default themeSheet;
