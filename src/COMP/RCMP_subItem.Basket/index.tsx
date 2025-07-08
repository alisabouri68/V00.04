import { memo } from "react";
import { BasketItemType } from "TYPE";
import ButtonIcon from "../RCMP_iconButton";
import { AiOutlineFullscreen } from "react-icons/ai";

 const SubItem = memo(({
    subItem,
    activeView
}: {
    subItem: BasketItemType['items'][0];
    activeView: "list" | "grid";
}) => (
    <div className={`flex w-full h-full relative ${activeView === "grid"
            ? "flex-col justify-start items-center w-24"
            : "justify-start items-center gap-5"
        }`}>
        <ButtonIcon
            variant="ghost"
            className={`${activeView === "grid" ? 'flex-col' : 'flex-row'} capitalize`}
            leftIcon={subItem.icon}
            disabled={!subItem.href}
        >
            {subItem.title}
        </ButtonIcon>

        {subItem.href && activeView === "grid" && (
            <ButtonIcon
                variant="ghost"
                className="absolute top-1/3 left-[55%]"
                size="xs"
                leftIcon={
                    <AiOutlineFullscreen className="text-lg border font-extrabold border-black rounded-md" />
                }
            />
        )}

        {activeView === "list" && subItem.href && (
            <>
                <span className="w-full bg-gray-100 flex h-0.5" />
                <p className="truncate w-2/5 text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </>
        )}
    </div>
));
export default SubItem