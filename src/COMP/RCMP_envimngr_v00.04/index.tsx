import { useState } from "react";
import Dropdown, { DropdownOption } from "COMP/RCMP_dropdown_V00.04";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

function updateNestedObject<T>(obj: T, path: string[], value: any): T {
  if (path.length === 0) return value as T;
  const [key, ...rest] = path;
  return { ...obj, [key]: updateNestedObject((obj as any)[key], rest, value) } as T;
}

function FieldExplorer({ data, path, onChange }: { data: any; path: string[]; onChange: (path: string[], value: any) => void }) {
  if (typeof data !== "object" || data === null) {
    return (
      <div className="w-full flex items-center gap-1 py-2 border-b border-gray-100 dark:border-gray-700 overflow-hidden">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {path[path.length - 1] + " : "}
        </label>
        <input
          className="grow rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-2 text-sm"
          type="text"
          value={String(data)}
          onChange={(e) => onChange(path, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-1">
      {Object.entries(data).map(([key, value]) => (
        <div className="w-full" key={key}>
          {typeof value === "object" && value !== null ? (
            <>
              <div className="w-full font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2 mt-3 px-1 py-1 bg-gray-50 dark:bg-gray-800 rounded">
                {key}
              </div>
              <div className="w-full pl-">
                <FieldExplorer data={value} path={[...path, key]} onChange={onChange} />
              </div>
            </>
          ) : (
            <FieldExplorer data={value} path={[...path, key]} onChange={onChange} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function PacketDropdown() {
  const { envi, reconfigDyna } = initDyna();
  const [selectedEnv, setSelectedEnv] = useState<DropdownOption | null>(null);
  const [selectedPacket, setSelectedPacket] = useState<DropdownOption | null>(null);

  const enviItem: DropdownOption[] = Object.keys(envi ?? {}).map((key) => ({ id: key, name: key, icon: null }));

  let packetOptions: DropdownOption[] = [];
  if (selectedEnv?.id && typeof envi[selectedEnv.id] === "object") {
    packetOptions = Object.keys(envi[selectedEnv.id] ?? {}).map((pkt) => ({ id: pkt, name: pkt, icon: null }));
  }

  const selectedPacketData = selectedEnv?.id && selectedPacket?.id
    ? (envi[selectedEnv.id as keyof typeof envi] as any)?.[selectedPacket.id]
    : null;

  const handleValueChange = (path: string[], value: any) => {
    if (!selectedEnv?.id || !selectedPacket?.id) return;
    reconfigDyna((prev: any) => updateNestedObject(prev, [selectedEnv.id, selectedPacket.id, ...path.slice(1)], value));
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 rounded-md">
      <h2 className="w-full text-lg font-semibold text-gray-800 dark:text-gray-100">Environment & Packet Explorer</h2>

      <div className="w-fullflex flex-col gap-1">
        <div className="w-full flex flex-col gap-2">
          <label className="w-full text-sm font-medium text-gray-700 dark:text-gray-200">Environment</label>
          <Dropdown
            options={enviItem}
            selected={selectedEnv}
            onSelect={(env) => { setSelectedEnv(env); setSelectedPacket(null); }}
            placeholder="Select Environment"
            className="w-full"
          />
        </div>

        {selectedEnv && (
          <div className="w-full flex flex-col gap-2">
            <label className="w-full text-sm font-medium text-gray-700 dark:text-gray-200">Packet</label>
            <Dropdown
              options={packetOptions}
              selected={selectedPacket}
              onSelect={setSelectedPacket}
              placeholder="Select Packet"
              className="w-full"
            />
          </div>
        )}
      </div>

      {selectedPacketData && (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">
              Packet: {selectedPacket?.name}
            </h3>
          </div>
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