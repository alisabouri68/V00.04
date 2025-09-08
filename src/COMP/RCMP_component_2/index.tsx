import Button from "COMP/RCMP_button_V00.04";
// import jsonData from "./.schm.json?raw";
// import { useGlobalState } from "RDUX/dynamanContext";
function Index() {
  // const { globalState } = useGlobalState();
  // const theme = globalState?.ENVI_glob?.glob_Packet_1?.filed_1?.value;
  // const parsedData = JSON.parse(jsonData);

  return (
    <div className="w-full flex">
      <Button fullWidth={true} variant="filled" buttunTitle="Y" />
    </div>
  );
}

export default Index;
