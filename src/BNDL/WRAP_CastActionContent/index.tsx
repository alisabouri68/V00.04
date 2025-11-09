import { User, Settings, LogOut } from "lucide-react";
import React, { useState } from "react";
import TextField from "WIDG/RWID_textFiled_V00.04";
import { FiMail, FiUser, FiLock, FiSearch } from "react-icons/fi";
import Dropdown from "WIDG/RWDG_dropdown_V00.04";

/**
 * TextFieldShowcase
 * A comprehensive demo page that displays every important state/variant/size
 * of the TextField component so you can visually compare and copy usage.
 *
 * Usage: drop this file into your app and render <TextFieldShowcase />
 */

const ShowcaseRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-light p-4 rounded-lg shadow-sm">
        <h4 className="text-sm font-semibold mb-3">{title}</h4>
        <div className="space-y-3">{children}</div>
    </div>
);

export default function TextFieldShowcase() {
    // controlled states for examples
    const [txtSimple, setTxtSimple] = useState("");
    const [txtEmail, setTxtEmail] = useState("");
    const [txtPass, setTxtPass] = useState("");
    const [txtBio, setTxtBio] = useState("");
    const [txtDisabled, setTxtDisabled] = useState("");
    const [txtError, setTxtError] = useState("");

    const geometricFull = { width: "w-full", rounded: "rounded-md" };
    const geometricSmall = { width: "w-64", rounded: "rounded-md" };

    const baseStyle = {
        base_container: "flex flex-col gap-1",
        base_label: "text-sm font-medium text-gray-700",
        base_input: "w-full border px-3 py-2 transition-colors duration-150",
        base_helper: "text-xs text-gray-500",
        base_error: "text-xs text-red-600",
        size_sm: "text-sm py-1 px-2",
        size_md: "text-sm py-2 px-3",
        size_lg: "text-base py-3 px-4",
        // outline defaults — TextField will merge with these
        outlineColorDefault_borderColor: "border border-gray-300",
        outlineColorDefault_textColor: "text-gray-700",
        outlineColorIndigo_borderColor: "border border-indigo-600",
        outlineColorGreen_borderColor: "border border-green-600",
    };

    return (
        <div className="min-h-screen bg-light text-dark p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold">TextField Showcase</h1>
                    <p className="text-sm text-gray-600 mt-1">نمایش تمام حالت‌ها: variants, colors, sizes, icons, helper/error, disabled و textarea</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <ShowcaseRow title="ساده — متن">
                        <TextField
                            geometric={geometricFull}
                            logic={{ label: "ساده", type: "text", value: txtSimple, onChange: setTxtSimple, placeholder: "یک متن وارد کنید", size: "md", variant: "outline", color: "default" }}
                            style={baseStyle}
                        />

                        <pre className="text-xs bg-light text-dark p-2 rounded">{JSON.stringify({ value: txtSimple }, null, 2)}</pre>
                    </ShowcaseRow>

                    <ShowcaseRow title="ایمیل + helper + iconLeft">
                        <TextField
                            geometric={geometricFull}
                            logic={{ label: "ایمیل", type: "email", value: txtEmail, onChange: setTxtEmail, placeholder: "example@email.com", helperText: "ایمیل کاری خود را وارد کنید", iconLeft: <FiMail />, size: "md", variant: "outline", color: "indigo" }}
                            style={baseStyle}
                        />

                        <pre className="text-xs bg-light text-dark p-2 rounded">{JSON.stringify({ value: txtEmail }, null, 2)}</pre>
                    </ShowcaseRow>

                    <ShowcaseRow title="رمز عبور — toggle visibility + iconLeft">
                        <TextField
                            geometric={geometricFull}
                            logic={{ label: "رمز عبور", type: "password", value: txtPass, onChange: setTxtPass, placeholder: "رمز خود را وارد کنید", iconLeft: <FiLock />, size: "md", variant: "outline", color: "default" }}
                            style={baseStyle}
                        />

                        <pre className="text-xs bg-light text-dark p-2 rounded">{JSON.stringify({ length: txtPass.length }, null, 2)}</pre>
                    </ShowcaseRow>

                    <ShowcaseRow title="Textarea — بیو / توضیحات">
                        <TextField
                            geometric={geometricFull}
                            logic={{ label: "بیو", type: "textarea", value: txtBio, onChange: setTxtBio, placeholder: "چند خط درباره خودتان بنویسید", size: "md", variant: "outline" }}
                            style={baseStyle}
                        />

                        <pre className="text-xs bg-light text-dark p-2 rounded">{JSON.stringify({ value: txtBio }, null, 2)}</pre>
                    </ShowcaseRow>

                    <ShowcaseRow title="Variants — outline / solid / light (colors)">
                        <div className="space-y-3">
                            <TextField geometric={geometricSmall} logic={{ label: "Outline (indigo)", type: "text", value: "", onChange: () => { }, placeholder: "", size: "md", variant: "outline", color: "indigo" }} style={baseStyle} />
                            <TextField geometric={geometricSmall} logic={{ label: "Solid (green)", type: "text", value: "", onChange: () => { }, placeholder: "", size: "md", variant: "solid", color: "green" }} style={baseStyle} />
                            <TextField geometric={geometricSmall} logic={{ label: "Light (red)", type: "text", value: "", onChange: () => { }, placeholder: "", size: "md", variant: "light", color: "red" }} style={baseStyle} />
                        </div>
                    </ShowcaseRow>
                    <ShowcaseRow title="Sizes — sm / md / lg">
                        <div className="space-y-3">
                            <TextField geometric={geometricFull} logic={{ label: "Small", type: "text", value: "", onChange: () => { }, size: "sm", variant: "outline" }} style={baseStyle} />
                            <TextField geometric={geometricFull} logic={{ label: "Medium", type: "text", value: "", onChange: () => { }, size: "md", variant: "outline" }} style={baseStyle} />
                            <TextField geometric={geometricFull} logic={{ label: "Large", type: "text", value: "", onChange: () => { }, size: "lg", variant: "outline" }} style={baseStyle} />
                        </div>
                    </ShowcaseRow>
                    <ShowcaseRow title="States — disabled / error">
                        <div className="space-y-3">
                            <TextField geometric={geometricFull} logic={{ label: "غیرفعال", type: "text", value: txtDisabled, onChange: setTxtDisabled, placeholder: "غیرفعال است", disabled: true, variant: "outline" }} style={baseStyle} />
                            <TextField geometric={geometricFull} logic={{ label: "خطا", type: "text", value: txtError, onChange: setTxtError, placeholder: "این فیلد خطا دارد", errorText: "مقدار نامعتبر است", variant: "outline" }} style={baseStyle} />
                        </div>
                    </ShowcaseRow>
                    <ShowcaseRow title="Icons — left & right">
                        <div className="space-y-3">
                            <TextField geometric={geometricFull} logic={{ label: "جستجو", type: "search", value: "", onChange: () => { }, placeholder: "جستجو...", iconLeft: <FiSearch />, size: "md" }} style={baseStyle} />
                            <TextField geometric={geometricFull} logic={{ label: "کاربر", type: "text", value: "", onChange: () => { }, placeholder: "نام کاربری", iconLeft: <FiUser />, iconRight: <FiMail />, size: "md" }} style={baseStyle} />
                        </div>
                    </ShowcaseRow>
                </div>
                /         <div className="space-y-6 p-6">
                    {/* Default solid (default color) */}
                    <Dropdown
                        logic={{
                            trigger: <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Open</button>,
                            placement: "bottom",
                            items: [
                                { type: "header", label: "Profile" },
                                { type: "item", label: "Account", icon: <User size={16} />, onClick: () => alert("Account") },
                                { type: "item", label: "Settings", icon: <Settings size={16} /> },
                                { type: "divider" },
                                { type: "item", label: "Log out", icon: <LogOut size={16} />, onClick: () => alert("Logout") },
                                { type: "custom", customElement: <div className="p-2 text-xs text-center text-gray-400">Custom footer</div> },
                            ],
                        }}
                    />
                   <div className="flex items-center justify-between "> 
 {/* Blue outline */}
                    <Dropdown
                        logic={{
                            trigger: <button className="px-4 py-2 border rounded">Outline Blue</button>,
                            placement: "bottom",
                            variant: "outline",
                            color: "blue",
                            items: [
                                { type: "item", label: "Action 1" },
                                { type: "item", label: "Action 2" },
                            ],
                        }}
                    />
                    {/* Inline small */}
                    <Dropdown
                        logic={{
                            trigger: <span className="underline text-sm cursor-pointer">More</span>,
                            inline: true,
                            size: "sm",
                            items: [
                                { type: "item", label: "Small 1" },
                                { type: "item", label: "Small 2" },
                            ],
                        }}
                    />
                    {/* Placement left */}
                    <Dropdown
                        logic={{
                            trigger: <button className="px-3 py-2 bg-gray-700 text-white rounded">Left</button>,
                            placement: "left",
                            items: [
                                { type: "item", label: "Left A" },
                                { type: "item", label: "Left B" },
                            ],
                        }}
                    />
                   </div>
                </div>
            </div>
        </div>
    );
}
