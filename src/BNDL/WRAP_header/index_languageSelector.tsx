import { GrLanguage } from "react-icons/gr";
import Dropdown from 'COMP/RCMP_dropdown_V00.04';
import React, { useState } from 'react'
interface DropdownOption {
    id: string;
    name: string;
    icon?: React.ReactNode;
}
export default function index_languageSelector() {
    const [selectedLang, setSelectedLang] = useState<DropdownOption | null>(null);


    // Language options
    const languageOptions = [
        { id: "en", name: "English" },
        { id: "fa", name: "فارسی (Persian)" },
        { id: "es", name: "Español (Spanish)" },
        { id: "fr", name: "Français (French)" },
    ];
    return (
        <div className="lg:flex hidden">
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
    )
}
