//@ts-nocheck
/******************************************
\Para Assistant Templates

Last Update:    2025.09.12
By:             APPS.68

Description:  This templates is used for developing React Components according to Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             paraAssistant 
Title:          Para Assistant Templates - React Version
Version:        V00.04
VAR:            01 (remarks ....)

last-update:    D2025.09.12
owner:          APPS.68

Description:    Here ...

------------------------------------------------------------*/

/**************************************
 * Step 01 import dependencies - kernels
 **************************************/
import { useState, useEffect } from "react";
/**************************************
 * Step.02:    import dependency - widgets
 **************************************/
interface AssistantProps {
  geo?: { width?: string; height?: string };
  logic?: {
    src: string;
    alt?: string;
    fallbackSrc?: string;
    lazy?: boolean;
  };
  styles?: {
    borderRadius?: string;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    boxShadow?: string;
  };
  onClose?: () => void;
  onChange?: (updated: { geo?: any; logic?: any; styles?: any }) => void;
}
/**************************************
 * Step 07 - Class Component should be defined
 *
 **************************************/
function Assistant({
  geo = {},
  logic = { src: "", alt: "", fallbackSrc: "", lazy: false },
  styles = {},
  onChange,
}: AssistantProps) {
  const [localGeo, setLocalGeo] = useState(geo);
  const [localLogic, setLocalLogic] = useState(logic);
  const [localStyles, setLocalStyles] = useState(styles);

  useEffect(() => {
    if (onChange)
      onChange({ geo: localGeo, logic: localLogic, styles: localStyles });
  }, [localGeo, localLogic, localStyles]);

  return (
    <div className="bg-light shadow-lg border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col w-full h-full overflow-y-auto custom-scrollbar">
      {" "}
      {/* Geo */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Geo</h3>
        <label className="block mb-1 text-sm">Width</label>
        <input
          className="w-full mb-2 p-1 border rounded text-sm"
          value={localGeo.width || ""}
          onChange={(e) => setLocalGeo({ ...localGeo, width: e.target.value })}
        />
        <label className="block mb-1 text-sm">Height</label>
        <input
          className="w-full p-1 border rounded text-sm"
          value={localGeo.height || ""}
          onChange={(e) => setLocalGeo({ ...localGeo, height: e.target.value })}
        />
      </div>
      {/* Logic */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Logic</h3>
        <label className="block mb-1 text-sm">Src</label>
        <input
          className="w-full mb-2 p-1 border rounded text-sm"
          value={localLogic?.src || ""}
          onChange={(e) =>
            setLocalLogic({ ...localLogic, src: e.target.value })
          }
        />
        <label className="block mb-1 text-sm">Alt</label>
        <input
          className="w-full mb-2 p-1 border rounded text-sm"
          value={localLogic.alt || ""}
          onChange={(e) =>
            setLocalLogic({ ...localLogic, alt: e.target.value })
          }
        />
        <label className="block mb-1 text-sm">Fallback Src</label>
        <input
          className="w-full mb-2 p-1 border rounded text-sm"
          value={localLogic.fallbackSrc || ""}
          onChange={(e) =>
            setLocalLogic({ ...localLogic, fallbackSrc: e.target.value })
          }
        />
        <label className="block mb-1 text-sm">Object Fit</label>
        <select
          className="w-full mb-2 p-1 border rounded text-sm"
          value={localStyles.objectFit || "cover"}
          onChange={(e) =>
            setLocalStyles({ ...localStyles, objectFit: e.target.value as any })
          }
        >
          <option value="contain">contain</option>
          <option value="cover">cover</option>
          <option value="fill">fill</option>
          <option value="none">none</option>
          <option value="scale-down">scale-down</option>
        </select>
        <label className="flex items-center gap-2 mb-2 text-sm">
          <input
            type="checkbox"
            checked={localLogic.lazy || false}
            onChange={(e) =>
              setLocalLogic({ ...localLogic, lazy: e.target.checked })
            }
          />
          Lazy Load
        </label>
      </div>
      {/* Styles */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Styles</h3>
        <label className="block mb-1 text-sm">Border Radius</label>
        <input
          className="w-full mb-2 p-1 border rounded text-sm"
          value={localStyles.borderRadius || ""}
          onChange={(e) =>
            setLocalStyles({ ...localStyles, borderRadius: e.target.value })
          }
        />
        <label className="block mb-1 text-sm">Box Shadow</label>
        <input
          className="w-full p-1 border rounded text-sm"
          value={localStyles.boxShadow || ""}
          onChange={(e) =>
            setLocalStyles({ ...localStyles, boxShadow: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default Assistant;
