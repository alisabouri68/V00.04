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
    <div className={`flex w-full h-full relative custom-card ${activeView === "grid"
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
                    <AiOutlineFullscreen className="text-lg border font-extrabold dark:border-white-custom border-black-custom rounded-md" />
                }
            />
        )}

        {activeView === "list" && subItem.href && (
            <>
                <span className="w-full flex h-0.5 bg-gray-300 dark:bg-gray-600" />
                <p className="truncate w-2/5 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </>
        )}
    </div>
));
export default SubItem