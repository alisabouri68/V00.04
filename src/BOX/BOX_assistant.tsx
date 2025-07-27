import Button from "COMP/RCMP_button_V00.04"
import { ReactNode, useState } from "react"
import { IoMdSettings } from "react-icons/io";
// import { IoClose } from "react-icons/io5";
function BOX_assistant({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className={`w-full h-full flex rounded-md z-10 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-300 absolute top-0 transform transition-[right] duration-1000 ease-in-out ${isOpen ? "end-0" : '-end-full'} `}>
            <div className="w-full h-full flex flex-col items-center justify-center relative p-2">
                <Button
  onClick={() => setIsOpen(!isOpen)}
  variant="filled"
  size="sm"
  leftIcon={<IoMdSettings className="animate-spin" />}
  className={`absolute top-0.5 start-0 transition-transform duration-1000 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-10"}`}
/>

                {children}

            </div>
        </div>
    )
}

export default BOX_assistant
