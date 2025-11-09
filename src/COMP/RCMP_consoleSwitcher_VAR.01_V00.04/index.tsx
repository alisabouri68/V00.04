import { memo, useState } from "react";
import Button from "COMP/RCMP_button_V00.04";
import Image from "COMP/RCMP_bioimage_V00.04";
import { CgMoreVertical } from "react-icons/cg";
import logo from "../../ASST/images/logo-dash.svg";
import Modal from "BOXS/BOX_modal";
import ConsoleBasket from "COMP/RCMP_consoleBasket_VAR.01_V00.04";

const Index = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
        onClick={()=>setIsOpen(!isOpen)}
        leftIcon={<CgMoreVertical />}
        aria-label="More options"
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} children={<ConsoleBasket setIsOpen={setIsOpen} />} />

    </div>
  );
});

Index.displayName = "ConsoleHeader";

export default Index;
