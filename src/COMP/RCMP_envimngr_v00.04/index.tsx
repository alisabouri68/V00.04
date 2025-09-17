import { useState } from "react";
import Dropdown, { DropdownOption } from "COMP/RCMP_dropdown_V00.04";
import { initDyna } from "RDUX/dynamanContext";

// -----------------------------
// Helper: Update nested object immutably
// -----------------------------
function updateNestedObject<T>(obj: T, path: string[], value: any): T {
  if (path.length === 0) return value as T;
  const [key, ...rest] = path;
  return {
    ...obj,
    [key]: updateNestedObject((obj as any)[key], rest, value),
  } as T;
}

// -----------------------------
// Recursive Field Explorer
// -----------------------------
interface FieldExplorerProps {
  data: any;
  path: string[];
  onChange: (path: string[], value: any) => void;
}

function FieldExplorer({ data, path, onChange }: FieldExplorerProps) {
  const [selectedKey, setSelectedKey] = useState<DropdownOption | null>(null);

  // اگر primitive هست → input
  if (typeof data !== "object" || data === null) {
    return (
      <div className="flex items-center gap-3 w-full py-2">
        <label className="w-1/3 text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
          {path[path.length - 1]}
        </label>
        <input
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                     px-3 py-2 text-sm shadow-sm focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-colors duration-200"
          type="text"
          value={String(data)}
          onChange={(e) => onChange(path, e.target.value)}
        />
      </div>
    );
  }

  // اگر object هست → dropdown از کلیدها
  const options: DropdownOption[] = Object.keys(data).map((key) => ({
    id: key,
    name: key,
    icon: null,
  }));

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Explore {path[path.length - 1] || "root"}
        </label>
        <Dropdown
          options={options}
          selected={selectedKey}
          onSelect={(opt) => setSelectedKey(opt)}
          placeholder={`Select field inside ${path[path.length - 1] || "root"}`}
          className="w-full"
        />
      </div>

      {selectedKey && (
        <div className="pl-5 ml-2 border-l-2 border-dashed border-gray-300 dark:border-gray-600 mt-1">
          <FieldExplorer
            key={[...path, selectedKey.id].join(".")}
            data={data[selectedKey.id]}
            path={[...path, selectedKey.id]}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
}

// -----------------------------
// Main Component
// -----------------------------
export default function PacketDropdown() {
  const { envi, reconfigDyna } = initDyna();

  const [selectedEnv, setSelectedEnv] = useState<DropdownOption | null>(null);
  const [selectedPacket, setSelectedPacket] = useState<DropdownOption | null>(
    null
  );

  // Environment options
  const enviItem: DropdownOption[] = Object.keys(envi ?? {}).map(
    (key) => ({
      id: key,
      name: key,
      icon: null,
    })
  );

  // Packet options
  let packetOptions: DropdownOption[] = [];
  if (selectedEnv?.id && typeof envi[selectedEnv.id] === "object") {
    packetOptions = Object.keys(envi[selectedEnv.id] ?? {}).map(
      (pkt) => ({
        id: pkt,
        name: pkt,
        icon: null,
      })
    );
  }

  const selectedPacketData =
    selectedEnv?.id && selectedPacket?.id
      ? (envi[selectedEnv.id as keyof typeof envi] as any)?.[
          selectedPacket.id
        ]
      : null;

  const handleValueChange = (path: string[], value: any) => {
    if (!selectedEnv?.id || !selectedPacket?.id) return;

    reconfigDyna((prev: any) => {
      const newState = updateNestedObject(
        prev,
        [selectedEnv.id, selectedPacket.id, ...path.slice(1)],
        value
      );
      return newState;
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Environment & Packet Explorer
      </h2>
      
      {/* انتخاب Environment */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Environment
        </label>
        <Dropdown
          options={enviItem}
          selected={selectedEnv}
          onSelect={(env) => {
            setSelectedEnv(env);
            setSelectedPacket(null);
          }}
          placeholder="Select Environment"
          className="w-full"
        />
      </div>

      {/* انتخاب Packet */}
      {selectedEnv && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Packet
          </label>
          <Dropdown
            options={packetOptions}
            selected={selectedPacket}
            onSelect={(pkt) => setSelectedPacket(pkt)}
            placeholder="Select Packet"
            className="w-full"
          />
        </div>
      )}

      {/* نمایش Explorer داینامیک */}
      {selectedPacketData && (
        <div className="bg-white dark:bg-gray-800 text-dark dark:text-light 
                        rounded-lg p-4 flex flex-col gap-4 shadow-inner 
                        border border-gray-200 dark:border-gray-700 mt-3">
        
          <FieldExplorer
            key={selectedPacket?.id}
            data={selectedPacketData}
            path={[selectedPacket?.id || "unknown"]}
            onChange={handleValueChange}
          />
        </div>
      )}

      {!selectedEnv && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Please select an environment to begin exploring</p>
        </div>
      )}

      {selectedEnv && !selectedPacket && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Please select a packet to explore its contents</p>
        </div>
      )}
    </div>
  );
}
