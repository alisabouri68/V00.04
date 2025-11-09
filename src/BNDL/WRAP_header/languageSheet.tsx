import React, { useEffect, useState } from "react";
import Dropdown from "WIDG/RWDG_dropdown_V00.04"; // مسیری که قبلاً استفاده می‌کردی — اگر فایل جدید را در مسیر دیگری گذاشتی، مسیر را عوض کن
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

/**
 * Local option type (سازگار با ساختار قبلی)
 */
type LanguageOption = {
  id: string;
  name: string;
  icon?: React.ReactNode;
};

function LanguageSelector({
  placeholder = "Select Language",
}: {
  placeholder?: string;
}) {
  const { envi, reconfigDyna } = initDyna();
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageOption | null>(null);

  // گزینه‌های زبان (می‌تونی اینجا زبان‌های بیشتر اضافه کنی)
  const languageOptions: LanguageOption[] = [
    { id: "en", name: "English", icon: <span className="text-sm">EN</span> },
    { id: "fa", name: "Persian", icon: <span className="text-sm">FA</span> },
  ];

  // مقدار زبان جاری از env
  const language = envi?.ENVI_GLOB?.language?.value || "en";

  // sync initial selected from env
  useEffect(() => {
    const current = languageOptions.find((it) => it.id === language);
    if (current) setSelectedLanguage(current);
    else setSelectedLanguage(languageOptions[0]);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  // update <html lang> و dir هنگام تغییر language در env یا انتخاب جدید
  useEffect(() => {
    const lang = selectedLanguage?.id || language;
    if (lang === "fa" || lang === "ar") {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [selectedLanguage, language]);

  const handleLanguageChange = (selected: LanguageOption) => {
    setSelectedLanguage(selected);

    // بروزرسانی dyna state — ساختار مثل قبل هست
    reconfigDyna((prevState: any) => ({
      ...prevState,
      ENVI_GLOB: {
        ...prevState.ENVI_GLOB,
        language: {
          value: selected.id,
        },
      },
    }));

    // تنظیم جهت صفحه
    if (selected.id === "fa" || selected.id === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  };

  // تبدیل languageOptions به آیتم‌های مورد انتظار Dropdown جدید
  const dropdownItems = languageOptions.map((opt) => ({
    id: opt.id,
    label: opt.name,
    icon: opt.icon,
    type: "item" as const,
    // onClick داخل Dropdown با پارامتر id فراخوانی می‌شود، اما اینجا مستقیم شی مورد نظر را پاس می‌دهیم
    onClick: () => handleLanguageChange(opt),
  }));

  return (
    <div className="flex">
      <Dropdown
        geometric={{ width: "w-auto" }}
        logic={{
          trigger: (
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-dark/10">
              <span className="flex items-center">
                {<span className="text-sm">🌐</span>}
              </span>
              <span className="text-sm">
                {selectedLanguage?.name ?? placeholder}
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

export default LanguageSelector;
