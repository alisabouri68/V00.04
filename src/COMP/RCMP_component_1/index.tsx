import jsonData from "./.schm.json?raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useGlobalState } from "RDUX/dynamanContext";
function Index() {
  const { globalState } = useGlobalState();
  const theme = globalState?.ENVI_glob?.glob_Packet_1?.filed_1?.value;
  const parsedData = JSON.parse(jsonData);

  return (
    <div className="flex overflow-hidden bg-light text-dark border rounded-xlarge border-primary cursor-pointer custom-scrollbar">
      <SyntaxHighlighter
        language="json"
        style={theme === "light" ? oneLight : oneDark}
        className={"custom-scrollbar  text-xs"}
      >
        {JSON.stringify(parsedData, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
}

export default Index;
