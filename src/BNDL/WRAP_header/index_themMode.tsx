import Dropdown from 'COMP/RCMP_dropdown_V00.04';
import { GoSun, GoMoon } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "RDUX/theme/hook";
import { setTheme } from "../../RDUX/theme/themeSlice";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { useState } from 'react';
interface DropdownOption {
    id: string;
    name: string;
    icon?: React.ReactNode;
}
export default function index_themMode() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.mode);
    const [selectedTheme, setSelectedTheme] = useState<DropdownOption | null>(
        null
    );
    const themeOptions = [
        { id: "light", name: "Light", icon: <GoSun /> },
        { id: "dark", name: "Dark", icon: <GoMoon /> },
        {
            id: "system",
            name: "System Default",
            icon: <HiOutlineComputerDesktop />,
        },
    ];
    return (
        <div className="lg:flex hidden">
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
    )
}
