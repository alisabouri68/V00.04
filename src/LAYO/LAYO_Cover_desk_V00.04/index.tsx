import Action from "../../BOX/BOX_actionn";
// import ServicePicker from "../../COMP/RCMP_servicePicker_VAR.01_V00.04"
import ServicePickerTest from "../../COMP/RCMP_TEST"
const Index: React.FC = () => {
  return (
    <>
      {/* <ServicePicker /> */}
      <ServicePickerTest />
    </>
  )
}
const index = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Action jiniChild={<Index />} />
    </div>
  );
};

export default index;
