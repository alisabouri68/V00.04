import Dropdown from "../../COMP/RCMP_dropdown_V00.04";
import { useState, useEffect } from "react";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";
import { DropdownOption } from "../../COMP/RCMP_dropdown_V00.04";

function LanguageSelector() {
  const { envi, reconfigDyna } = initDyna();
  const [selectedLanguage, setSelectedLanguage] =
    useState<DropdownOption | null>(null);

  const languageOptions = [
    { id: "en", name: "English", icon: <span className="text-sm">EN</span> },
    { id: "fa", name: "Persian", icon: <span className="text-sm">FA</span> },
  ];

  const language = envi?.ENVI_GLOB?.globalState?.language?.value ;
  useEffect(() => {
    const currentLanguage = languageOptions.find(
      (item) => item.id === language
    );
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    } else {
      setSelectedLanguage(languageOptions[0]);
    }
  }, [language]);
  useEffect(() => {
    if (language === "en") {
      document.documentElement.setAttribute("lang", "en");
      document.documentElement.setAttribute("dir", "ltr");
    } else if (language === "fa") {
      document.documentElement.setAttribute("lang", "fa");
      document.documentElement.setAttribute("dir", "rtl");
    }
  }, [language]);
  const handleLanguageChange = (selected: DropdownOption) => {
    setSelectedLanguage(selected);
reconfigDyna((prev:any) => ({
  ...prev,
  ENVI_GLOB: {
    ...prev.ENVI_GLOB,
    globalState: {
      ...prev.ENVI_GLOB.globalState ,  
      language: { id: "language", value: selected.id },
    },
  },
}));



    if (language === "fa" || language === "ar") {
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
