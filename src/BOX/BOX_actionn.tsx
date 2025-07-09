import { useState } from "react";
import Jini from "../BOX/BOX_Jinni";
import Auxiliary from "../BOX/BOX_auxiliary";
import IconButton from "../COMP/RCMP_iconButton";
import { IoSettingsOutline } from "react-icons/io5";

const BOX_actionn = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div className="w-full h-full flex py-1 bg-zinc-200 dark:bg-zinc-950">
            {/* بخش چپ */}
            <div className="flex w-9/12 ps-1 overflow-x-hidden">
                <Jini />
            </div>

            {/* بخش راست */}
            <div className="flex w-3/12 px-1 relative overflow-hidden">
                <Auxiliary />

                <div
                    className={`transition-all duration-500 ease-in-out w-full rounded-md h-full absolute top-0 ${!isOpen ? "-right-[100%]" : "right-0"
                        }`}
                >
                    <div className="w-full h-full relative rounded-md flex justify-center items-center bg-red-600">
                        <IconButton
                            onClick={() => setIsOpen((prev) => !prev)}
                            className={`absolute top-0.5 delay-300 duration-500 translate-x-[-100%] text-white dark:text-white z-50! bg-primary dark:bg-primary px-3 py-1 rounded-s-xl rounded-e-none shadow ${isOpen ? "left-14" : "-left-1"}`}
                            variant="ghost"
                            leftIcon={<IoSettingsOutline className="text-2xl" />}
                        />
                        aaaaaaaaaa
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BOX_actionn;
