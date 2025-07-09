import { useState, useCallback, memo } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ButtonIcon from "../RCMP_iconButton";
import { BasketItemType } from "TYPE";
import SubItem from "../RCMP_subItem.Basket"


const BasketItems = ({ item, activeView }: {
    item: BasketItemType;
    activeView: "list" | "grid";
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

    const isNotFirstItem = item.id !== "1";
    const shouldRenderDetails =
        (isOpen || !isNotFirstItem || activeView === "grid") &&
        item.items.length > 0;

    return (
        <div className={`flex flex-col items-center w-full min-h-[60px] custom-card `}>
            <ButtonIcon fullWidth onClick={toggleOpen}>
                <div className="flex items-center w-full">
                    <span className="px-5 font-bold min-w-fit">
                        {item.title}
                    </span>

                    {isNotFirstItem && (
                        <>
                            <span className="flex w-full items-center h-0.5 bg-gray-300 dark:bg-gray-600" />
                            {activeView === "list" && (
                                <span>
                                    {isOpen
                                        ? <IoIosArrowUp className="text-2xl ms-2" />
                                        : <IoIosArrowDown className="text-2xl ms-2" />
                                    }
                                </span>
                            )}
                        </>
                    )}
                </div>
            </ButtonIcon>

            {shouldRenderDetails && (
                <div className={`w-full ${activeView === "grid"
                    ? "flex items-center justify-start"
                    : "flex flex-col justify-around items-start"
                    }`}>
                    {item.items.map(subItem => (
                        <SubItem
                            key={subItem.id}
                            subItem={subItem}
                            activeView={activeView}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default memo(BasketItems);
//${isNotFirstItem ? "overflow-y-auto custom-scrollbar max-h-[150px]" : ''}