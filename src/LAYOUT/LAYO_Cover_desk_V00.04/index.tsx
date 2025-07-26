import Action from "../../BOX/BOX_action";
import ServicePicker from "../../COMP/RCMP_servicePicker_VAR.01_V00.04"
import ServicePickerVar2 from "../../COMP/RCMP_servicePicker_VAR.02_V00.04"
import Navigator from "../../COMP/RCMP_navigator_VAR.01_V00.04"
const Index: React.FC = () => {
  return (
    <>
      <ServicePicker />
      <ServicePickerVar2 />
    </>
  )
}
const index = () => {
  return (
    <div className="w-full h-full flex overflow-hidden">
      <Navigator />
      <Action jiniChild={<Index />} />
    </div>
  );
};

export default index;
