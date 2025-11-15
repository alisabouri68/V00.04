import { useState } from "react";
import Dropdown, { DropdownOption } from "COMP/RCMP_dropdown_V00.04";
import { initDyna } from "PLAY/RPLY_dynaCtrl_V00.0/dynaCtrl";

// ایمپورت آیکون‌های ری‌اکت
import { FaFolder, FaRocket, FaCube, FaDatabase, FaEye } from "react-icons/fa";

function updateNestedObject<T>(obj: T, path: string[], value: any): T {
  if (path.length === 0) return value as T;
  const [key, ...rest] = path;
  return { ...obj, [key]: updateNestedObject((obj as any)[key], rest, value) } as T;
}

function FieldExplorer({ data, path, onChange }: { data: any; path: string[]; onChange: (path: string[], value: any) => void }) {
  if (typeof data !== "object" || data === null) {
    return (
      <div className="w-full flex items-center gap-2 py-2 px-2 border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[80px] flex-shrink-0 truncate">
          {path[path.length - 1]}
        </label>
        <div className="flex items-center gap-1 flex-grow">
          <span className="text-xs text-gray-500 dark:text-gray-400">:</span>
          <input
            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            type="text"
            value={String(data)}
            onChange={(e) => onChange(path, e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {Object.entries(data).map(([key, value]) => (
        <div className="w-full" key={key}>
          {typeof value === "object" && value !== null ? (
            <>
              <div className="w-full font-semibold text-xs text-gray-800 dark:text-gray-200 mb-1 mt-2 px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded border-l-2 border-blue-500">
                <div className="flex items-center gap-1">
                  <FaFolder className="text-blue-500 text-xs" />
                  {key}
                </div>
              </div>
              <div className="w-full pl-3 border-l border-gray-200 dark:border-gray-600 ml-2">
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
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg p-3 shadow border border-gray-200 dark:border-gray-600">
      {/* Header - فیکس شده */}
      <div className="flex flex-col gap-1 flex-shrink-0">
        <div className="flex items-center gap-2">
          <FaEye className="text-blue-500 text-sm" />
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
            Environment & Packet Explorer
          </h2>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
          Select environment and packet to explore configuration
        </p>
      </div>

      {/* Dropdown Section - فیکس شده */}
      <div className="flex flex-col gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mt-2 flex-shrink-0">
        <div className="flex flex-col gap-2 w-full">
          {/* Environment Dropdown */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
              Environment
            </label>
            <Dropdown
              options={enviItem}
              selected={selectedEnv}
              onSelect={(env) => { setSelectedEnv(env); setSelectedPacket(null); }}
              placeholder="Select Environment"
              className="w-full text-xs"
            />
          </div>

          {/* Packet Dropdown */}
          {selectedEnv && (
            <div className="flex flex-col gap-1 w-full">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                Packet
              </label>
              <Dropdown
                options={packetOptions}
                selected={selectedPacket}
                onSelect={setSelectedPacket}
                placeholder="Select Packet"
                className="w-full text-xs"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Area - اسکرول شود */}
      <div className="flex-grow min-h-0 mt-2">
        {/* Packet Data Section */}
        {selectedPacketData && (
          <div className="w-full h-full bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 shadow-sm overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-600 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <FaDatabase className="text-blue-500 text-xs" />
                <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">
                  Packet: <span className="text-blue-600 dark:text-blue-400">{selectedPacket?.name}</span>
                </h3>
              
              </div>
            </div>

            {/* Content - اسکرول شود */}
            <div className="flex-grow overflow-y-auto">
              <div className="p-2">
                <FieldExplorer
                  key={selectedPacket?.id}
                  data={selectedPacketData}
                  path={[selectedPacket?.id || "unknown"]}
                  onChange={handleValueChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedPacketData && selectedEnv && (
          <div className="w-full h-full flex flex-col items-center justify-center py-6 px-3 bg-gray-50 dark:bg-gray-700 rounded border border-dashed border-gray-300 dark:border-gray-600">
            <FaCube className="text-gray-400 text-2xl mb-2" />
            <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 text-center">No Packet Selected</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Select a packet to explore configuration
            </p>
          </div>
        )}

        {/* Initial State */}
        {!selectedEnv && (
          <div className="w-full h-full flex flex-col items-center justify-center py-8 px-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded border border-dashed border-gray-300 dark:border-gray-600">
            <FaRocket className="text-gray-400 text-3xl mb-2" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 text-center">Get Started</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Select an environment to begin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}