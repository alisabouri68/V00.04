

import { memo, ReactNode, useCallback, useMemo } from "react";
import Button from "COMP/RCMP_button_V00.04";
import Text from "COMP/RCMP_biotext_V00.04";
import EnviMngr from "../../COMP/RCMP_envimngr_v00.04";
import { initDyna } from "RDUX/dynamanContext";
import { SiHomeassistant } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { BsFiletypeJson } from "react-icons/bs";
interface AssistantProps {
  children?: ReactNode;
  activeView: "assistant" | "editor";
  setActiveView: (view: "assistant" | "editor") => void;
  selectedTab: "meta" | "geo" | "log" | "style";
  setSelectedTab: (tab: "meta" | "geo" | "log" | "style") => void;
}

type TabType = "meta" | "geo" | "log" | "style";
const index_assistant_menu = memo(({
  children,
  activeView,
  setActiveView,
  selectedTab,
  setSelectedTab
}: AssistantProps) => {
  const { envi, reconfigDyna } = initDyna();
  const id = envi?.ENVI_glob?.glob_Packet_4?.filed_1?.id || false
  const enviMNG = useMemo(() =>
    envi?.ENVI_glob?.glob_Packet_4?.filed_1?.envimng || false,
    [envi]
  );

  const handlePanelClick = useCallback((panel: "assistant" | "editor") => {
    setActiveView(panel);
  }, [setActiveView]);

  const enviHandel = useCallback(() => {
    reconfigDyna((prevState: any) => ({
      ...prevState,
      ENVI_glob: {
        ...prevState.ENVI_glob,
        glob_Packet_4: {
          ...prevState.ENVI_glob.glob_Packet_4,
          filed_1: {
            ...prevState.ENVI_glob.glob_Packet_4.filed_1,
            envimng: !enviMNG,
            section: selectedTab
          }
        }
      }
    }));
  }, [enviMNG, selectedTab, reconfigDyna]);

  const tabhandler = useCallback((tab: TabType) => {
    setSelectedTab(tab);
    reconfigDyna((prevState: any) => ({
      ...prevState,
      ENVI_glob: {
        ...prevState.ENVI_glob,
        glob_Packet_4: {
          ...prevState.ENVI_glob.glob_Packet_4,
          filed_1: {
            ...prevState.ENVI_glob.glob_Packet_4.filed_1,
            section: tab
          }
        }
      }
    }));
  }, [setSelectedTab, reconfigDyna]);

  const PanelButtons = useMemo(() => (
    <div className="flex items-center  py-2 px-3 gap-2 transition-all duration-500 ease-in-out overflow-hidden">
      <Button
        size="mini"
        variant={activeView === "assistant" ? "filled" : "outlined"}
        leftIcon={<IoMdSettings className="text-2xl" />}
        onClick={() => handlePanelClick("assistant")}
        fullWidth={true}
        buttunTitle="Assistant"
      />
      <Button
        size="mini"
        variant={activeView === "editor" ? "filled" : "outlined"}
        leftIcon={<BsFiletypeJson className="text-2xl" />}
        onClick={() => handlePanelClick("editor")}
        fullWidth={true}
        buttunTitle="Editor"
      />
    </div>
  ), [activeView, handlePanelClick]);

  const TabButtons = useMemo(() => {
    const tabs: TabType[] = ["meta", "geo", "log", "style"];

    return (
      <div className="flex items-center gap-1 py-2 px-3 transition-all duration-500 ease-in-out overflow-hidden">
        {tabs.map((tab) => (
          <Button
            key={tab}
            size="mini"
            fullWidth={true}
            variant={selectedTab === tab ? "filled" : "outlined"}
            buttunTitle={tab}
            onClick={() => tabhandler(tab)}
          />
        ))}
      </div>
    );
  }, [selectedTab, tabhandler]);

  return (
    <div className="relative flex flex-1 grow flex-col overflow-y-auto custom-scrollbar bg-light text-dark p-1 text-center">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Text size="2xl">
            <SiHomeassistant />
          </Text>
          <Text>Assistant</Text>
        </div>
        <div>
          <Button
            variant={enviMNG ? "filled" : "outlined"}
            fullWidth={true}
            buttunTitle="ENVI_mng"
            onClick={enviHandel}
          />
        </div>
      </div>

      {enviMNG ? (
        <EnviMngr />
      ) : (
        <>
          {id && PanelButtons}
          <div  className="flex items-center justify-center bg-primary/10 border border-primaryp-2 rounded-lg m-2.5 text-primary">{ id || "select component"}</div>
          {id && TabButtons}
          {id && children}
        </>
      )}
    </div>
  );
});

export default index_assistant_menu