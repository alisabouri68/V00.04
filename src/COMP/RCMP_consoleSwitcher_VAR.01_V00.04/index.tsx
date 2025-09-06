import { memo } from "react";
import Button from "COMP/RCMP_button_V00.04";
import Image from "WIDG/RWID_image_V00.04";
import { CgMoreVertical } from "react-icons/cg";
import logo from "../../ASST/images/logo-dash.svg";
import { useGlobalState } from "../../RDUX/dynamanContext";
const Index = memo(() => {
  const {updateGlobalState } = useGlobalState();
  const handleMoreClick = () => {
    updateGlobalState({
      packet_3: {
        filed_1: { id: "modal", value: true },
        filed_2: { id: "content1", value: "ConsoleBasket" },
      },
    });
  };
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
      <Button
        variant="text"
        size="mini"
        onClick={handleMoreClick}
        leftIcon={<CgMoreVertical />}
        aria-label="More options"
      />
    </div>
  );
});

Index.displayName = "ConsoleHeader";

export default Index;
