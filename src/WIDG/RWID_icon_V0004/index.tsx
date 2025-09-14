import { useGlobalState } from "RDUX/dynamanContext";
import schmJson from "./.schm.json?raw"
export interface IconProps {
  geo?: { width?: string; height?: string };
  logic?: { onClick?: 0 | 1; id: string; isAssistant: boolean; addToLocall: boolean };
  style?: { fontSize?: string; color?: string; margin?: string; cursor?: string };
  children: React.ReactNode;
}

const IconComponent = ({ geo, logic, style, children }: IconProps) => {
  const parsJson = JSON.parse(schmJson)?.sections?.id?.meta || {}
  console.log(parsJson)
  const { globalState, updateGlobalState } = useGlobalState();
  const id = logic?.id || "";
  const isLocall = globalState?.ENVI_glob?.glob_Packet_4?.[id]?.content?.logic?.addToLocall
  const assistant = globalState?.ENVI_glob?.glob_Packet_4?.[id]?.content?.logic?.isAssistant;

  const storedData = id
    ? globalState?.ENVI_glob?.glob_Packet_4?.[id]
    : undefined;

  const storedGeo = storedData?.content?.geo || {};
  const storedStyle = storedData?.content?.style || {};

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...storedStyle,
    ...storedGeo,
  };
  const handleClick = () => {
    if (!id) return;

    if (!assistant && !isLocall) {
      updateGlobalState((prevState: any) => {
        const currentContent = prevState.ENVI_glob?.glob_Packet_4?.[id]?.content || {};

        return {
          ...prevState,
          ENVI_glob: {
            ...prevState.ENVI_glob,
            glob_Packet_4: {
              ...prevState.ENVI_glob?.glob_Packet_4,
              [id]: {
                ...prevState.ENVI_glob?.glob_Packet_4?.[id],
                content: {
                  meta:{...parsJson},
                  geo: { ...currentContent.geo, ...geo },
                  logic: { ...currentContent.logic, ...logic, isAssistant: true, addToLocall: true },
                  style: { ...currentContent.style, ...style },
                },
              },
              filed_1: {
                ...prevState.ENVI_glob?.glob_Packet_4?.filed_1,
                id,
              },
            },
          },
        };
      });
    } else if (assistant && isLocall) {
      updateGlobalState((prevState: any) => ({
        ...prevState,
        ENVI_glob: {
          ...prevState.ENVI_glob,
          glob_Packet_4: {
            ...prevState.ENVI_glob?.glob_Packet_4,
            [id]: {
              ...prevState.ENVI_glob?.glob_Packet_4?.[id],
              content: {
                ...prevState.ENVI_glob?.glob_Packet_4?.[id]?.content,
                logic: {
                  ...prevState.ENVI_glob?.glob_Packet_4?.[id]?.content?.logic,
                  isAssistant: false,
                },
              },
            },
            filed_1: {
              ...prevState.ENVI_glob?.glob_Packet_4?.filed_1,
              id,
            },
          },
        },
      }));
    } else if (!assistant && isLocall) {
      updateGlobalState((prevState: any) => ({
        ...prevState,
        ENVI_glob: {
          ...prevState.ENVI_glob,
          glob_Packet_4: {
            ...prevState.ENVI_glob?.glob_Packet_4,
            [id]: {
              ...prevState.ENVI_glob?.glob_Packet_4?.[id],
              content: {
                ...prevState.ENVI_glob?.glob_Packet_4?.[id]?.content,
                logic: {
                  ...prevState.ENVI_glob?.glob_Packet_4?.[id]?.content?.logic,
                  isAssistant: true,
                },
              },
            },
            filed_1: {
              ...prevState.ENVI_glob?.glob_Packet_4?.filed_1,
              id,
            },
          },
        },
      }));
    }
  };


  return (
    <div onClick={handleClick} className="flex items-center cursor-pointer">
      <span style={combinedStyle}>{children}</span>
    </div>
  );
};


export default IconComponent;
