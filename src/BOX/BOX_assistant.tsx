import Button from "COMP/RCMP_button_V00.04"
import { ReactNode, useState } from "react"
import { IoMdSettings } from "react-icons/io"

function BOX_assistant({ children }: { children?: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      style={{ height: "calc(100% - 60px)" }}
      className={`w-full lg:w-[23.4%] flex rounded-md z-10 bg-light text-dark absolute bottom-0 right-0 transform transition-transform duration-1000 ease-in-out pointer-events-auto ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full h-full flex flex-col items-center justify-center relative p-2">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="filled"
          size="sm"
          leftIcon={<IoMdSettings className="animate-spin" />}
          className={`absolute lg:top-0.5 top-[75%] start-0 transform transition-transform duration-1000 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-12"
          }`}
        />
        {children}
      </div>
    </div>
  )
}

export default BOX_assistant