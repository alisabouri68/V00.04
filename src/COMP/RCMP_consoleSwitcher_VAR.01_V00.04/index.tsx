import { memo } from "react";
import Button from "COMP/RCMP_button_V00.04";
import Image from "COMP/RCMP_bioimage_V00.04";
import { CgMoreVertical } from "react-icons/cg";
import logo from "../../ASST/images/logo-dash.svg";
import { initDyna } from "../../RDUX/dynamanContext";
const Index = memo(() => {
  const { reconfigDyna } = initDyna();
  const handleMoreClick = () => {
    reconfigDyna({
      packet_3: {
        filed_1: { id: "modal", value: true },
        filed_2: { id: "content1", value: "ConsoleBasket" },
      },
    });
  };
  return (
    <div className="flex items-center gap-2">
      <Image
        styles={{
          borderRadius: "0%",
          objectFit: "cover",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
        logic={{ src: logo, alt: "logo", lazy: true }}
        geo={{ width: "100", height: "100" }}
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
