import { useState } from "react";
import Dropdown, { DropdownOption } from "COMP/RCMP_dropdown_V00.04";
import { useGlobalState } from "RDUX/dynamanContext";

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
      <div className="flex items-center gap-2 w-full">
        <label className="w-1/4 text-sm font-medium text-gray-700 dark:text-gray-200">
          {path[path.length - 1]}
        </label>
        <input
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                     px-2 py-1 text-sm shadow-sm focus:outline-none 
                     focus:ring-2 focus:ring-primary focus:border-transparent"
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
    <div className="flex flex-col gap-3 w-full">
      <Dropdown
        options={options}
        selected={selectedKey}
        onSelect={(opt) => setSelectedKey(opt)}
        placeholder={`Select field inside ${path[path.length - 1] || "root"}`}
        className="rounded border border-primary bg-light text-dark shadow-sm 
                   flex items-center justify-between px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
      />

      {selectedKey && (
        <div className="pl-4 border-l-2 border-dashed border-primary/50 mt-2">
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
  const { globalState, updateGlobalState } = useGlobalState();

  const [selectedEnv, setSelectedEnv] = useState<DropdownOption | null>(null);
  const [selectedPacket, setSelectedPacket] = useState<DropdownOption | null>(
    null
  );

  // Environment options
  const enviItem: DropdownOption[] = Object.keys(globalState ?? {}).map(
    (key) => ({
      id: key,
      name: key,
      icon: null,
    })
  );

  // Packet options
  let packetOptions: DropdownOption[] = [];
  if (selectedEnv?.id && typeof globalState[selectedEnv.id] === "object") {
    packetOptions = Object.keys(globalState[selectedEnv.id] ?? {}).map(
      (pkt) => ({
        id: pkt,
        name: pkt,
        icon: null,
      })
    );
  }

  // داده‌ی Packet انتخاب شده
  const selectedPacketData =
    selectedEnv?.id && selectedPacket?.id
      ? (globalState[selectedEnv.id as keyof typeof globalState] as any)?.[
          selectedPacket.id
        ]
      : null;

  // آپدیت مقدارها در globalState به صورت immutable
  const handleValueChange = (path: string[], value: any) => {
    if (!selectedEnv?.id || !selectedPacket?.id) return;

    updateGlobalState((prev: any) => {
      const newState = updateNestedObject(
        prev,
        [selectedEnv.id, selectedPacket.id, ...path.slice(1)],
        value
      );
      return newState;
    });
  };

  const dropdownClass =
    "rounded border border-primary bg-light text-dark shadow-sm flex items-center justify-between px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition w-full";

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
      {/* انتخاب Environment */}
      <Dropdown
        options={enviItem}
        selected={selectedEnv}
        onSelect={(env) => {
          setSelectedEnv(env);
          setSelectedPacket(null);
        }}
        placeholder="Select Environment"
        className={dropdownClass}
      />

      {/* انتخاب Packet */}
      <Dropdown
        options={packetOptions}
        selected={selectedPacket}
        onSelect={(pkt) => setSelectedPacket(pkt)}
        placeholder="Select Packet"
        className={dropdownClass}
      />

      {/* نمایش Explorer داینامیک */}
      {selectedPacketData && (
        <div className="bg-white dark:bg-gray-900 text-dark dark:text-light 
                        rounded-lg p-4 flex flex-col gap-3 shadow-inner 
                        border border-gray-200 dark:border-gray-700">
          <FieldExplorer
            key={selectedPacket?.id}
            data={selectedPacketData}
            path={[selectedPacket?.id || "unknown"]}
            onChange={handleValueChange}
          />
        </div>
      )}
    </div>
  );
}
