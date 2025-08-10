import { memo, ReactNode, useState } from "react";
import Button from "../RCMP_button_V00.04/index";
import { IoFilterOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import { VscChecklist } from "react-icons/vsc";
import { FcMenu } from "react-icons/fc";
import { CiLock } from "react-icons/ci";
import { TiPinOutline } from "react-icons/ti";
import { HiOutlineHome } from "react-icons/hi2";
import { IoIosAdd } from "react-icons/io";
import { MdMyLocation } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { closeModal } from "../../RDUX/modal/modalSlice";
import { useDispatch } from "react-redux";
import Text from "WIDG/RWID_text_v00.04";

interface BasketItem {
  id: string;
  icon?: ReactNode | null;
  href: string;
  title: string;
  para: boolean;
  lock: boolean;
  pin: boolean;
}

interface BasketData {
  "Quick Access": BasketItem[];
  "Community": BasketItem[];
  "Mono Service": BasketItem[];
  "General": BasketItem[];
}

const BasketItems = () => {
  const dispatch = useDispatch();

  // --- DATA ---
  const data: BasketData = {
    "Quick Access": [
      { id: "homeService", icon: <HiOutlineHome />, href: "/home-service", title: "HOME", para: true, lock: true, pin: false },
      { id: "hotservice", icon: <MdMyLocation />, href: "/hot-service", title: "Hot", para: true, lock: true, pin: false },

      // 6 empty slots (title === "" => empty)
      { id: "empty-1", icon: <IoIosAdd />, href: "#", title: "", para: false, lock: false, pin: false },
      { id: "empty-2", icon: <IoIosAdd />, href: "#", title: "", para: false, lock: false, pin: false },
      { id: "empty-3", icon: <IoIosAdd />, href: "#", title: "", para: false, lock: false, pin: false },
      { id: "empty-4", icon: <IoIosAdd />, href: "#", title: "", para: false, lock: false, pin: false },
      { id: "empty-5", icon: <IoIosAdd />, href: "#", title: "", para: false, lock: false, pin: false },
      { id: "empty-6", icon: <IoIosAdd />, href: "#", title: "", para: false, lock: false, pin: false },
    ],
    "Community": [
      { id: "Cast", icon: <HiOutlineHome />, href: "/cast", title: "CAST", para: true, lock: false, pin: true },
      { id: "Gasma", icon: <HiOutlineHome />, href: "/gasma", title: "GASMA", para: true, lock: false, pin: true },
    ],
    "Mono Service": [
      { id: "wikiCnter", icon: <HiOutlineHome />, href: "/wikiCnter", title: "WikiCnter", para: true, lock: false, pin: true },
    ],
    "General": [
      // make ids unique to avoid React key/pin collisions
      { id: "homeServiceGeneral", icon: <HiOutlineHome />, href: "/home-service", title: "HOME", para: true, lock: false, pin: true },
      { id: "hotserviceGeneral", icon: <HiOutlineHome />, href: "/hot-service", title: "Hot", para: true, lock: false, pin: true },
    ],
  };

  // --- STATE ---
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "Quick Access": true, // می‌تونید پیش‌فرض باز باشه
  });

  // pinned state: مقدار اولیه از data میاد
  const [pinnedItems, setPinnedItems] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    Object.values(data)
      .flat()
      .forEach((it) => {
        init[it.id] = !!it.pin;
      });
    return init;
  });

  // --- HANDLERS ---
  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const togglePin = (id: string) => {
    // find item to check lock/empty
    const item = Object.values(data).flat().find((it) => it.id === id);
    if (!item) return;
    const isEmpty = !item.title;
    if (item.lock || isEmpty) {
      // اگر آیتم لاک شده یا خالیه، اجازه پین ندید
      return;
    }
    setPinnedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`flex flex-col items-center w-full rounded-lg bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300 h-full`}>
      <div className="w-full flex py-3 items-center justify-evenly border-b">
        <div>
          <h6>Console Basket</h6>
        </div>

        <div className="flex items-center">
          <div>
            <Button onClick={() => setIsEdit((s) => !s)} leftIcon={<IoFilterOutline className="text-2xl" />} size="md" variant="outlined" />
          </div>

          <div className="mx-2">
            <input
              type="text"
              placeholder="Search"
              className="border dark:border-gray-300 border-gray-500 rounded-md outline-none focus:border-gray-300 focus:outline-none focus:ring-0 bg-inherit"
            />
          </div>

          <div>
            <Button leftIcon={<VscChecklist className="text-2xl" />} size="md" title="List" variant="textActive" />
          </div>

          <div>
            <Button leftIcon={<CiGrid41 className="text-2xl" />} size="md" title="Icon" variant="text" />
          </div>
        </div>

        <div>
          <Button onClick={() => dispatch(closeModal())} leftIcon={<IoMdClose className="text-2xl" />} variant="text" />
        </div>
      </div>

      <div className="p-5 overflow-y-auto flex flex-col overflow-x-hidden w-full h-full custom-scrollbar">
        {(Object.entries(data) as [string, BasketItem[]][]).map(([category, items]) => {
          const isOpen = !!openCategories[category];

          // وقتی دسته‌ها باز میشن، ارتفاع داینامیک بر اساس تعداد آیتم‌ها
          const computedHeight = category === "Quick Access" ? "auto" : isOpen ? `${items.length * 56}px` : "0";

          return (
            <div key={category} className="mb-4">
              {/* header */}
              <div
                className="flex items-center justify-between cursor-pointer gap-1 w-full"
                onClick={() => toggleCategory(category)}
              >
                <div>
                  <h6 className="font-bold mb-2">{category}</h6>
                </div>

                {category !== "Quick Access" && (
                  <>
                    <div className="border border-dashed border-gray-500 dark:border-gray-300 flex flex-1"></div>
                    <div>
                      <Button variant="text" leftIcon={<IoIosArrowDown />} />
                    </div>
                  </>
                )}
              </div>

              {/* items */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ height: computedHeight }}
                aria-hidden={category !== "Quick Access" && !isOpen}
              >
                {items.map((item) => {
                  const isPinned = !!pinnedItems[item.id];
                  const isEmpty = !item.title;
                  const canTogglePin = !isEmpty && !item.lock;

                  return (
                    <div
                      key={item.id}
                      // اگر اسلات خالیه، نشان بدید که disabled هست
                      className={`flex items-center gap-2 mb-2 p-2 rounded ${isEmpty ? "bg-gray-50 cursor-not-allowed opacity-70" : "hover:bg-gray-50 cursor-default"} `}
                    >
                      {/* Quick Access menu handle */}
                      {category === "Quick Access" && <Button variant="text" leftIcon={<FcMenu />} />}

                      {/* lock icon if locked */}
                      {item.lock && <Button leftIcon={<CiLock />} />}

                      {/* pin button (stopPropagation prevents collapsing/expanding on pin click) */}
                      {item.pin && (
                        <Button
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            if (canTogglePin) togglePin(item.id);
                          }}
                          variant={isPinned ? "filled" : "outlined"}
                          leftIcon={<TiPinOutline />}
                          title={canTogglePin ? (isPinned ? "Unpin" : "Pin") : item.lock ? "Locked" : "Unavailable"}
                        />
                      )}

                      {/* main icon button */}
                      <Button
                        leftIcon={item.icon ?? <IoIosAdd />}
                        className={`${isEmpty ? "cursor-not-allowed" : ""}`}
                        onClick={() => {
                          /* اگر خواستی کلیک روی آیتم واقعی رو هندل کنی اینجا انجام بده */
                        }}
                      />

                      {/* title or empty hint */}
                      <Text size="sm" className={`${isEmpty ? "text-gray-400 italic" : ""}`}>
                        {isEmpty ? "Empty slot — Not available" : item.title}
                      </Text>

                      <div className="flex flex-1 border border-dashed border-gray-500 dark:border-gray-300"></div>

                      <Text size="sm" className="truncate">
                        {isEmpty ? "This slot is empty" : "Lorem ipsum dolor sit amet consectetur adipisicing"}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(BasketItems);
