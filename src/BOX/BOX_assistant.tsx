import Button from "COMP/RCMP_button_V00.04";
import { ReactNode, useState } from "react";
import { SiHomeassistant } from "react-icons/si";
import { AiFillEdit } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import Text from "WIDG/RWID_TEXT_V0004";

function BOX_assistant({
  children,
  isOpen,
}: {
  children?: ReactNode;
  isOpen: boolean;
}) {
  const [isEdit, setIsEdit] = useState<string>("");
  const [logic, setLogic] = useState<string>("meta");

  return (
    <div className="relative w-3/12 h-full flex-col gap-3 overflow-y-auto custom-scrollbar rounded-md bg-light text-dark flex p-3 text-center">
      <div className="flex items-center gap-3">
        <Text size="2xl">
          <SiHomeassistant />
        </Text>
        <Text>Assistant</Text>
      </div>

      {/* دکمه‌های اصلی */}
      <div
        className={`flex items-center gap-1 *:flex-1 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
        }`}
      >
        <Button
          variant={isEdit === "assistant" ? "filled" : "outlined"}
          leftIcon={<IoMdSettings />}
          onClick={() => setIsEdit("assistant")}
          size="xlarge"
        />
        <Button
          variant={isEdit === "edit" ? "filled" : "outlined"}
          leftIcon={<AiFillEdit />}
          onClick={() => setIsEdit("edit")}
          size="xlarge"
        />
      </div>

      {/* دکمه‌های لاجیک – همیشه رندر میشه ولی با ترنزیشن باز/بسته میشه */}
      <div
        className={`flex items-center gap-2 transition-all duration-500 ease-in-out overflow-hidden ${
          isEdit === "edit" && isOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
        }`}
      >
        <Button
          fullWidth={true}
          onClick={() => setLogic("meta")}
          variant={logic === "meta" ? "filled" : "outlined"}
          buttunTitle="meta"
        />
        <Button
          fullWidth={true}
          onClick={() => setLogic("geo")}
          variant={logic === "geo" ? "filled" : "outlined"}
          buttunTitle="geo"
        />
        <Button
          fullWidth={true}
          onClick={() => setLogic("log")}
          variant={logic === "log" ? "filled" : "outlined"}
          buttunTitle="log"
        />
        <Button
          fullWidth={true}
          onClick={() => setLogic("style")}
          variant={logic === "style" ? "filled" : "outlined"}
          buttunTitle="style"
        />
      </div>

      {children}
    </div>
  );
}

export default BOX_assistant;
