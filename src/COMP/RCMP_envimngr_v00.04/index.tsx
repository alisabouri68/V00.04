import { useState } from "react";
import Dropdown, { DropdownOption } from "COMP/RCMP_dropdown_V00.04";
import { useGlobalState } from "RDUX/dynamanContext";

const enviItem: DropdownOption[] = [
  { id: "Envi_glob", name: "Envi_glob", icon: null },
  { id: "Envi_console", name: "Envi_console", icon: null },
  { id: "Envi_spk", name: "Envi_spk", icon: null },
];

const syntaxHighlightJSON = (json: any) => {
  const str = JSON.stringify(json, null, 2)
    .replace(
      /(&|<|>)/g,
      (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]!)
    )
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "text-purple-400"; // default string
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? "text-yellow-400" : "text-green-400"; // key : value
        } else if (/true|false/.test(match)) {
          cls = "text-blue-400";
        } else if (/null/.test(match)) {
          cls = "text-gray-400";
        } else {
          cls = "text-red-400"; // number
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  return str;
};

const addLineNumbers = (html: string) => {
  const lines = html.split("\n");
  return lines
    .map(
      (line, idx) =>
        `<div class="flex"><span class="text-gray-500 w-8 text-right pr-2 select-none">${
          idx + 1
        }</span><span class="flex-1">${line}</span></div>`
    )
    .join("");
};

export default function PacketDropdown() {
  const { globalState } = useGlobalState();

  const [selectedEnv, setSelectedEnv] = useState<DropdownOption | null>(null);
  const [selectedPacket, setSelectedPacket] = useState<DropdownOption | null>(
    null
  );

  const packetOptions: DropdownOption[] =
    selectedEnv?.id === "Envi_glob"
      ? Object.keys(globalState ?? {}).map((pkt) => ({
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
    selectedPacket && selectedEnv?.id === "Envi_glob"
      ? globalState[selectedPacket.id as keyof typeof globalState]
      : null;

  const dropdownClass =
    "rounded border border-primary bg-light text-dark shadow-sm flex item-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition w-full";

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto ">
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
          placeholder="Select "
          className={dropdownClass}
        />
      </div>

      {selectedPacketData && (
        <div className="bg-gray-900 text-white rounded-lg shadow-inner p-4  font-mono text-sm h-full">
          <h4 className="font-semibold mb-2 text-cyan-400">
            {selectedPacket?.name} Data:
          </h4>
          <pre
            className="whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{
              __html: addLineNumbers(syntaxHighlightJSON(selectedPacketData)),
            }}
          ></pre>
        </div>
      )}
    </div>
  );
}
