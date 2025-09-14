import Button from "COMP/RCMP_button_V00.04";
import { ReactNode, useState } from "react";
import { SiHomeassistant } from "react-icons/si";
import { AiFillEdit } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import Text from "WIDG/RWID_TEXT_V0004";

interface AssistantProps {
  children?: ReactNode;
  activeView: "assistant" | "editor";
  setActiveView: (view: "assistant" | "editor") => void;
  selectedTab: "meta" | "geo" | "log" | "style";
  setSelectedTab: (tab: "meta" | "geo" | "log" | "style") => void;
}

const BOXAssistant = ({ children, setActiveView, selectedTab, setSelectedTab }: AssistantProps) => {
  const [activePanel, setActivePanel] = useState<"assistant" | "editor">("assistant");

  const handlePanelClick = (panel: "assistant" | "editor") => {
    setActivePanel(panel);
    setActiveView(panel);
  };

  return (
    <div className="relative w-3/12 h-full flex flex-col gap-3 overflow-y-auto custom-scrollbar rounded-md bg-light text-dark p-3 text-center">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Text size="2xl">
          <SiHomeassistant />
        </Text>
        <Text>Assistant</Text>
      </div>

      {/* Main Panel Buttons */}
      <div className="flex items-center p-2 gap-2 transition-all duration-500 ease-in-out overflow-hidden">
        <Button
          size="xlarge"
          variant={activePanel === "assistant" ? "filled" : "outlined"}
          leftIcon={<IoMdSettings className="text-2xl" />}
          onClick={() => handlePanelClick("assistant")}
          fullWidth={true}
          buttunTitle="Assistant"
        />
        <Button
          size="xlarge"
          variant={activePanel === "editor" ? "filled" : "outlined"}
          leftIcon={<AiFillEdit className="text-2xl" />}
          onClick={() => handlePanelClick("editor")}
          fullWidth={true}
          buttunTitle="Editor"
        />
      </div>

      {/* Editor Sub-Tabs */}
      <div
        className={`flex flex-col items-center gap-2 p-2 transition-all duration-500 ease-in-out overflow-hidden ${activePanel === "editor" ? "opacity-100 max-h-40"
          : "opacity-0 max-h-0"
          }`}
      >
        {(["meta", "geo", "log", "style"] as const).map((tab) => (
          <Button
            key={tab}
            size="xlarge"
            fullWidth={true}
            variant={selectedTab === tab ? "filled" : "outlined"}
            buttunTitle={tab}
            onClick={() => setSelectedTab(tab)}
          />
        ))}
      </div>

      {/* Children */}
      {children}
    </div>
  );
};
export default BOXAssistant;
