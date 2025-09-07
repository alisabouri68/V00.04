import { useState } from "react";
import Dropdown, { DropdownOption } from "COMP/RCMP_dropdown_V00.04";
import { useGlobalState } from "RDUX/dynamanContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function PacketDropdown() {
  const { globalState } = useGlobalState();
  const theme = globalState?.ENVI_glob?.glob_Packet_1?.filed_1?.value;
  const [selectedEnv, setSelectedEnv] = useState<DropdownOption | null>(null);
  const [selectedPacket, setSelectedPacket] = useState<DropdownOption | null>(
    null
  );
  const enviItem: DropdownOption[] = Object.keys(globalState ?? {}).map(
    (key) => ({
      id: key,
      name: key,
      icon: null,
    })
  );
  const packetOptions: DropdownOption[] =
    selectedEnv?.id && typeof globalState[selectedEnv.id] === "object"
      ? Object.keys(globalState[selectedEnv.id] ?? {}).map((pkt) => ({
          id: pkt,
          name: pkt,
          icon: null,
        }))
      : [];

  const handleEnvSelect = (env: DropdownOption) => {
    setSelectedEnv(env);
    setSelectedPacket(null);
  };

  const handlePacketSelect = (packet: DropdownOption) => {
    setSelectedPacket(packet);
  };

  const selectedPacketData =
    selectedEnv?.id && selectedPacket?.id
      ? (globalState[selectedEnv.id as keyof typeof globalState] as any)?.[
          selectedPacket.id
        ]
      : null;

  const dropdownClass =
    "rounded border border-primary bg-light text-dark shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition w-full";

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
      <div className="flex flex-col gap-3">
        <Dropdown
          options={enviItem}
          selected={selectedEnv}
          onSelect={handleEnvSelect}
          placeholder="Select Environment"
          className={dropdownClass}
        />
        <Dropdown
          options={packetOptions}
          selected={selectedPacket}
          onSelect={handlePacketSelect}
          placeholder="Select Packet"
          className={dropdownClass}
        />
      </div>

      {selectedPacketData && (
        <div className=" text-white rounded-lg shadow-inner font-mono text-sm overflow-auto custom-scrollbar max-h-[500px]">
          <h4 className="font-semibold mb-2 text-cyan-400">
            {selectedPacket?.name} Data:
          </h4>
          <SyntaxHighlighter
            language="json"
            style={theme === "light" ? oneLight : oneDark}
            className={"custom-scrollbar text-xs"}
            wrapLongLines={true}
          >
            {JSON.stringify(selectedPacketData, null, 2)}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
