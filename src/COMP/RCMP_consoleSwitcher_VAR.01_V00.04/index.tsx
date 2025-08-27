import { memo } from "react";
import Button from "COMP/RCMP_button_V00.04";
import Image from "WIDG/RWID_image_V00.04";
import Text from "../../WIDG/RWID_text_V00.04";
import { CgMoreVertical } from "react-icons/cg";
import logo from "../../ASST/images/logo-dash.svg";
import { useGlobalState } from "../../RDUX/dynamanContext"
const Index = memo(() => {
  const { globalState, updateGlobalState } = useGlobalState();
  const handleMoreClick = () => {
   
updateGlobalState({
  modal: {
    isOpen: true,
    content: "ConsoleBasket"
  }
  
}); console.log(globalState.modal.isOpen)  };
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logo}
        alt="Raad Health Logo"
        width={30}
        height={30}
        shimmerColor="#111827"
        shimmerToColor="#ffffff"
        className="rounded-full"
      />

      <Text className="font-medium" children={globalState.modal.isOpen} />

      <Button
        variant="text"
        size="xs"
        onClick={handleMoreClick}
        leftIcon={<CgMoreVertical />}
        aria-label="More options"
      />
    </div>
  );
});

Index.displayName = "ConsoleHeader";

export default Index;
