import Dropdown from "../../COMP/RCMP_dropdown_V00.04";
import { useState, useEffect } from "react";
import { useGlobalState } from "RDUX/dynamanContext"; 
import { DropdownOption } from "../../COMP/RCMP_dropdown_V00.04";


function LanguageSelector() {
  const { globalState, updateGlobalState } = useGlobalState();
  const [selectedLanguage, setSelectedLanguage] = useState<DropdownOption | null>(null);

  const languageOptions = [
    { id: "en", name: "English", icon: <span className="text-sm">EN</span> },
    { id: "fa", name: "Persian", icon: <span className="text-sm">FA</span> },
  ];

  // مقداردهی اولیه selectedLanguage بر اساس language فعلی
  useEffect(() => {
    const currentLanguage = languageOptions.find(
      (item) => item.id === globalState.language
    );
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    } else {
      // مقدار پیش‌فرض اگر language در globalState وجود نداشت
      setSelectedLanguage(languageOptions[0]);
    }
  }, [globalState.language]);

  const handleLanguageChange = (selected: DropdownOption) => {
    setSelectedLanguage(selected);
    updateGlobalState({ language: selected.id });
    
    // تغییر جهت متن برای زبان‌های RTL
    if (selected.id === "fa" || selected.id === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  };

  return (
    <div className="flex">
      <Dropdown
        options={languageOptions}
        selected={selectedLanguage}
        onSelect={handleLanguageChange}
        placeholder="Select Language"
      />
    </div>
  );
}

export default LanguageSelector;